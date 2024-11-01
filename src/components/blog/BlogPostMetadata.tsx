'use client';

import { htmlToText } from '@/utils/htmlToText';
import { useEffect, useState } from 'react';

type BlogPostContentProps = {
  createdAt: string;
  updatedAt: string;
  content: string;
};

export function BlogPostMetadata({ createdAt, updatedAt, content }: BlogPostContentProps) {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    setWordCount(htmlToText(content).length);
  }, [content]);

  const createdAtDate = new Date(createdAt).toLocaleDateString('ja-JP');
  const updatedAtDate = new Date(updatedAt).toLocaleDateString('ja-JP');

  return (
    <>
      <div className='card w-full bg-neutral'>
        <div className='card-body'>
          <p>公開: {createdAtDate}</p>
          <hr className='solid border-neutral-content' />
          <p>更新: {updatedAtDate}</p>
          <hr className='solid border-neutral-content' />
          <p>文量: 約{wordCount}字</p>
        </div>
      </div>
    </>
  );
}
