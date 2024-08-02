'use client';
import clsx from 'clsx';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export const BlurOverlay = ({ children }: { children: React.ReactNode }) => {
	const searchParams = useSearchParams();
	const [blur, setBlur] = useState(false);

	useEffect(() => {
		if (searchParams.get('show_add') === 'true') {
			setBlur(true);
		} else {
			setBlur(false);
		}
	}, [searchParams]);
	return (
		<div className={clsx('min-h-full', blur && ' left-0 top-0 w-full  filter saturate-100  opacity-8 backdrop-blur-md blur-[1px] bg-[#cacaca3f] z-20 ')}>
			{children}
		</div>
	);
};
