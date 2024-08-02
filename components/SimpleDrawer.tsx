'use client';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useOutsideClick } from '@/hooks/useOutsideClick';
import qs, { StringifiableRecord } from 'query-string';

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

	useEffect(() => {
		if (searchParams.get(queryKey) === 'true') {
			setShowDrawer(true);
		} else if (searchParams.get(queryKey) === 'false' || searchParams.get('shelf_edit') === 'true') {
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
						'bg-white absolute -translate-y-[100vh] left-0 min-h-[16rem] z-50 w-full opacity-0   rounded-xl shadow-sm border-t-2 border-gray-100',
						className,
						showDrawer && 'opacity-100  bottom-[48px] transform translate-y-[1.5rem] border-t-2 border-gray-100 transition-all duration-300'
					)}
				>
					<div className='flex items-center justify-center'>
						<div className='w-12 h-[0.3rem] rounded-md bg-[#dfdfdf] absolute top-2' />
					</div>

					<div className='pt-6 pl-8 flex justify-start items-center'>
						<div>{children}</div>
					</div>
				</div>
			)}
		</>
	);
};
