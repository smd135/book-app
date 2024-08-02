'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { GoFileMedia, GoX } from 'react-icons/go';
import { AddBookInput } from '@/components/shared/AddBookInput';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
	name: z.string().min(3, { message: 'Введіть будь ласка назву' }),
	imgUrl: z.string().optional(),
});
const CreateShelfPage = () => {
	const router = useRouter();

	const { register, handleSubmit, formState } = useForm<z.infer<typeof formSchema>>({
		defaultValues: { name: '', imgUrl: '' },
		resolver: zodResolver(formSchema),
	});
	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
			const shelf = await axios.post(`/api/shelves`, values);
			toast.success('Полиця створена');
			router.refresh();
			router.push('/dashboard?tab=shelves');
			console.log('submit');
		} catch (error) {
			toast.error('Щось пішло не так');
		}
	};
	return (
		<section className='px-6 py-4 h-full'>
			<div className='h-[calc(100%-3rem)] flex flex-col'>
				<div className='flex items-center gap-8'>
					<Link href='/'>
						<GoX size={24} className='' />
					</Link>
					<span className='text-lg'>Нова полиця</span>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col h-full justify-between gap-4'>
					<div className='flex flex-col gap-1 mt-4'>
						<AddBookInput label='Назва' register={register} name='name' placeholder='введіть назву полиці' errors={formState.errors} />
					</div>
					<div className='flex flex-col gap-2 mt-4'>
						<p className='text-[#424242] text-sm'>Обкладинка</p>
						<span className='flex items-center justify-center w-20 h-28 border border-dashed border-neutral-300'>
							<GoFileMedia className='text-neutral-400' />
						</span>
						<p className='text-sm text-amber-600 font-medium'>Редагувати</p>
					</div>

					<div className='flex items-center justify-center mt-auto'>
						<button type='submit' className='w-full text-lg uppercase text-white bg-black rounded-xl py-2 '>
							Зберегти
						</button>
					</div>
				</form>
			</div>
		</section>
	);
};
export default CreateShelfPage;
