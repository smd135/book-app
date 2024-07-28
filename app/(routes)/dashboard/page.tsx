import { auth } from '@/auth';
import { GoChevronDown, GoFilter, GoSearch, GoSortDesc } from 'react-icons/go';
import clsx from 'clsx';
import { Book } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { BooksContent } from './_components/BooksContent';
import SearchModal from './_components/SearchModal';

const DashboardPage = async () => {
	const isTabActive = true;
	const bookTabs = [{ label: 'Книжки' }, { label: 'Полиці' }, { label: 'Теги' }, { label: 'Список бажань' }];
	const session = await auth();
	const books: Book[] = await prisma.book.findMany({ where: { user_id: session?.user?.id } });
	return (
		<div className='px-6'>
			<SearchModal books={books} />
			<div>
				<div className='flex items-baseline gap-1'>
					<p className='font-bold text-2xl leading-loose tracking-normal'>Книжкова полиця</p>
					<p className='text-thin text-secondary leading-none tracking-normal text-sm'>(0 книжок)</p>
				</div>
				<div className='mt-2 flex items-center justify-around'>
					{bookTabs.map((book, index) => (
						<button
							key={book.label}
							className={clsx(
								'text-secondary text-md px-2',
								index === 1 && 'text-black font-medium border-b border-black'
							)}
						>
							{book.label}
						</button>
					))}
				</div>
				<div className='mt-4 flex items-center gap-x-2'>
					<div className='rounded-md p-1 border text-secondary'>
						<button type='button' className='realtive flex items-center gap-1 text-sm'>
							<GoSearch className='mb-0.5' size={16} />
							Пошук
							<GoChevronDown />
						</button>
					</div>
					<div className='rounded-md p-1 border text-secondary'>
						<button type='button' className='realtive flex items-center gap-1 text-sm'>
							<GoFilter size={16} />
							Фільтр
							<GoChevronDown />
						</button>
					</div>
					<div className='rounded-md p-1 border text-secondary'>
						<button type='button' className='realtive flex items-center gap-1 text-sm'>
							<GoSortDesc size={16} />
							Сортувати
							<GoChevronDown />
						</button>
					</div>
				</div>
			</div>
			<BooksContent userId={session?.user?.id || ''} books={books} />
		</div>
	);
};
export default DashboardPage;
