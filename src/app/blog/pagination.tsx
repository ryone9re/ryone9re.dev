'use client';

import { useSearchParams } from 'next/navigation';

type PaginationProps = {
  maxPage: number;
};

export function Pagination({ maxPage }: PaginationProps) {
  const searchParams = useSearchParams();

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
        {currentPage > 1 && <button className='btn'>«</button>}
        <button className='btn'>{`PAGE ${currentPage}`}</button>
        {currentPage < maxPage && <button className='btn'>»</button>}
      </div>
    </>
  );
}
