'use client';
import { GobackButton } from '@/components/shared/GobackButton';
import { SimpleDrawer } from '@/components/SimpleDrawer';
import { Book } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { GoImage, GoPencil, GoShare, GoTrash } from 'react-icons/go';
import { PiDotsThreeOutlineVerticalFill, PiStarFill, PiStarHalfFill } from 'react-icons/pi';
const rating = 4;
const wholeStars = Math.floor(rating);
const halfStar = rating - wholeStars || null;
export const SingleBook = ({ book, bookId }: { book: Book[]; bookId: string }) => {
	const pathname = usePathname();
	const router = useRouter();

	const onBookMenu = () => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: { book_menu: 'true' },
			},
			{ skipEmptyString: true, skipNull: true }
		);
		router.push(url);
	};
	return (
		<div className='pt-4 w-full'>
			<SimpleDrawer queryKey='book_menu' queryValues={{ book_menu: 'false' }} className='pb-4'>
				<div className='flex flex-col gap-4 py-4'>
					<Link href={`/books/${bookId}/edit`} className='flex items-center gap-2'>
						<GoPencil className='' />
						<p>Редагувати книжку</p>
					</Link>
					<Link href='' className='flex items-center gap-2'>
						<GoShare className='' />
						<p>Поділитися</p>
					</Link>
					<Link href='' className='flex items-center gap-2'>
						<GoTrash className='text-red-500' />
						<p>Поділитися</p>
					</Link>
				</div>
			</SimpleDrawer>
			<div className='w-full flex flex-items-center justify-between mb-6'>
				<GobackButton />
				<button onClick={onBookMenu} type='button'>
					<PiDotsThreeOutlineVerticalFill />
				</button>
			</div>
			{book?.map((book: Book) => (
				<div>
					<div key={book.id} className='flex flex-col items-center gap-4'>
						<div className='relative w-36 h-56 '>
							{book.cover_url ? (
								<Image src={book.cover_url} alt='book cover' fill className='object-cover rounded-lg' />
							) : (
								<span className='flex justify-center items-center h-24 bg-[#9e9b9b]'>
									<GoImage className='text-white' size={18} />
								</span>
							)}
						</div>
						<div className='w-full px-4 flex justify-center text-center'>
							<div>
								<h3 className='font-semibold text-lg'>{book.title}</h3>
								<p className='text-md text-secondary'>{book.author}</p>
							</div>
						</div>
						{/* Start rating */}
						<div className='mt-4 rounded-xl'>
							<div className='w-full flex items-center gap-1'>
								{Array.from(Array(wholeStars)).map((star, index) => {
									return <PiStarFill key={index} size={20} className={clsx('text-amber-500')} />;
								})}
								{halfStar &&
									Array.from(Array(1)).map((star, index) => {
										return <PiStarHalfFill key={index} size={20} className={clsx('text-amber-500')} />;
									})}
								{!halfStar &&
									Array.from(Array(1)).map((star, index) => {
										return <PiStarFill key={index} size={20} className={clsx('text-gray-400')} />;
									})}
							</div>
						</div>
					</div>
					<div className='pt-4'>
						<p className='text-secondary'>Прочитано сторінок</p>
						<div className='w-full pt-2 flex items-center gap-2'>
							<span className='flex relative w-[80%] h-1.5 bg-gray-300'>
								<button type='button' draggable={true} onDrag={() => console.log('dragging')}>
									<span className='block h-5 w-2 bg-neutral-800 transform -translate-y-[30%] rounded-[2px] ' />
								</button>
							</span>
							<span className='text-gray-600 text-sm font-bold'>
								з {book.page_count}
								<span className='font-semibold'>ст</span>
							</span>
						</div>
					</div>
				</div>
			))}
			{!book && <p>Книжку не знайдено</p>}
		</div>
	);
};
