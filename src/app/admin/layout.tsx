'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  const { status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/');
  }

  if (status === 'loading') {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  }

  return <>{children}</>;
}
