'use client';

import { PropsWithChildren, Suspense } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {/* TODO いい感じのおしゃれな円(3d)を回す */}
      <Suspense>{children}</Suspense>
    </>
  );
}
