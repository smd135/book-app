import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { prisma } from './lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const {
	auth,
	handlers: { GET, POST },
	signIn,
	signOut,
} = NextAuth({
	adapter: PrismaAdapter(prisma),
	session: { strategy: 'jwt' },
	callbacks: {
		session: async ({ session, token, user }) => {
			if (session?.user) {
				session.user.id = token.sub || '';
			}
			return session;
		},
		jwt: async ({ session, user, token }) => {
			if (user) {
				token.id = user.id;
				token.name = user.name;
			}
			return token;
		},
	},
	...authConfig,
});
