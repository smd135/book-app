import { prisma } from '@/lib/prisma';
import { SingleShelfContent } from './_components/SingleShelfContent';
import { SingleShelfControls } from './_components/SingleShelfControls';
import { auth } from '@/auth';

const ShelfIdPage = async ({ params }: { params: { shelfId: string } }) => {
	const session = await auth();
	const bookShelf = await prisma.bookShelf.findUnique({ where: { user_id: session?.user?.id, id: params.shelfId }, include: { books: true } });
	console.log(bookShelf, 'booksssss');
	return (
		<div className='px-6 py-4'>
			<SingleShelfControls bookShelf={bookShelf!} />
			<SingleShelfContent bookShelf={bookShelf!} />
		</div>
	);
};
export default ShelfIdPage;
