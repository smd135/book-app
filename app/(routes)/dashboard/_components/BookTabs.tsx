'use client';
import dynamic from 'next/dynamic';
import { BooksContent } from '../_components/BooksContent';
import { Book } from '@prisma/client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { Loader } from '@/components/shared/Loader';
const BookShelfContent = dynamic(() => import('../_components/BookShelfContent').then((module) => module.BookShelfContent), {
	loading: () => <Loader />,
});
const BookTags = dynamic(() => import('../_components/BookTags').then((module) => module.BookTags), {
	loading: () => <Loader />,
});
const BooksWished = dynamic(() => import('../_components/BooksWished').then((module) => module.BooksWished), {
	loading: () => <Loader />,
});
import qs from 'query-string';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { GoPlus } from 'react-icons/go';

export const BookTabs = ({ books }: { books: Book[] }) => {
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();
	const tabParams = searchParams.get('tab');
	const [activeTab, setActiveTab] = useState('');
	const bookTabs = [
		{ label: 'Книжки', bookContent: <BooksContent books={books} />, tab: 'books' },
		{ label: 'Полиці', bookContent: <BookShelfContent />, tab: 'shelves' },
		{ label: 'Теги', bookContent: <BookTags />, tab: 'tags' },
		{ label: 'Список бажань', bookContent: <BooksWished />, tab: 'wished' },
	];
	const setTabUrl = (tabName: string) => {
		return router.push(
			qs.stringifyUrl(
				{
					url: pathname,
					query: { tab: tabName },
				},
				{ skipNull: true, skipEmptyString: true }
			)
		);
	};
	const getHeadingName = () => {
		switch (tabParams) {
			case 'books':
				return 'Книжки';
			case 'shelves':
				return 'Полиці';
			case 'tags':
				return 'Теги';
			case 'wished':
				return 'Списки бажань';
		}
	};
	const getAddLink = (): string | '' => {
		switch (tabParams) {
			case 'books':
				return '/add';
			case 'shelves':
				return '/shelves/new';
			case 'tags':
				return '';
			case 'wished':
				return '/';
			default:
				return '';
		}
	};
	const setDefaultQueryParams = (): void => {
		router.push(
			qs.stringifyUrl(
				{
					url: pathname,
					query: { tab: 'books' },
				},
				{ skipNull: true, skipEmptyString: true }
			)
		);
	};

	useEffect(() => {
		// Setting default query params (not showing data depended on searhch params)
		// setDefaultQueryParams();
		if (!tabParams) {
			return router.push(`${pathname}/?tab=books`);
		}
	}, []);
	return (
		<>
			<div className='flex items-baseline justify-between'>
				<div className='flex items-baseline gap-1'>
					<p className='font-bold text-2xl leading-loose tracking-normal'>{tabParams ? getHeadingName() : 'Книжки'}</p>
					<p className='text-thin text-secondary leading-none tracking-normal text-sm'>
						{tabParams === 'books' && (
							<>
								({books.length}
								{books.length > 4 || books.length === 0 ? ' книжок' : books.length <= 4 ? ' книжки' : ''})
							</>
						)}
					</p>
				</div>

				<Link href={getAddLink()}>
					<GoPlus size={24} strokeWidth='0.3' />
				</Link>
			</div>

			<div className='mt-2 flex items-center justify-around'>
				{bookTabs.map((tab, index) => (
					<button
						onClick={() => {
							setActiveTab(tab.tab), setTabUrl(tab.tab);
						}}
						key={tab.label}
						className={clsx('text-secondary text-md px-2', tab.tab === tabParams && 'text-black font-medium border-b border-black')}
					>
						{tab.label}
					</button>
				))}
			</div>
			<div className=''>
				{bookTabs.map((content, index) => (
					<div key={index} className={clsx(content.tab === tabParams ? 'flex' : 'hidden', '')}>
						{content.bookContent}
					</div>
				))}
			</div>
		</>
	);
};
