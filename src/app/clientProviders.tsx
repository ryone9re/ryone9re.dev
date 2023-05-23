'use client';

import { AnimatePresence } from 'framer-motion';
import { PropsWithChildren } from 'react';

export function ClientProviders({ children }: PropsWithChildren) {
  return (
    <>
      <AnimatePresence>{children}</AnimatePresence>
    </>
  );
}
