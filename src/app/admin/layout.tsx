'use client';

import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <main className='p-4'>{children}</main>
    </>
  );
}
