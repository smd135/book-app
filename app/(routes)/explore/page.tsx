import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { GoBook, GoSearch } from 'react-icons/go';
import { GenreItem } from './_components/GenreItem';
import { GenrePlaceholder } from './_components/GenrePlaceholder';

const ExplorePage = async () => {
	return (
		<div className='px-4 py-2'>
			<div className='flex items-center justify-between'>
				<p className='text-lg font-semibold'>Всі</p>
				<GoSearch size={22} className='text-amber-600' />
			</div>
			<div className='flex flex-col gap-4 last:mb-16'>
				{/* Fiction */}
				<Suspense fallback={<GenrePlaceholder />}>
					<GenreItem subject='fiction' title='Художня література' />
				</Suspense>
				{/* Romance */}
				<Suspense fallback={<GenrePlaceholder />}>
					<GenreItem subject='love' title='Любовні романи' />
				</Suspense>
			</div>
		</div>
	);
};
export default ExplorePage;
