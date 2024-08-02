'use client';
import { GobackButton } from '@/components/shared/GobackButton';
import { SimpleDrawer } from '@/components/SimpleDrawer';
import { Book, BookShelf } from '@prisma/client';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useRouter } from 'next/navigation';
import { GoShare, GoTrash } from 'react-icons/go';
import { MdEdit, MdFormatListBulleted } from 'react-icons/md';
import { PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';
import { ConsentDialog } from '@/components/ConsentDialog';
import axios from 'axios';
import toast from 'react-hot-toast';

export const SingleShelfControls = ({ bookShelf }: { bookShelf: BookShelf & { books?: Partial<Book> } }) => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const menuUrl = qs.stringifyUrl({ url: pathname, query: { shelf_menu: 'true' } }, { skipEmptyString: true, skipNull: true });
	const onDelete = async () => {
		const shelfId = bookShelf.id;
		try {
			await axios.delete(`/api/shelves/${shelfId}`);
			router.refresh();
			toast.success('Полицю видалено');
			router.push(`/shelves`);
		} catch (error) {
			toast.error('Щось пішло не так');
		}
	};
	return (
		<div className=' flex justify-between items-center '>
			<SimpleDrawer queryKey='shelf_menu' queryValues={{ shelf_menu: 'false' }}>
				<div className='flex flex-col gap-6 py-4  '>
					<Link href={`/books/choose/${bookShelf.id}`} className='flex items-center gap-2'>
						<MdFormatListBulleted className='text-neutral-800' />
						<p>Додати книги до полиці</p>
					</Link>
					<Link href={`/shelves/${bookShelf.id}?shelf_edit=true`} className='flex items-center gap-2'>
						<MdEdit className='text-neutral-800' />
						<p>Редагувати полицю</p>
					</Link>
					<Link href='' className='flex items-center gap-2'>
						<GoShare className='' />
						<p>Поділитися</p>
					</Link>
					<Link href={`${pathname}?delete_menu=true`} className='flex items-center gap-2'>
						<GoTrash className='text-red-500' />
						<p>Видалити полицю</p>
					</Link>
				</div>
			</SimpleDrawer>
			<ConsentDialog
				queryKey={'delete_menu'}
				queryValues={{ delete_menu: 'false' }}
				dialogQuestion={'Ви дійсно хочете видалити цю полицю'}
				dialogYes={'Так'}
				dialogNo={'Ні'}
				dialogYesClick={onDelete}
			/>
			<div className='flex items-center gap-6'>
				<GobackButton />
				<h2 className='font-medium text-lg'>{bookShelf.name}</h2>
			</div>
			<button type='button' onClick={() => router.push(menuUrl)} className='cursor-pointer'>
				<PiDotsThreeOutlineVerticalFill />
			</button>
		</div>
	);
};
