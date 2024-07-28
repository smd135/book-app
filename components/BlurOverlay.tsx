'use client';
import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const BlurOverlay = ({ children }: { children: React.ReactNode }) => {
	const searchParams = useSearchParams();
	const [blur, setBlur] = useState(false);
	useEffect(() => {
		if (searchParams.get('show_add') === '1') {
			setBlur(true);
		} else {
			setBlur(false);
		}
	}, [searchParams]);
	return (
		<div
			className={clsx(
				blur && ' left-0 top-0 w-full h-[calc(100%-12rem)] filter saturate-100  opacity-6 bg-[#cacaca15] z-20 '
			)}
		>
			{children}
		</div>
	);
};
