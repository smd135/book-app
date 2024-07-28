import { HTMLInputTypeAttribute } from 'react';
import { FieldErrors } from 'react-hook-form';

interface PlainInputProps {
	name: string;
	label: string;
	errors?: FieldErrors;
	type?: HTMLInputTypeAttribute;
	placeholder?: string;
	disabled?: boolean;
	register: any;
}
export const AddBookInput = ({ name, label, type, placeholder, errors, disabled, register }: PlainInputProps) => {
	const error = (errors && errors[name]?.message) || '';
	return (
		<div className='flex flex-col gap-y-0.5'>
			<p className='text-[#424242] text-sm'>{label}</p>
			<input
				type={type || 'text'}
				{...register(name)}
				placeholder={placeholder}
				disable={disabled}
				className='w-full px-2 py-1.5 rounded-xl'
			/>
			{errors && error && <p className='text-xs font-medium text-[#795c49] '>{error as any}</p>}
		</div>
	);
};
