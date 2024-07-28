'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from '@/lib/schemas';
import { z } from 'zod';
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { FaApple } from 'react-icons/fa';
import { login } from '@/actions/login';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

const LoginForm = () => {
	const [isPending, startTransition] = useTransition();
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: '',
		},
	});
	const [loginError, setLoginError] = useState<string | undefined>('');

	return (
		<div className='flex items-center justify-center h-screen'>
			<form
				onSubmit={handleSubmit((values: z.infer<typeof LoginSchema>) => {
					setLoginError('');
					startTransition(async () => {
						await login(values).then((data) => {
							setLoginError(data?.error);
						});
						toast.success('Herlisch Willkommen');
					});
				})}
				className='flex flex-col justify-center items-center gap-3 w-[70%]'
			>
				<input
					type='text'
					{...register('email')}
					autoCapitalize='none'
					placeholder='email'
					className='border-2 border-gray-300 px-3 py-1.5 rounded-2xl text-lg w-full'
				/>
				{errors.email && <p>{errors.email.message}</p>}
				<input
					type='password'
					{...register('password')}
					placeholder='пароль'
					className='border-2 border-gray-300 px-3 py-1.5 rounded-2xl text-lg w-full'
				/>
				{errors.password && <p>{errors.password.message}</p>}
				{loginError && (
					<p className='w-full px-2 py-1 border-2 border-neutral-200 rounded-lg bg-red-200 text-red-700'>
						{loginError}
					</p>
				)}
				<div className='w-full flex flex-col gap-2'>
					<button
						disabled={isPending}
						type='submit'
						className='font-semibold bg-emerald-500 px-3 py-1 rounded-2xl disabled:opacity-60 w-full text-lg'
					>
						Ввійти
					</button>
					<Link href='/auth/register'>Не зареєстровані?</Link>
				</div>
			</form>
		</div>
	);
};
export default LoginForm;
