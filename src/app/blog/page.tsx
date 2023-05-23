import { Animation } from '@/app/blog/animation';
import { BlogCard } from '@/components/card/BlogCard';
import { Pagination } from '@/components/navigation/pagination';
import { getRequestOrigin } from '@/utils/getRequestOrigin';
import { Metadata } from 'next';
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

type MetadataProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ searchParams }: MetadataProps): Promise<Metadata> {
  const page = searchParams.p;

  if (typeof page !== 'string' || page === '1') {
    return {
      title: `Blog | ryone9re`,
      description: `ryone9reのブログ`,
      keywords: ['ryone9re', 'ryone9reのサイト']
    };
  }

  return {
    title: `p.${page} | Blog | ryone9re`,
    description: `ryone9reのブログ`,
    keywords: ['ryone9re', 'ryone9reのサイト']
  };
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
