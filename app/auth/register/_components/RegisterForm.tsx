'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema } from '@/lib/schemas';
import { z } from 'zod';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { registerUser } from '@/actions/register';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const RegisterForm = () => {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof RegisterSchema>>({
		resolver: zodResolver(RegisterSchema),
		mode: 'onSubmit',
	});

	return (
		<div className='flex items-center justify-center h-screen'>
			<form
				onSubmit={handleSubmit(async (values: z.infer<typeof RegisterSchema>) => {
					startTransition(() => {
						registerUser(values)
							.then(() => {
								toast.success('User registered'), router.push('/login');
							})
							.catch(() => toast.error('Failed to register. Try again!'));
					});
				})}
				className='flex flex-col justify-center items-center gap-3 w-[70%]'
			>
				<input
					type='text'
					{...register('username')}
					placeholder="ім'я користувача"
					className='w-full border-2 border-gray-300 px-2 py-1 rounded-lg'
				/>
				{errors.email && <p>{errors.email.message}</p>}
				<input
					type='text'
					{...register('email')}
					placeholder='email'
					autoCapitalize='none'
					className='w-full border-2 border-gray-300 px-2 py-1 rounded-lg'
				/>
				{errors.email && <p>{errors.email.message}</p>}
				<input
					type='password'
					{...register('password')}
					placeholder='пароль'
					className='w-full border-2 border-gray-300 px-2 py-1 rounded-lg'
				/>
				{errors.password && <p>{errors.password.message}</p>}
				<div className='w-full'>
					<button
						disabled={isPending}
						type='submit'
						className='w-full bg-emerald-500 px-3 py-1 rounded-md disabled:opacity-60 w-ful'
					>
						Зареєструватися
					</button>
				</div>
				<div className='flex items-center justify-center gap-4'>
					<button type='button' className='flex items-center p-1.5 border border-neutral-200 rounded-md'>
						<FaGoogle className='mr-3' />
						Google
					</button>
					<button type='button' className='flex items-center p-1.5 border border-neutral-200 rounded-md'>
						<FaApple className='mr-3' />
						Apple
					</button>
				</div>
				<div>
					<Link href='/auth/login' className='leading-none text-center'>
						Вже зареєстровані? <p className='font-semibold'>Ввійти</p>
					</Link>
				</div>
			</form>
		</div>
	);
};
export default RegisterForm;
