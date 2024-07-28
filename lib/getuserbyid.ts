import { auth } from '@/auth';

export const getUserById = async () => {
	const session = await auth();
	const userId = session?.user?.id;
	if (!userId) {
		throw new Error('You must be signed in');
	}
	return userId;
};
