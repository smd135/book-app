import Image from 'next/image';
import { GoImage } from 'react-icons/go';
import { LiaReadme } from 'react-icons/lia';
import { Book } from '@prisma/client';
import { useChoosedBooksStore } from '@/lib/stores/useChoosedBooksStore';
import clsx from 'clsx';

export const ShelfEditItem = ({ book }: { book: Book }) => {
	const { setChoosedBooks } = useChoosedBooksStore((state) => state);
	const { choosedBooks } = useChoosedBooksStore((state) => state);

	return (
		<label
			key={book.id}
			className={clsx(
				choosedBooks.includes(book.id!) && 'bg-neutral-200/70  rounded-xl',
				'w-full flex items-center gap-4 p-2 border-2 border-transparent overflow-hidden hover:border-2 hover:border-dashed hover:border-neutral-300 rounded-xl'
			)}
		>
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
	);
};
