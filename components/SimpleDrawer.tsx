'use client';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { LegacyRef, useEffect, useRef, useState } from 'react';
import { GoPencil, GoSearch } from 'react-icons/go';
import { PiBarcode } from 'react-icons/pi';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import qs, { Stringifiable, StringifiableRecord } from 'query-string';
import Link from 'next/link';

type SimpleDrawerProps = {
	children: React.ReactNode;
	queryKey: string;
	className?: string;
	queryValues: StringifiableRecord;
};
export const SimpleDrawer = ({ children, queryKey, queryValues, className }: SimpleDrawerProps) => {
	const drawerRef = useRef<HTMLDivElement>(null);

	const [showDrawer, setShowDrawer] = useState(false);
	const searchParams = useSearchParams();

	const pathname = usePathname();
	const router = useRouter();
	const url = qs.stringifyUrl(
		{
			url: pathname,
			query: queryValues,
		},
		{ skipNull: true, skipEmptyString: true }
	);
	console.log(queryKey.toString());
	useEffect(() => {
		if (searchParams.get(queryKey) === 'true') {
			setShowDrawer(true);
		} else if (searchParams.get(queryKey) === 'false') {
			setShowDrawer(false);
		}
	}, [showDrawer, searchParams]);
	useOutsideClick(() => router.push(url), drawerRef);
	return (
		<>
			{showDrawer && (
				<div
					ref={drawerRef}
					className={clsx(
						'bg-white absolute bottom-0 left-0 min-h-[12rem] z-100 w-full opacity-0 transform -translate-y-full transition-all duration-300 rounded-xl shadow-sm',
						className,
						showDrawer && 'opacity-100 bottom-0 transform translate-y-0'
					)}
				>
					<div className='flex items-center justify-center'>
						<div className='w-12 h-[0.3rem] rounded-md bg-[#dfdfdf] absolute top-2' />
					</div>

					<div className='pt-6 pl-8 pb-12 flex justify-start items-center'>
						{children}
						<div className='w-full h-6 bg-neutral-100 absolute bottom-0 left-0 rounded-b-3xl' />
					</div>
				</div>
			)}
		</>
	);
};
