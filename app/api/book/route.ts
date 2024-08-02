import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export const POST = async (req: Request) => {
	const session = await auth();
	const user = session?.user;
	try {
		if (!user?.id) return new NextResponse('Unathorized', { status: 401 });
		const { title, cover_url, author, page_count, description } = await req.json();
		const book = await prisma.book.create({
			data: { user_id: user?.id, title, cover_url, author, page_count, description },
		});
		return NextResponse.json(book);
	} catch (error) {
		console.log(error, '[book create error]');
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};
