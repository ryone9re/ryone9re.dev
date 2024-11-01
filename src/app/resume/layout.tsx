'use client';

import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='p-4'
      >
        {children}
      </motion.main>
    </>
  );
}
