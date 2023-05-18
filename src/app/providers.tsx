'use client';

import { AnimatePresence } from 'framer-motion';
import { SessionProvider } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <AnimatePresence>
        <SessionProvider>{children}</SessionProvider>
      </AnimatePresence>
    </>
  );
}
