import type { NextAuthConfig } from 'next-auth';
import { getUserByEmail } from './lib/utils';
// import GitHub from 'next-auth/providers/github';
// import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { LoginSchema } from './lib/schemas';
import bcrypt from 'bcryptjs';

export default {
	providers: [
		Credentials({
			authorize: async (credentials) => {
				const validatedFields = LoginSchema.safeParse(credentials);
				try {
					if (validatedFields.success) {
						const { email, password } = validatedFields.data;
						const user = await getUserByEmail(email);
						if (!user || !user.password) {
							return null;
						}

						const passwordMatch = await bcrypt.compare(password, user.password);
						if (passwordMatch) return user;
					}
				} catch (error) {
					console.log(error, 'authorize error');
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
