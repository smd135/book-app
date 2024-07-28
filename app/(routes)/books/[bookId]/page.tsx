import { auth } from '@/auth';
import { GobackButton } from '@/components/shared/GobackButton';
import { axiosInstance } from '@/lib/axiosFetcher';
import { prisma } from '@/lib/prisma';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import Image from 'next/image';
import { GoImage } from 'react-icons/go';
import { LiaReadme } from 'react-icons/lia';
import { Book, BookShelf } from '@prisma/client';
import { SingleBook } from './_components/SingleBook';

const BookIdPage = async ({ params }: { params: { bookId: string } }) => {
	// TODO: implement single book page
	const session = await auth();

	const book: any = await prisma.book.findUnique({
		where: { user_id: session?.user?.id, id: params.bookId },
	});

	return (
		<div className='px-6 py-4'>
			<SingleBook book={[book]} bookId={book.id} />
		</div>
	);
};
export default BookIdPage;
