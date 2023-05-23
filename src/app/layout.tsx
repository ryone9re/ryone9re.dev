import { ClientProviders } from '@/app/clientProviders';
import Footer from '@/app/footer';
import '@/app/globals.css';
import Header from '@/app/header';
import { ServerProviders } from '@/app/serverProviders';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: 'ryone9re',
  description: 'ryone9reのサイト',
  keywords: ['ryone9re', 'ryone9reのサイト']
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <ServerProviders>
        <ClientProviders>
          <html lang='ja' data-theme='dracula'>
            <body>
              <div className='flex min-h-screen flex-col items-center'>
                <Header />
                <div className='flex w-full flex-grow flex-col'>{children}</div>
                <Footer />
              </div>
            </body>
          </html>
        </ClientProviders>
      </ServerProviders>
    </>
  );
}
