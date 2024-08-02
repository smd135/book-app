import { auth } from '@/auth';
import prisma from '@/prisma/prisma';
import { NextResponse } from 'next/server';

// ::POST Add books to existing shelf
export const POST = async (req: Request, { params }: { params: { shelfId: string } }) => {
	const session = await auth();
	const user = session?.user;
	if (!user?.id) return new NextResponse('Unathorized', { status: 401 });
	const books = await req.json();

	const ids = books?.map((item: string) => ({ id: item }));
	console.log(ids, 'kds');
	try {
		const ifExists = await prisma.bookShelf.findUnique({ where: { user_id: user.id, id: params.shelfId } });
		if (!ifExists) return new NextResponse('Book shelf not found', { status: 404 });

		const shelf = await prisma.bookShelf.update({
			where: { user_id: user?.id, id: params.shelfId },
			data: {
				books: {
					connect: books.map((item: string) => ({ id: item })),
				},
			},
		});
		return new NextResponse('Added books to the shelf');
	} catch (error) {
		console.log(error, '[shelf delete error]');
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};

// ::DELETE Delete shelf
export const DELETE = async (req: Request, { params }: { params: { shelfId: string } }) => {
	const session = await auth();
	const user = session?.user;
	if (!user?.id) return new NextResponse('Unathorized', { status: 401 });

	try {
		const ifExists = await prisma.bookShelf.findUnique({ where: { user_id: user.id, id: params.shelfId } });
		if (!ifExists) return new NextResponse('Book shelf not found', { status: 404 });

		const shelf = await prisma.bookShelf.delete({ where: { user_id: user.id, id: params.shelfId } });
		return new NextResponse('Book shelf deleted');
	} catch (error) {
		console.log(error, '[shelf delete error]');
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};
