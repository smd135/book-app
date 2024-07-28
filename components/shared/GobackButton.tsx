'use client';
import { useRouter } from 'next/navigation';
import { GoArrowLeft } from 'react-icons/go';

export const GobackButton = () => {
	const router = useRouter();
	return (
		<button onClick={() => router.back()} className=''>
			<GoArrowLeft size={20} />
		</button>
	);
};
