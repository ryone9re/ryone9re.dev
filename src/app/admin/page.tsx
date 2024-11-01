import { Table } from '@/app/admin/table';
import { Pagination } from '@/components/navigation/pagination';
import { getRequestOrigin } from '@/utils/getRequestOrigin';
import Link from 'next/link';

async function getPosts(origin: string, page = '1') {
  const res = await fetch(`${origin}/api/admin/posts?p=${page}`);

  if (!res.ok) {
    return undefined;
  }

  const body = (await res.json()) as {
    posts: {
      id: string;
      title: string;
      thumbnail: string;
      content: string;
      visible: boolean;
      createdAt: string;
      updatedAt: string;
    }[];
    hasNext: boolean;
  };

  return body;
}

export default async function Page({ searchParams: { p } }: { searchParams: { p?: string } }) {
  const origin = getRequestOrigin();

  const body = await getPosts(origin, p);

  return (
    <>
      <div className='flex w-full flex-col items-center gap-4'>
        <div className='flex w-full flex-row justify-end'>
          <Link href='/admin/new' className='w-1/4'>
            <button className='btn-outline btn-primary btn w-full'>NEW</button>
          </Link>
        </div>

        {body && <Table posts={body.posts} />}

        {body && (
          <div className='my-4'>
            <Pagination hasNext={body.hasNext} />
          </div>
        )}
      </div>
    </>
  );
}
