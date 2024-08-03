import { auth } from '@/auth';
import { UserProfile } from './_components/UserProfile';
import { prisma } from '@/lib/prisma';
import { LuSettings } from 'react-icons/lu';

const MorePage = async () => {
	const session = await auth();
	const user = await prisma.user.findUnique({ where: { id: session?.user?.id }, select: { username: true, email: true, emailVerified: true, image: true } });
	const booksCount = await prisma.book.count({ where: { user_id: session?.user?.id } });
	const recentBooks = await prisma.book.findMany({ where: { id: session?.user?.id }, orderBy: { createdAt: 'desc' } });
	return (
		<div className='px-4 py-2'>
			<div className='flex items-center justify-between mb-2'>
				<h1 className='text-center font-semibold text-neutral-700 mb-3'>Профіль</h1>
				<LuSettings size={20} />
			</div>
			<div className='flex items-center justify-end'></div>
			<div className='flex flex-col gap-4'>
				<UserProfile user={user!} />
			</div>
			<div className='mt-4 w-full flex flex-col p-2 rounded-xl border-2 border-[#e7e7e734] shadow-sm'>
				<span className='text-4xl font-bold py-4 text-center leading-8 w-full'>{booksCount}</span>
				<p className='text-center text-neutral-700 tracking-tight'>всього книжок</p>
			</div>
			{/* Cards with achievements */}
			{/* Recently books */}

			<div className='mt-4 w-full flex justify-between items-center p-2 rounded-xl border-2 border-[#e7e7e734] shadow-sm [&_p]:text-sm [&_p]:text-neutral-700 [&_p]:tracking-tight'>
				<div className='text-center flex flex-col bg-blue-100 py-1 px-3 rounded-xl'>
					<div className='text-2xl font-semibold py-4 leading-8'>0</div>
					<p className=''>завершено</p>
				</div>
				<div className='text-center flex flex-col  py-1 px-3 bg-[#f8d9f1] rounded-xl'>
					<div className='text-2xl font-semibold py-4 leading-8'>{booksCount}</div>
					<p className=''>всього книжок</p>
				</div>
				<div className='text-center flex flex-col  py-1 px-3 bg-[#f8d9b4] rounded-xl'>
					<div className='text-2xl font-semibold py-4 leading-8 w-full'>{booksCount}</div>
					<p className=''>ціль</p>
				</div>
			</div>
		</div>
	);
};
export default MorePage;
