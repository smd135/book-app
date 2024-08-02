import { GoDotFill } from 'react-icons/go';

const MainLoading = () => {
	return (
		<div className='h-screen w-screen flex-center'>
			<GoDotFill className='transition-transform animate-bounce text-violet-500' />
			<GoDotFill className='transition-transform animate-bounce delay-75 text-violet-500' />
			<GoDotFill className='transition-transform animate-bounce text-violet-700' />
		</div>
	);
};
export default MainLoading;
