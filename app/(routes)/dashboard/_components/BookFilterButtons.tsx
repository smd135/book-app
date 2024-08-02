'use client';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { GoChevronDown, GoFilter, GoSearch, GoSortDesc } from 'react-icons/go';
import qs from 'query-string';

export const BookFilterButtons = () => {
	const pathname = usePathname();
	const router = useRouter();

	const onSearchClick = () => {
		const url = qs.stringifyUrl(
			{
				url: pathname,
				query: { cbs: true },
			},
			{ skipEmptyString: true, skipNull: true }
		);
		router.push(url);
	};
	return (
		<div className='relative mt-4 flex items-center gap-x-2'>
			<div className='rounded-md p-1 border text-secondary'>
				<button onClick={onSearchClick} type='button' className='realtive flex items-center gap-1 text-sm'>
					<GoSearch className='mb-0.5' size={16} />
					Пошук
					<GoChevronDown />
				</button>
			</div>
			<div className='rounded-md p-1 border text-secondary'>
				<button type='button' className='realtive flex items-center gap-1 text-sm'>
					<GoFilter size={16} />
					Фільтр
					<GoChevronDown />
				</button>
			</div>
			<div className='rounded-md p-1 border text-secondary'>
				<button type='button' className='realtive flex items-center gap-1 text-sm'>
					<GoSortDesc size={16} />
					Сортувати
					<GoChevronDown />
				</button>
			</div>
		</div>
	);
};
