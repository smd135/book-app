'use client';
import { Book } from '@prisma/client';
import toast from 'react-hot-toast';
import axios from 'axios';
import { GoImage, GoPlusCircle, GoSearch, GoX } from 'react-icons/go';
import Image from 'next/image';
import { LiaReadme } from 'react-icons/lia';
import { useState } from 'react';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';
import { useChoosedBooksStore } from '@/lib/stores/useChoosedBooksStore';

export const ChooseBooksContent = ({ books, shelfId }: { books: Book[]; shelfId: string }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const debouncedSearchValue = useDebounce(searchValue, 1000);
	const { setChoosedBooks } = useChoosedBooksStore((state) => state);
	const { choosedBooks } = useChoosedBooksStore((state) => state);
	//------------------------------------------
	const router = useRouter();
	const searchParams = useSearchParams();

	const onClick = async () => {
		try {
			setIsLoading(true);
			await axios.post(`/api/shelves/${shelfId}`, choosedBooks);
			router.refresh();
			toast.success('Добавлено книги у вашу полицю');
			router.push(`/shelves/${shelfId}`);
		} catch (error) {
			toast.error('Щось пішло не так');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div>
			<div className='flex justify-end'>
				<button onClick={() => router.push(`/shelves/${shelfId}`)}>
					<GoX size={26} />
				</button>
			</div>
			<div className='relative mt-6'>
				<GoSearch className='absolute top-3 left-2 z-10' size={20} />
				<input
					onChange={({ target }) => setSearchValue(target.value)}
					type='text'
					placeholder='шукайте за назвою книги'
					className=' w-full pl-8 py-2 rounded-md'
				/>
			</div>
			{!books ? (
				<div className='mt-[20%] flex flex-col h-full'>
					<div className='flex flex-col justify-center h-full text-sm text-secondary relative'>
						<div className='flex justify-center items-center w-full mb-4'>
							<div className='flex flex-col justify-around items-center gap-y-3 w-[10rem] h-[6rem] bg-transparent border-t-2 border-b-2 border-[#664323]'>
								<div className='w-[80%] h-[2px] bg-[#d1a25b]' />
								<div className='w-[80%] h-[2px] bg-[#d1a25b]' />
							</div>
						</div>
						<div className='mt-4 flex flex-col gap-y-1 justify-center text-center text-base w-full'>
							<span>Ваша книжкова полиця пуста</span>
							<div className='flex items-center justify-center'>
								<span>Щоб додати нову книжку натисніть</span>
								<GoPlusCircle size={20} className='flex-shrink-0 ml-1' />
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className='w-full flex flex-col gap-5 mt-6'>
					<>
						{books
							?.filter((item) => item.title.toLowerCase().includes(debouncedSearchValue.toLowerCase()))
							.map((book: Book) => (
								<label key={book.id} className={clsx(choosedBooks.includes(book.id) && 'bg-neutral-200/70  rounded-xl', 'w-full flex items-center gap-4 p-2')}>
									<input type='checkbox' className='invisible' value={book.id} onChange={(e) => setChoosedBooks(e)} />
									<div className='relative w-24 h-28 '>
										{book.cover_url ? (
											<Image src={book.cover_url} alt='book cover' fill sizes='100%' className='object-cover rounded-sm' />
										) : (
											<span className='flex justify-center items-center h-24 bg-[#9e9b9b]'>
												<GoImage className='text-white' size={18} />
											</span>
										)}
									</div>
									<div className='w-full px-2'>
										<h3 className='font-medium'>{book.title}</h3>
										<p className='text-sm text-secondary'>{book.author}</p>
										<div className='mt-2 h-[3px] w-[50%] bg-[#c0c0c0] rounded-sm'></div>
										<p className='text-xs text-secondary'>0%</p>
										<div className='pt-1 text-xs flex items-center gap-1'>
											<LiaReadme size={14} color='#000' />
											{book.page_count && <p className='text-gray-700'>{book.page_count}с</p>}
										</div>
									</div>
								</label>
							))}
					</>
					<button
						onClick={onClick}
						className='mt-4 py-1 text-white text-center font-medium text-lg rounded-xl w-full bg-black disabled:bg-neutral-700'
						type='submit'
						disabled={isLoading || !choosedBooks.length}
					>
						Вибрати
					</button>
				</div>
			)}
		</div>
	);
};
