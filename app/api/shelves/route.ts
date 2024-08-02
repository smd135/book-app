import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';

// Create new book shelf
export const POST = async (req: Request) => {
	const { name, imgUrl } = await req.json();
	// Cheack authorization
	const session = await auth();
	const user = session?.user;
	if (!user?.id) return new NextResponse('Unathorized', { status: 401 });
	try {
		const newShelf = await prisma.bookShelf.create({ data: { user_id: user.id, name: name, img_url: imgUrl } });
		return new NextResponse('Book shelf created');
	} catch (error) {
		console.log(error, '[shelf create error]');
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};

// Create get all book shelves
export const GET = async (req: Request) => {
	// Check authorization
	const session = await auth();
	const user = session?.user;
	if (!user?.id) return new NextResponse('Unathorized', { status: 401 });

	try {
		// const shelves = await prisma.bookShelf.findMany({ where: { user_id: user.id }, include: { books: { orderBy: { createdAt: 'desc' }, take: 1 } } });
		const shelves = await prisma.bookShelf.findMany({ where: { user_id: user.id }, include: { books: true } });
		return NextResponse.json(shelves);
	} catch (error) {
		console.log(error, '[shelf create error]');
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};
