import { prisma } from '@/lib/prisma';
import { SingleShelfContent } from './_components/SingleShelfContent';
import { SingleShelfControls } from './_components/SingleShelfControls';
import { auth } from '@/auth';
import { BookShelf } from '@prisma/client';

const ShelfIdPage = async ({ params }: { params: { shelfId: string } }) => {
	const session = await auth();
	const bookShelf = await prisma.bookShelf.findUnique({
		where: { user_id: session?.user?.id, id: params.shelfId },
		include: { books: { select: { id: true, cover_url: true, title: true, author: true, page_count: true } } },
	});
	console.log(bookShelf, 'booksssss');
	return (
		<div className='px-6 py-4'>
			<SingleShelfControls bookShelf={bookShelf!} />
			<SingleShelfContent bookShelf={bookShelf!} />
		</div>
	);
};
export default ShelfIdPage;
