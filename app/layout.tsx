import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { BottomNavbar } from '@/components/shared/BottomNavbar';
import { AddBookDrawer } from '@/components/AddBookDrawer';
import { BlurOverlay } from '@/components/BlurOverlay';
import { FcCheckmark } from 'react-icons/fc';

const nutito = Nunito({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '600', '700'] });

export const metadata: Metadata = {
	title: 'Book App',
	description: 'Book App',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${nutito.className} flex flex-col mx-auto overflow-x-hidden`}>
				<BlurOverlay>{children}</BlurOverlay>
				<Toaster
					position='top-center'
					toastOptions={{
						duration: 2500,
						success: {
							style: { background: '#5eead4', textAlign: 'center', fontWeight: 500 },
							icon: <FcCheckmark />,
						},
					}}
					containerStyle={{ position: 'absolute', top: '10%', padding: '1rem' }}
				/>
				<BottomNavbar />
				<AddBookDrawer />
			</body>
		</html>
	);
}
