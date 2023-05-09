'use client';

import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();

  return (
    <>
      <button className='btn-primary btn-wide btn' onClick={() => router.back()}>
        戻る
      </button>
    </>
  );
}
