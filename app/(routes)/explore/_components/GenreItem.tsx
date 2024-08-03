import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { GoBook, GoSearch } from 'react-icons/go';

export const GenreItem = async ({ subject, title }: { subject: string; title: string }) => {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_GOOGLE_BOOKS}?q=subject:${subject}&projection=lite&orderBy=newest&printType=books&filter=ebooks&startIndex=0&maxResults=30&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
	);

	return (
		<div className='mt-4 '>
			<h3 className='text-neutral-600 font-semibold tracking-wide'>{title}</h3>
			<div className='mt-4 flex gap-x-4 bg-white rounded-xl p-2 overflow-y-scroll'>
				{data &&
					data.items.map((book: any) => {
						return (
							<Link key={book.id} href={`/search/${book.id}`} className=' flex'>
								<div className='relative flex items-center justify-center flex-shrink-0 w-[6rem] h-[9rem]'>
									{new Array(book.volumeInfo).map((values) => {
										const thumbnail = values.imageLinks || '';
										if (thumbnail) {
											return <Image key={values.title} fill sizes='100%' src={thumbnail.smallThumbnail} alt={`cover`} className='rounded-sm' />;
										} else {
											return (
												<span key={values.title} className='flex justify-center items-center flex-shrink-0 w-16 h-full bg-[#bebebe] rounded-lg'>
													<GoBook className='text-white' size={18} />
												</span>
											);
										}
									})}
								</div>
							</Link>
						);
					})}
			</div>
		</div>
	);
};
