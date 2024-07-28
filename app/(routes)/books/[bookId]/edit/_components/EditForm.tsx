'use client';
import { Book } from '@prisma/client';
import Image from 'next/image';
import { GoImage } from 'react-icons/go';
import { AddBookInput } from '@/components/shared/AddBookInput';
import { GoBook } from 'react-icons/go';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { GobackButton } from '@/components/shared/GobackButton';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';

const formSchema = z.object({
	book_title: z.string().min(1, { message: 'Введіть назву книги' }),
	book_author: z.string().min(1, { message: 'Введіть автора книги' }),
	page_count: z.coerce.number(),
});
export const EditForm = ({ book }: { book: Book }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { id, book_title, book_cover_url, book_author, page_count } = book;
	const { register, handleSubmit, formState } = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { book_title, book_author, page_count: Number(page_count) || 0 },
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			setIsLoading(true);
			const book = await axios.patch(`/api/${id}`, values);
			toast.success('Книжку успішно оновлено');
			router.push(`/books/${id}`);
			router.refresh();
		} catch (error) {
			toast.error('Не вдалося оновити книгу');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit(onSubmit)} className='px-6 py-4'>
			<div className='flex items-center justify-between'>
				<GobackButton />
				<button type='submit' className='bg-black text-white font-semibold px-4 py-1 rounded-3xl'>
					Редагувати
				</button>
			</div>
			<div className='flex flex-col gap-3 mt-4'>
				<div className='relative w-36 h-56 '>
					{book_cover_url ? (
						<Image src={book_cover_url || ''} alt='book cover' fill className='object-cover rounded-lg' />
					) : (
						<span className='flex justify-center items-center h-24 bg-[#9e9b9b]'>
							<GoImage className='text-white' size={18} />
						</span>
					)}
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
						type='number'
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
