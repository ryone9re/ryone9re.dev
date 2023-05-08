'use client';

import { SNSIcons } from '@/components/Icons';
import { Iam } from '@/components/models/Iam';
import { Mountains } from '@/components/models/Mountain';
import { Rain } from '@/components/models/Rain';
import { motion } from 'framer-motion';

export default function Page() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Mountains />
        <Rain />
      </motion.div>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 3 }}
        className='relative flex flex-grow flex-col items-center justify-center space-y-4'
      >
        <Iam />
        <SNSIcons />
      </motion.main>
    </>
  );
}
