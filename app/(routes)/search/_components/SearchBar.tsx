import { GoSearch } from 'react-icons/go';

export const SearchBar = () => {
	return (
		<>
			<GoSearch className='absolute top-7 left-5 z-10' size={20} />
			<input
				type='text'
				name='search'
				placeholder='шукайте за назвою чи номером isbn'
				className='relative w-full pl-8 py-2 rounded-md'
			/>
		</>
	);
};
