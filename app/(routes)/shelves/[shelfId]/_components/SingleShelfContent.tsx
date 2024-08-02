'use client';
import { Book, BookShelf } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ShelfContentItem } from './ShelfContentItem';
import { ShelfEditItem } from './ShelfEditItem';
import axios from 'axios';
import { useState } from 'react';
import { useChoosedBooksStore } from '@/lib/stores/useChoosedBooksStore';
import toast from 'react-hot-toast';
import qs from 'query-string';
import { BiSolidEdit } from 'react-icons/bi';

interface IBookShelf {
	bookShelf: BookShelf & { books?: Book[] };
}

export const SingleShelfContent = ({ bookShelf }: IBookShelf) => {
	const [isLoading, setIsLoading] = useState(false);
	const searchParams = useSearchParams();
	const isShelfEditMode = searchParams.get('shelf_edit') === 'true';
	const pathname = usePathname();
	const router = useRouter();
	const cancelUrlString = qs.stringifyUrl({ url: pathname, query: { shelf_edit: 'false' } }, { skipEmptyString: true, skipNull: true });
	const { choosedBooks } = useChoosedBooksStore((state) => state);

	const onClick = async () => {
		try {
			setIsLoading(true);
			await axios.patch(`/api/shelves/${bookShelf.id}`, choosedBooks);
			router.refresh();
			toast.success('Ваша полиця відредагована');
			router.push(cancelUrlString);
		} catch (error) {
			toast.error('Щось пішло не так');
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div>
			<div className='w-full flex flex-col gap-5 mt-6'>
				<div className='flex flex-col gap-2'>
					{bookShelf && bookShelf.books && bookShelf.books?.length > 0 ? (
						bookShelf?.books.map((book: Book) => {
							if (isShelfEditMode) return <ShelfEditItem key={book.id} book={book} />;
							if (!isShelfEditMode) return <ShelfContentItem key={book.id} book={book} />;
						})
					) : (
						<div className='flex justify-center items-center w-full h-full mt-4'>
							<div className='flex flex-co items-center gap w-full text-neutral-700'>
								<span className='font-normal text-neutral-600 text-md text-center leading-tight'>
									В даній полиці поки що немає жодної книги,{' '}
									<Link href={`/books/choose/${bookShelf.id}`} className=' text-amber-500 text-md font-medium leading-tight'>
										додати
									</Link>
								</span>
							</div>
						</div>
					)}
				</div>
			</div>
			{isShelfEditMode && (
				<div className='mt-8 p-3 flex flex-col gap-y-2 fixed bottom-[10%] left-0 w-full'>
					<button
						onClick={() => router.push(cancelUrlString)}
						type='button'
						className='py-1 text-neutral-800 text-center font-semibold text-md rounded-xl w-full bg-amber-300 disabled:opacity-70'
					>
						Відмінити
					</button>
					<button
						onClick={onClick}
						className=' py-1 text-white text-center font-semibold text-md rounded-xl w-full bg-black disabled:bg-neutral-700 align-baseline'
						type='submit'
						disabled={isLoading || !choosedBooks.length}
					>
						Видалити{`${' '}${choosedBooks.length === 0 ? '' : choosedBooks.length}`}
						{`${' '}${choosedBooks.length === 0 ? '' : choosedBooks.length > 1 && choosedBooks.length ? 'книги' : 'книга'}`}
					</button>
				</div>
			)}
		</div>
	);
};
