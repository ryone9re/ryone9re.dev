import { getRequestOrigin } from '@/utils/getRequestOrigin';

async function getPost(origin: string, id: string) {
  const res = await fetch(`${origin}/api/posts/${id}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error(`Failed to fetch. status: ${res.statusText}`);
  }

  const body = res.json();

  return body;
}

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const origin = getRequestOrigin();

  const post = await getPost(origin, id);

  return <></>;
}
