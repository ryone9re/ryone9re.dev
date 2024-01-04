'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { PropsWithChildren, Suspense } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/');
  }

  // TODO いい感じのおしゃれな円(3d)を回す
  if (status === 'loading') {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      <main className='p-4'>
        {/* TODO いい感じのおしゃれな円(3d)を回す */}
        <Suspense>{children}</Suspense>
      </main>
    </>
  );
}
