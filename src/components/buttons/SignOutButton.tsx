'use client';

import { signIn } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function SignOutButton({ children }: PropsWithChildren) {
  return (
    <>
      <button onClick={() => signIn('github', { callbackUrl: '/admin' })}>{children}</button>
    </>
  );
}
