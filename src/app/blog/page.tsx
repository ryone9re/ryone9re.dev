import { Animation } from '@/app/blog/animation';
import { Pagination } from '@/app/blog/pagination';
import { BlogCard } from '@/components/card/BlogCard';
import { getRequestOrigin } from '@/utils/getRequestOrigin';
import { redirect } from 'next/navigation';

async function getPosts(origin: string, page = '1') {
  const res = await fetch(`${origin}/api/posts?p=${page}`);

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

  if (!body) {
    redirect('/404');
  }

  return (
    <>
      <Animation>
        <div className='gap mb-4 grid w-5/6 grid-cols-1 gap-4 md:grid-cols-2'>
          {body.posts.map((post) => {
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
        <div className='my-4'>{body.posts.length > 0 && <Pagination hasNext={body.hasNext} />}</div>
      </Animation>
    </>
  );
}
