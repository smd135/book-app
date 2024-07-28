'use client';
import { PiBooksLight, PiCompassLight, PiPlusCircleLight, PiChartBarLight } from 'react-icons/pi';
import { TbMenuDeep } from 'react-icons/tb';
import { BottomNavbarItem } from './BottomNavbarItem';
import { IoMenuSharp } from 'react-icons/io5';

export const BottomNavbar = () => {
	const navIcons = [
		{
			href: '/dashboard',
			icon: PiBooksLight,
		},
		{
			href: '/search',
			icon: PiCompassLight,
		},
		{
			href: '/add',
			icon: PiPlusCircleLight,
		},
		{
			href: '/stats',
			icon: PiChartBarLight,
		},
		{
			href: '/more',
			icon: IoMenuSharp,
		},
	];

	return (
		<div className='fixed bottom-0 left-0 h-12 w-full bg-white border-t border-[#b1b1b1] z-20'>
			<div className='px-1 py-2 flex items-center justify-around'>
				{navIcons.map((item) => {
					return <BottomNavbarItem key={item.href} href={item.href} icon={item.icon} />;
				})}
			</div>
		</div>
	);
};
