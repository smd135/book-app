import { BiErrorCircle } from 'react-icons/bi';

export const GenrePlaceholder = () => {
	return (
		<div className='flex items-center gap-1 text-orange-300 font-semibold text-md'>
			Помилка завантаження
			<BiErrorCircle />
		</div>
	);
};
