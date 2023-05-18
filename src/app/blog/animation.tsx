'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export function Animation({ children }: PropsWithChildren) {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col items-center p-4'
      >
        {children}
      </motion.main>
    </>
  );
}
