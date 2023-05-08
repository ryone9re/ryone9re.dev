'use client';

import { Mountains } from '@/components/models/Mountain';
import { Sun } from '@/components/models/Sun';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <Sun />
      </motion.div>
      <Mountains />
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
