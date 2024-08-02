import axios from 'axios';
import { SingleOpenBookContent } from './_components/SingleOpenBookContent';

import { Suspense } from 'react';
import { Loader } from '@/components/shared/Loader';

const SinleOpenBookPage = async ({ params }: { params: { bookId: string } }) => {
	const { data: book } = await axios.get(
		`https://www.googleapis.com/books/v1/volumes/${params.bookId}?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
	);
	return (
		<div className='px-4 py-2'>
			<Suspense fallback={<Loader />}>
				<SingleOpenBookContent book={book} />
			</Suspense>
		</div>
	);
};
export default SinleOpenBookPage;
