'use client';

import { htmlToText } from '@/utils/htmlToText';
import { truncateText, unicodeSubstring } from '@/utils/strings';
import { motion, useAnimation, useInView } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type BlogCardProps = {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

function Card({ id, title, thumbnail, content, createdAt, updatedAt }: BlogCardProps) {
  const [summary, setSummary] = useState<string>('');

  useEffect(() => {
    const plainText = htmlToText(content);

    const truncatedText = truncateText(plainText);

    setSummary(truncatedText);
  }, [content]);

  return (
    <>
      <figure>
        <p className='text-9xl'>{unicodeSubstring(thumbnail)}</p>
      </figure>
      <div className='card-body'>
        <h2 className='whitespace-normal break-words text-xl font-bold'>{title}</h2>
        <p className='whitespace-normal break-words'>{summary}</p>
        <div className='card-actions justify-end'>
          <Link href={`/blog/${id}`}>
            <button className='btn-primary btn'>MORE</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export function BlogCard(props: BlogCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.5
        }
      });
    }
  }, [controls, inView]);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ y: 20, opacity: 0 }}
        animate={controls}
        exit={{ opacity: 0 }}
        className='card min-h-full bg-neutral px-2 py-4 shadow-xl'
      >
        <Card {...props} />
      </motion.div>
    </>
  );
}
