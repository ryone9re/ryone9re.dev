import { BlogCard } from '@/components/card/BlogCard';
import { getRequestOrigin } from '@/utils/getRequestOrigin';
import { Pagination } from './pagination';

async function getPosts(origin: string) {
  const res = await fetch(`${origin}/api/posts`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to fetch. status: ${res.statusText}`);
  }

  const body = (await res.json()) as {
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    visible: boolean;
    createdAt: string;
    updatedAt: string;
  }[];

  return body;
}

export default async function Page() {
  const origin = getRequestOrigin();

  const posts = await getPosts(origin);

  return (
    <>
      <div className='gap mb-4 grid w-5/6 grid-cols-1 gap-4 md:grid-cols-2'>
        {posts.map((post) => {
          return (
            <BlogCard
              key={post.id}
              id={post.id}
              title={post.title}
              thumbnail={post.thumbnail}
              content={post.content}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          );
        })}
      </div>
      {posts.length > 0 && <Pagination maxPage={1} />}
    </>
  );
}
