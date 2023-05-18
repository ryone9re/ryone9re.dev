import Footer from '@/app/footer';
import '@/app/globals.css';
import Header from '@/app/header';
import { Providers } from '@/app/providers';
import { PropsWithChildren } from 'react';

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
            <div className='flex w-full flex-grow flex-col'>{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
