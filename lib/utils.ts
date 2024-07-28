import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { auth } from '@/auth';
import { prisma } from './prisma';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getUserByEmail = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });
		return user;
	} catch (error) {
		return null;
	}
};

export const userExists = async (id: string) => {
	try {
		const userById = await prisma.user.findUnique({ where: { id } });
		return userById;
	} catch (error) {
		return null;
	}
};
