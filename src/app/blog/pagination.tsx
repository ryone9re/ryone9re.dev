'use client';

import { useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  hasNext: boolean;
};

export function Pagination({ hasNext }: PaginationProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get('p');

  let currentPage: number;

  if (!page || page === '') {
    currentPage = 1;
  } else {
    currentPage = parseInt(page);
  }

  return (
    <>
      <div className='btn-group'>
        {2 < currentPage ? (
          <button className='btn' onClick={() => router.push(`/blog?p=${currentPage - 1}`)}>
            «
          </button>
        ) : (
          1 < currentPage && (
            <button className='btn' onClick={() => router.push('/blog')}>
              «
            </button>
          )
        )}
        <button className='btn'>{`PAGE ${currentPage}`}</button>
        {hasNext && (
          <button className='btn' onClick={() => router.push(`/blog?p=${currentPage + 1}`)}>
            »
          </button>
        )}
      </div>
    </>
  );
}
