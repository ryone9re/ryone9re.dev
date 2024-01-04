'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function AuthButton({ children }: PropsWithChildren) {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <button onClick={() => signOut({ callbackUrl: '/' })}>{children}</button>
      </>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <button onClick={() => signIn('github', { callbackUrl: '/admin' })}>{children}</button>
      </>
    );
  }

  return <>{children}</>;
}
