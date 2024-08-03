import { PiUserLight } from 'react-icons/pi';
import { MdOutlineMenuBook } from 'react-icons/md';
import { User } from '@prisma/client';

export const UserProfile = ({ user }: { user: Pick<User, 'username' | 'email' | 'emailVerified' | 'image'> }) => {
	return (
		<div className='flex flex-col justify-center'>
			<div className='flex justify-between gap-2 p-2 rounded-xl border border-[#e7e7e734] shadow-sm'>
				<div className='flex flex-col justify-between text-left font-semibold'>
					<div>
						<h3 className='tracking-wide'>{user.username}</h3>
					</div>
					<div className=''>
						<p className='text-[rgb(185,119,44)] font-medium underline'>редагувати</p>
					</div>
				</div>
				<div className='flex flex-col justify-center items-center rounded-full w-20 h-20 bg-[#dbeafe]'>
					<PiUserLight size={24} strokeWidth={2} className='text-[rgb(214,178,60)]' />
					<MdOutlineMenuBook size={18} className='text-[rgba(185,119,44,0.53)] flex-shrink-0' />
				</div>
			</div>
		</div>
	);
};
