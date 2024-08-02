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
	queryKey: string;
	className?: string;
	queryValues: StringifiableRecord;
	dialogQuestion: string;
	dialogYes: string;
	dialogNo: string;
	dialogYesClick: () => void;
};
export const ConsentDialog = ({ queryKey, queryValues, dialogQuestion, dialogYes, dialogNo, dialogYesClick, className }: SimpleDrawerProps) => {
	const drawerRef = useRef<HTMLDialogElement>(null);

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
			drawerRef.current?.showModal();
			setShowDrawer(true);
		} else {
			setShowDrawer(false);
			drawerRef.current?.close();
		}
	}, [showDrawer, searchParams]);

	useOutsideClick(() => router.push(url), drawerRef);
	return (
		<>
			<dialog open={showDrawer} className='absolute top-[20%] bg-neutral-200 z-50 w-full rounded-xl p-4'>
				<div className='pb-2 flex justify-center'>
					<h2 className='text-lg font-medium'>{dialogQuestion}</h2>
				</div>
				<div className='flex items-center justify-center gap-6 pt-4'>
					<button onClick={() => router.push(url)} type='button' className='text-neutral-800 font-semibold bg-white px-4 py-1 rounded-md'>
						{dialogNo}
					</button>
					<button
						onClick={() => {
							dialogYesClick();
							router.push(url);
						}}
						type='button'
						className='text-white font-semibold bg-black px-4 py-1 rounded-md'
					>
						{dialogYes}
					</button>
				</div>
			</dialog>
		</>
	);
};
