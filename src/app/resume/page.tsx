'use client';

import { motion } from 'framer-motion';

export default function Page() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='p-4'
      >
        resume
      </motion.main>
    </>
  );
}
