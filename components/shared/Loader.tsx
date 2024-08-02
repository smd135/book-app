import { LuLoader2 } from 'react-icons/lu';

export const Loader = () => {
	return (
		<div className='h-screen w-screen z-50 flex items-center justify-center bg-gray-200/60'>
			<LuLoader2 size={48} className='animate-spin' />
		</div>
	);
};
