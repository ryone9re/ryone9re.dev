'use client';

import { BezierCurveExample } from '@/components/models/Mountain';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <BezierCurveExample />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className='p-4'
      >
        pages
      </motion.main>
    </>
  );
}
