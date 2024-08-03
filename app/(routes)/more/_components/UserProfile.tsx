import { PiUserLight } from 'react-icons/pi';
import { MdOutlineMenuBook } from 'react-icons/md';
import { User } from '@prisma/client';

export const UserProfile = ({ user }: { user: Pick<User, 'username' | 'email' | 'emailVerified' | 'image'> }) => {
	return (
		<div className='flex flex-col justify-center'>
			<div className='flex justify-between gap-2 p-2 rounded-xl border-2 border-[#e7e7e734] shadow-sm'>
				<div className='text-center font-semibold'>
					<h3>{user.username}</h3>
				</div>
				<div className='flex flex-col justify-center items-center rounded-full w-20 h-20 bg-neutral-200'>
					<PiUserLight size={24} strokeWidth={2} className='text-neutral-500' />
					<MdOutlineMenuBook size={18} className='text-slate-400/80 flex-shrink-0' />
				</div>
			</div>
		</div>
	);
};
