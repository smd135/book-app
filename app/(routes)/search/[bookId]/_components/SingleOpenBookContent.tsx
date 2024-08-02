'use client';
import { GoBook } from 'react-icons/go';
import z from 'zod';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { GobackButton } from '@/components/shared/GobackButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { LuLoader } from 'react-icons/lu';
import Image from 'next/image';
import DOMPurify from 'isomorphic-dompurify';

const formSchema = z.object({
	cover_url: z.string().min(1),
	title: z.string().min(1),
	author: z.string().min(1),
	page_count: z.string(),
	description: z.string(),
});

export const SingleOpenBookContent = ({ book }: { book: any }) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const onSubmit = async () => {
		const values = {
			title: book.volumeInfo.title,
			author: book.volumeInfo.authors[0],
			page_count: book.volumeInfo.pageCount,
			description: book.volumeInfo.description.replaceAll('.', '. '),
			cover_url: book.volumeInfo.imageLinks.thumbnail,
		};
		try {
			setIsLoading(true);
			await axios.post(`/api/book`, values);
			toast.success('Книжку додано успішно');
			router.refresh();
			router.push('/');
		} catch (error) {
			toast.error('Не вдалося зберегти книгу');
		} finally {
			setIsLoading(false);
		}
	};
	const rating = 4;
	const wholeStars = Math.floor(rating);
	const halfStar = rating - wholeStars || null;
	const clearedCategories: any[] = [];
	const bookCategories = book.volumeInfo.categories
		? new Array(book.volumeInfo.categories.toString().replaceAll('/', '').replaceAll(' ', ' ')).join('').toString().split(' ')
		: [];

	const categoryTranslate = () => {
		return bookCategories?.map((item) => {
			switch (item) {
				case 'Fiction':
					return (item = 'Художня література');
				case 'Classics':
					return (item = 'Класика');
				case 'Fantasy':
					return (item = 'Фентезі');
				case 'Science Fiction':
					return (item = 'Наукова Фантастика');
				case 'Mystery':
					return (item = 'Таємниця');
				default:
					return;
			}
		});
	};

	categoryTranslate().forEach((element) => {
		if (!clearedCategories.includes(element)) {
			clearedCategories.push(element);
		}
	});
	console.log(book, 'book');
	return (
		<>
			<div>
				<div className='flex items-center justify-between'>
					<GobackButton />
					<button
						onClick={onSubmit}
						type='button'
						className='bg-black text-white font-semibold px-4 py-1 rounded-3xl disabled:bg-neutral-700'
						disabled={isLoading && !book}
					>
						{isLoading ? (
							<span className='flex items-center gap-1'>
								Додати
								<LuLoader className='!text-white w-4 h-4 animate-spin z-100' />
							</span>
						) : (
							'Додати'
						)}
					</button>
				</div>
				<div className='flex flex-col gap-3 mt-4'>
					{book &&
						new Array(book).map((volume: any) => (
							<div key={volume.id}>
								<div className='flex justify-center'>
									<div className='relative w-36 h-56'>
										{book.volumeInfo.imageLinks ? (
											<Image src={book.volumeInfo.imageLinks.medium} alt='book cover' fill sizes='100%' className='object-cover rounded-lg ' />
										) : (
											<span className='flex justify-center items-center w-36 h-56 bg-[#b1b1b1] rounded-lg'>
												<GoBook className='text-white' size={18} />
											</span>
										)}
									</div>
								</div>
								<div className='mt-4 flex flex-col items-center gap-y-2 '>
									<h3 className='font-semibold text-lg'>{book.volumeInfo.title}</h3>
									<div className='text-md text-secondary'>{book.volumeInfo.authors[0]}</div>
								</div>
								<div className='flex flex-col gap-3 mt-6'>
									<p className='text-md font-semibold'>Про книгу</p>

									<div className='p-3 bg-white rounded-xl space-y-2  [&>*]:pb-2 [&>*]:border-b-2 [&>*]:border-gray-200/50  [&>*:last-child]:border-none'>
										<div className='flex justify-between'>
											<p className='font-semibold'>Кількість сторінок:</p> {book.volumeInfo.pageCount}с
										</div>
										<div className='flex justify-between'>
											<p className='font-semibold'>Видавник:</p> {book.volumeInfo.publisher}
										</div>
										<div className='flex flex-col gap-2'>
											<p className='font-semibold'>Категорія:</p>
											<div className='flex gap-2'>
												{book.volumeInfo.categories &&
													clearedCategories.map((item) => {
														if (item !== undefined)
															return (
																<p key={item} className='bg-zinc-200/40 rounded-sm px-2 py-1'>
																	{item}
																</p>
															);
													})}
												{/* <p>{categoryTranslate()}</p> */}
											</div>
										</div>
										<div className=''>
											<p className='text-md font-semibold pt-4 pb-4'>Опис</p>
											<p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(book.volumeInfo.description) }}></p>
										</div>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</>
	);
};
