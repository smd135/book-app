import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async (req: Request, { params }: { params: { bookId: string } }) => {
	const session = await auth();
	const user = session?.user;
	try {
		if (!user?.id) return new NextResponse('Unathorized', { status: 401 });

		const books = await prisma.book.findUnique({ where: { id: params.bookId } });
		return NextResponse.json(books);
	} catch (error) {
		console.log(error, '[single book fetch error]');
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};

export const PATCH = async (req: Request, { params }: { params: { bookId: string } }) => {
	const session = await auth();
	const user = session?.user;
	const values = await req.json();
	try {
		if (!user?.id) return new NextResponse('Unathorized', { status: 401 });

		const ifExists = await prisma.book.findUnique({ where: { id: params.bookId } });
		if (!ifExists) return new NextResponse('Book not found');

		const book = await prisma.book.update({ where: { id: params.bookId }, data: { ...values } });

		return NextResponse.json('Book edited successfully');
	} catch (error) {
		console.log(error, '[book edit error]');
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};
export const DELETE = async (req: Request, { params }: { params: { bookId: string } }) => {
	const session = await auth();
	const user = session?.user;
	try {
		if (!user?.id) return new NextResponse('Unathorized', { status: 401 });
		const deleteBook = await prisma.book.delete({ where: { user_id: session?.user?.id, id: params.bookId } });

		return NextResponse.json('Book deleted');
	} catch (error) {
		console.log(error, '[single book delete error]');
		return new NextResponse('Internal Server Error', { status: 500 });
	}
};
