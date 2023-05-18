import { Animation } from '@/app/blog/animation';
import { BlogPostContent } from '@/components/blog/BlogPostContent';
import { BlogPostMetadata } from '@/components/blog/BlogPostMetadata';
import { BlogPostTitle } from '@/components/blog/BlogPostTitle';
import { BackButton } from '@/components/buttons/BackButton';
import { getRequestOrigin } from '@/utils/getRequestOrigin';

async function getPost(origin: string, id: string) {
  const res = await fetch(`${origin}/api/posts/${id}`);

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
  };

  return body;
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const origin = getRequestOrigin();

  const post = await getPost(origin, id);

  return (
    <>
      <Animation>
        <BlogPostTitle thumbnail={post.thumbnail} title={post.title} />
        <div className='gap mb-4 flex w-11/12 flex-col-reverse gap-6 md:grid md:grid-cols-3'>
          <div className='min-h-full w-full md:col-span-2'>
            <BlogPostContent content={post.content} updatedAt={post.updatedAt} />
          </div>
          <div className='min-h-full w-full md:col-span-1'>
            <BlogPostMetadata
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
              content={post.content}
            />
          </div>
        </div>
        <div className='my-4'>
          <BackButton />
        </div>
      </Animation>
    </>
  );
}
