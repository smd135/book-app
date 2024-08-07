'use client';
import { Book } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { GoPlusCircle, GoImage } from 'react-icons/go';
import { LiaReadme } from 'react-icons/lia';
import { BookFilterButtons } from './BookFilterButtons';

export const BooksContent = ({ books }: { books: Book[] }) => {
	return (
		<div className='flex flex-col'>
			<BookFilterButtons />
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
						{books?.map((book: Book) => (
							<Link href={`/books/${book.id}`} key={book.id} className='w-full flex items-center gap-4 last:mb-[20%w]'>
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
							</Link>
						))}
					</>
				</div>
			)}
		</div>
	);
};
