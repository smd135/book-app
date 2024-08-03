import Image from 'next/image';
import { RecentBooksT } from '../page';

export const RecentBooks = ({ books }: { books: RecentBooksT }) => {
	return (
		<div className='mt-4 w-full flex flex-col p-2 rounded-xl border-2 border-[#e7e7e734] shadow-sm'>
			<h3 className='text-[#b9772c] font-medium'>Останні книги</h3>
			<div className='flex items-center mt-4 overflow-hidden'>
				<div className='flex items-center gap-4 '>
					{books &&
						books.slice(0, 5).map((book) => (
							<div key={book.id} className='relative w-[5rem] h-[7rem]'>
								{book.cover_url ? (
									<Image key={book.id} src={book.cover_url} alt={book.title} sizes='100%' fill objectFit='cover' className='rounded-md' />
								) : (
									<div></div>
								)}
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
