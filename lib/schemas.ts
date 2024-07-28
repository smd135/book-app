import { z } from 'zod';

export const LoginSchema = z.object({
	email: z.string().email({ message: 'Email is required' }),
	password: z.string(),
});

export const RegisterSchema = z.object({
	username: z.string().min(3),
	email: z.string().email({ message: 'Email is required' }),
	password: z.string().min(8, { message: 'Minimum 8 characters' }),
});

export const SetSchema = z.object({
	id: z.string(),
	weight: z.string(),
	new_weight: z.string(),
	reps: z.string(),
	new_reps: z.string(),
});
