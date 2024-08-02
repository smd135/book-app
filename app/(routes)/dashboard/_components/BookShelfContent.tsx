import { Book } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoImage } from 'react-icons/go';
import { BookFilterButtons } from './BookFilterButtons';

type BookShelvesT = {
	id: string;
	books: Book[];
	user: string;
	user_id: string;
	name: string;
	img_url: string;
	createdAt: Date;
	updatedAt: Date;
}[];
export const BookShelfContent = () => {
	const [shelves, setShelves] = useState<BookShelvesT>(new Array());
	const getShelves = async () => {
		const { data } = await axios.get(`/api/shelves`);
		setShelves(data);
	};
	useEffect(() => {
		getShelves();
	}, []);
	console.log(shelves, 'shelves');
	return (
		<div className='w-full'>
			<BookFilterButtons />
			<div className='flex flex-col gap-4 mt-4'>
				{shelves &&
					shelves.map((shelf) => {
						const book = shelf.books;
						return (
							<Link key={shelf.id} href={`/shelves/${shelf.id}`} className='w-full flex flex-col gap-4'>
								<div className='  flex items-center gap-4 w-full'>
									<div className='relative w-20 h-20'>
										{shelf.img_url && <Image src={shelf.img_url} fill alt='' sizes='100%' className='object-cover' />}
										{!shelf.img_url &&
											book &&
											book.length > 0 &&
											book.map((item) => (
												<div key={item.id} className=''>
													{item.cover_url && <Image src={item.cover_url} fill alt='' sizes='100%' className='object-cover' />}
												</div>
											))}
										{!shelf.img_url && (
											<span className='w-20 h-20 bg-neutral-200 flex justify-center items-center'>
												<GoImage className='text-neutral-500' />
											</span>
										)}
									</div>
									<div className='flex items-center gap-0.5'>
										<h3 className='font-semibold'>{shelf.name}</h3>
										<p className='text-sm text-neutral-600 font-light'>
											({shelf.books?.length}
											{shelf.books?.length > 0 && shelf.books?.length < 5 ? ' книги' : shelf.books?.length === 1 ? ' книга' : ' книг'})
										</p>
									</div>
								</div>
							</Link>
						);
					})}
			</div>
			{!shelves.length && (
				<div className='flex justify-center items-center w-full h-full'>
					<div className='flex flex-col items-center gap-1 w-full text-neutral-700'>
						<p>У вас поки що немає створених полиць</p>
						<div>
							Для створення, натисніть
							<Link href='/shelves/new' className='pl-1 inline-block font-medium text-amber-600'>
								тут
							</Link>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
