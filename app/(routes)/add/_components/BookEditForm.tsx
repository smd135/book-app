'use client';
import { AddBookInput } from '@/components/shared/AddBookInput';
import { GoBook } from 'react-icons/go';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { GobackButton } from '@/components/shared/GobackButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
	book_title: z.string().min(1, { message: 'Введіть назву книги' }),
	book_author: z.string().min(1, { message: 'Введіть автора книги' }),
	page_count: z.string().optional(),
});

export const BookEditForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const { register, handleSubmit, formState } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { book_title: '', book_author: '', page_count: '' },
	});
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			const book = await axios.post(`/api/book`, values);
			router.refresh();
			toast.success('Книжку додано успішно');
		} catch (error) {
			toast.error('Не вдалося зберегти книгу');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className='flex items-center justify-between'>
				<GobackButton />
				<button type='submit' className='bg-black text-white font-semibold px-4 py-1 rounded-3xl'>
					Додати
				</button>
			</div>
			<div className='flex flex-col gap-3 mt-4'>
				<div className='flex flex-col'>
					<p className='pb-2 text-secondary font-semibold'>Обложка</p>
					<div className='flex items-center justify-center w-20 h-24 bg-[#dfd1d1] rounded-lg'>
						<GoBook size={20} className='text-[#928b8b]' />
					</div>
				</div>
				<div className='mt-4 flex flex-col gap-y-5'>
					<AddBookInput
						label='Назва'
						register={register}
						placeholder='назва книги'
						name='book_title'
						disabled={isLoading}
						errors={formState.errors}
					/>
					<AddBookInput
						label='Автор'
						register={register}
						placeholder='автор книги'
						name='book_author'
						disabled={isLoading}
						errors={formState.errors}
					/>
					<AddBookInput
						label='Кількість сторінок'
						register={register}
						placeholder='кількість сторінок'
						name='page_count'
						disabled={isLoading}
						errors={formState.errors}
					/>
				</div>
			</div>
		</form>
	);
};
