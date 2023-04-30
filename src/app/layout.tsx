import Footer from '@/app/Footer';
import Header from '@/app/Header';
import '@/app/globals.css';
import { type ReactNode } from 'react';

export const metadata = {
  title: 'ryone9re',
  description: 'ryone9reのサイト'
};

type RootProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootProps) {
  return (
    <html lang='ja' data-theme='dracula'>
      <body>
        <div className='flex min-h-screen flex-col items-center justify-between'>
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
