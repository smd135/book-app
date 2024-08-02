import { auth } from '@/auth';
import { ChooseBooksContent } from './_components/ChooseBooksContent';
import { prisma } from '@/lib/prisma';
import { GoSearch, GoX } from 'react-icons/go';

const ChooseSheflIdPage = async ({ params }: { params: { shelfId: string } }) => {
	const session = await auth();
	const books = await prisma.book.findMany({ where: { user_id: session?.user?.id }, orderBy: { createdAt: 'desc' } });
	return (
		<div className='p-4'>
			<ChooseBooksContent books={books} shelfId={params.shelfId} />
		</div>
	);
};
export default ChooseSheflIdPage;
