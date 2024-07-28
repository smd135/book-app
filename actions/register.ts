'use server';
import { z } from 'zod';
import { RegisterSchema } from '../lib/schemas';
import { error } from 'console';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getUserByEmail } from '@/lib/utils';

export const registerUser = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields' };
	}
	const { username, email, password } = validatedFields.data;
	const hashedPassword = await bcrypt.hash(password, 12);
	try {
		const emailExists = await getUserByEmail(email);
		//
		if (emailExists) return { error: 'Email already in use' };
		await prisma.user.create({ data: { username, email, password: hashedPassword } });
		// TODO Send verification token email
		console.log('user created');
		return { message: 'User created' };
	} catch (error) {
		console.log(error);
	}
};
