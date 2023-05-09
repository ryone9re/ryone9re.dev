'use client';

import { AnimatePresence } from 'framer-motion';
import { PropsWithChildren } from 'react';

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <AnimatePresence>{children}</AnimatePresence>
    </>
  );
}
