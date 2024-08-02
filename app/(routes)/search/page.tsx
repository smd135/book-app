'use client';
import axios from 'axios';
import { SearchBar } from './_components/SearchBar';
import Image from 'next/image';
import { useDebounce } from '@/hooks/useDebounce';
import { useEffect, useState } from 'react';
import { GoBook, GoSearch } from 'react-icons/go';
import { LuLoader2 } from 'react-icons/lu';
import Link from 'next/link';

type BookT = {
	id: string;
	title: string;
	author: string;
	url: string;
	cover: string;
	volumeInfo: {
		authors: string[];
		pageCount: number;
		title: string;
		description: string;
		categories: string[];
		imageLinks: {
			smallThumbnail: string;
			thumbnail: string;
			medium: string;
		};
	};
};

const SearchPage = () => {
	const [searchValue, setSearchValue] = useState('');
	const debouncedValue = useDebounce(searchValue);
	const [books, setBooks] = useState<BookT[] | null>(null);
	const [loading, setLoading] = useState(false);
	const [errors, setErrors] = useState('');

	const getBooks = async () => {
		try {
			setLoading(true);
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_GOOGLE_BOOKS}?q=intitle:${debouncedValue}&projection=lite&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
			);
			if (searchValue === '') return null;
			setBooks(data.items);
		} catch (error) {
			setErrors('Не вдалося завантажити');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (debouncedValue.length >= 3) {
			getBooks();
		}
	}, [debouncedValue]);
	return (
		<div className='py-4 px-4 w-full'>
			<div>
				<GoSearch className='absolute top-7 left-5 z-10' size={20} />
				{loading && <LuLoader2 size={24} className='absolute top-6 right-5 animate-spin text-gray-500 z-10' />}
				<input
					value={searchValue}
					onChange={({ target }) => setSearchValue(target.value)}
					type='text'
					name='search'
					placeholder='шукайте за назвою чи номером isbn'
					className='relative w-full pl-8 py-2 rounded-md'
				/>
			</div>

			{errors && (
				<div className='w-full h-20 mt-2'>
					<p>Помилка завантаження</p>
				</div>
			)}
			<div className='mt-4 flex flex-col gap-y-3'>
				{books &&
					books.map((book: BookT) => {
						return (
							<Link key={book.id} href={`/search/${book.id}`} className='bg-white rounded-xl p-2 flex gap-4'>
								<div className='relative flex items-center justify-center w-16 h-20'>
									{new Array(book.volumeInfo).map((values) => {
										const thumbnail = values.imageLinks || '';
										if (thumbnail) {
											return <Image key={values.title} fill sizes='100%' src={thumbnail.medium} alt={`cover`} className='rounded-sm' />;
										} else {
											return (
												<span key={values.title} className='flex justify-center items-center flex-shrink-0 w-16 h-full bg-[#bebebe] rounded-lg'>
													<GoBook className='text-white' size={18} />
												</span>
											);
										}
									})}
								</div>
								<div className='flex flex-col'>
									<p className='font-semibold line-clamp-1'>{book.volumeInfo.title}</p>
									<p className='text-sm font-semibold text-neutral-700'>{book.volumeInfo.authors}</p>
								</div>
							</Link>
						);
					})}
				{(!books || debouncedValue === '') && <p>Введіть будь ласка назву книги</p>}
			</div>
		</div>
	);
};
export default SearchPage;
