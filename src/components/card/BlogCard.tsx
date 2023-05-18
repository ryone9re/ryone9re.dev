'use client';

import { htmlToText } from '@/utils/htmlToText';
import { truncateText, unicodeSubstring } from '@/utils/strings';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

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
        <h2 className='card-title'>{title}</h2>
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
  return (
    <>
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className='card min-h-full bg-neutral px-2 py-4 shadow-xl'
      >
        <Card {...props} />
      </motion.div>
    </>
  );
}
