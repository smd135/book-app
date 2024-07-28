'use client';

import { Book } from '@prisma/client';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { GoX } from 'react-icons/go';

export default function SearchModal({ books }: { books: Book[] }) {
	const [searchValue, setSearchValue] = useState('hung');
	const searchRef = useRef<HTMLInputElement>(null);
	console.log(searchValue);
	return (
		<div className='absolute top-0 left-0 bg-gray-200 h-screen w-full z-50'>
			<div className='px-6 py-4'>
				<p className='font-semibold text-center text-xl'>Пошук по книжкам</p>
				<div className='mt-6 w-full flex items-center justify-between'>
					<input
						type='text'
						onChange={({ target }) => setSearchValue(target.value)}
						placeholder='введіть назву книжки'
						className='px-4 rounded-2xl py-2 w-full'
					/>
					<button onClick={() => searchRef.current?.reset} type='button'>
						<GoX size={32} strokeWidth={0} className='text-gray-500' />
					</button>
					{/* Field with search results */}
				</div>

				{books
					.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
					.map((book) => (
						<div key={book.id} className='mt-4 flex gap-4 p-2 bg-white rounded-xl'>
							{!book.cover_url ? (
								<span className='block w-16 h-24 bg-gray-400/60 rounded-lg' />
							) : (
								<div className='relative w-16 h-24'>
									<Image src={book.cover_url} alt='book cover' fill className='object-cover rounded-sm' />{' '}
								</div>
							)}

							<div className='flex flex-col pt-1'>
								<p className='font-semibold text-md'>{book.title}</p>
								<p className='font-semibold text-gray-600 text-sm'>{book.author}</p>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
