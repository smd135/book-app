import { axiosInstance } from '@/lib/axiosFetcher';
import { prisma } from '@/lib/prisma';
import { EditForm } from './_components/EditForm';
import { redirect } from 'next/navigation';

const EditBookPage = async ({ params }: { params: { bookId: string } }) => {
	const book = await prisma.book.findUnique({ where: { id: params.bookId } });
	if (!book) return redirect('/');
	return (
		<div>
			<EditForm book={book} />
		</div>
	);
};
export default EditBookPage;
