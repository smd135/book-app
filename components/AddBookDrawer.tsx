'use client';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { GoPencil, GoSearch } from 'react-icons/go';
import { PiBarcode } from 'react-icons/pi';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import qs from 'query-string';
import Link from 'next/link';

export const AddBookDrawer = () => {
	const drawerRef = useRef<HTMLDivElement>(null);

	const [showDrawer, setShowDrawer] = useState(false);
	const searchParams = useSearchParams();

	const pathname = usePathname();
	const router = useRouter();
	const url = qs.stringifyUrl(
		{
			url: pathname,
			query: { show_add: 0 },
		},
		{ skipNull: true, skipEmptyString: true }
	);
	useOutsideClick(() => router.push(url), drawerRef);
	useEffect(() => {
		if (searchParams.get('show_add') === '1') {
			setShowDrawer(true);
		} else if (searchParams.get('show_add') === '0') {
			setShowDrawer(false);
		}
	}, [showDrawer, searchParams]);

	return (
		<>
			{showDrawer && (
				<div
					ref={drawerRef}
					className={clsx(
						'bg-white absolute bottom-0 left-0 h-[12rem] z-100 w-full opacity-0 transform -translate-y-full transition-all duration-150 rounded-xl shadow-sm',
						showDrawer && 'opacity-100 bottom-0 transform translate-y-0'
					)}
				>
					<div className='flex items-center justify-center'>
						<div className='w-12 h-[0.3rem] rounded-md bg-[#dfdfdf] absolute top-2' />
					</div>

					<div className='pt-6 pl-8 pb-12 flex justify-start items-center'>
						<div className='flex flex-col gap-3'>
							<span className='flex items-center gap-3'>
								<PiBarcode className='w-4 h-4' />
								<p className='font-medium'>Сканувати ISBN книжки</p>
							</span>
							<span className='flex items-center gap-3'>
								<GoSearch className='w-4 h-4' />
								<p className='font-medium'>Пошук книжок</p>
							</span>
							<Link href='/add' className='flex items-center gap-3'>
								<GoPencil className='w-4 h-4' />
								<p className='font-medium'>Додати книжку вручну</p>
							</Link>
						</div>
						<div className='w-full h-6 bg-neutral-100 absolute bottom-0 left-0 rounded-b-3xl' />
					</div>
				</div>
			)}
		</>
	);
};
