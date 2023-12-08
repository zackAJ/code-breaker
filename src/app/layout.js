import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'code breaker يس',
  description: 'تعليم الاطفال التشفير',
}

export default function RootLayout({ children }) {
  return (
		<html lang="ar">
			<body className={inter.className}>
				<Header />
        <main
          className="flex flex-col items-center justify-center gap-8 p-6 h-[calc(calc(100vh)-calc(85px))]">
					{children}
				</main>
			</body>
		</html>
	);
}
