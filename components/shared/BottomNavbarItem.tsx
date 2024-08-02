import Link from 'next/link';
import { IconType } from 'react-icons/lib';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import qs from 'query-string';

type BottomNavbarItemProps = {
	icon: IconType;
	href: string;
};

export const BottomNavbarItem = ({ icon: Icon, href }: BottomNavbarItemProps) => {
	const pathname = usePathname();
	const router = useRouter();

	const url = qs.stringifyUrl(
		{
			url: pathname,
			query: { show_add: 'true' },
		},
		{ skipNull: true }
	);

	const onClick = (href: string) => {
		if (href !== '/add') {
			router.push(href);
		} else if (href === '/add') {
			router.push(url);
		}
	};
	return (
		<button onClick={() => onClick(href)} className={clsx('w-10 h-10')}>
			<Icon className={clsx('w-8 h-8 text-[#303030]', pathname === href && 'text-[#dd4949]')} />
		</button>
	);
};
