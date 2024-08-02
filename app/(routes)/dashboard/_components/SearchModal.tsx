'use client';
import { Book } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PiX } from 'react-icons/pi';
import { TbLoader3 } from 'react-icons/tb';
import { RiCloseLargeFill } from 'react-icons/ri';
import qs from 'query-string';

export default function SearchModal({ books }: { books: Book[] }) {
	const [searchValue, setSearchValue] = useState('');
	const [showSearchBooks, setShowSearchBooks] = useState(false);
	const searchParams = useSearchParams();
	const bookSearch = searchParams.get('cbs');
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (bookSearch === 'true') {
			setShowSearchBooks(true);
		} else if (bookSearch === 'false') {
			setShowSearchBooks(false);
		}
	}, [searchParams, bookSearch]);

	const onSearchClick = () => {
		const url = qs.stringifyUrl({
			url: pathname,
			query: { cbs: false },
		});
		router.push(url);
	};
	return (
		<>
			{showSearchBooks && (
				<div className='absolute top-0 h-full left-0 bg-gray-100 w-full z-50 rounded-xl '>
					<div className='px-4 py-1 pt-2'>
						<button onClick={onSearchClick} className='flex justify-end w-full'>
							<PiX size={22} className=' text-zinc-900' />
						</button>
						{/* <p className='font-semibold text-center text-xl'>Пошук по книжкам</p> */}
						<div className='mt-6 w-full flex items-center justify-between'>
							<input
								type='text'
								value={searchValue}
								onChange={({ target }) => setSearchValue(target.value)}
								placeholder='введіть назву книжки'
								className='px-4 rounded-md border border-gray-200 py-1 w-full'
							/>
							{searchValue !== '' && (
								<button onClick={() => setSearchValue('')}>
									<RiCloseLargeFill size={22} className='text-gray-700 transform active:scale-125 ml-1' />
								</button>
							)}
							{/* Field with search results */}
						</div>
						<div className='mt-2  rounded-md'>
							{searchValue != '' ? (
								books
									.slice(0, 5)
									.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
									.map((book) => (
										<Link href={`/books/${book.id}`} key={book.id} className='mt-4 flex gap-4 p-2 bg-white rounded-xl'>
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
										</Link>
									))
							) : (
								<p className='mt-4 pbh text-center font-semibold text-zinc-700'>Шукайте те, що вас цікавить...</p>
							)}
						</div>
						{searchValue !== '' && !books && (
							<div className='w-full h-50vw flex items-center justify-center'>
								<TbLoader3 className='' />
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
}
