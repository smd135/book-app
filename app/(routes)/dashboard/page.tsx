import { auth } from '@/auth';
import { Book } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import SearchModal from './_components/SearchModal';
import { BookTabs } from './_components/BookTabs';

const DashboardPage = async () => {
	const session = await auth();
	const books: Book[] = await prisma.book.findMany({ where: { user_id: session?.user?.id } });

	return (
		<div className='px-4'>
			<BookTabs books={books} />
			{/* {book} */}
			<SearchModal books={books} />
		</div>
	);
};
export default DashboardPage;
