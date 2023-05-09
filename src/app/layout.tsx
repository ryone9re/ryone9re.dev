import Footer from '@/app/Footer';
import Header from '@/app/Header';
import '@/app/globals.css';
import { PropsWithChildren } from 'react';
import { Providers } from './providers';

export const metadata = {
  title: 'ryone9re',
  description: 'ryone9reのサイト'
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang='ja' data-theme='dracula'>
      <body>
        <Providers>
          <div className='flex min-h-screen flex-col items-center'>
            <Header />
            <div className='flex flex-grow flex-col'>{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
