import { getRequestOrigin } from '@/utils/getRequestOrigin';
import { PageContent } from './pageContent';

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
      <PageContent
        title={post.title}
        thumbnail={post.thumbnail}
        content={post.content}
        visible={post.visible}
        id={post.id}
      />
    </>
  );
}
