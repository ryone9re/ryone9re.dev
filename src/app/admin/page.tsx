import { Pagination } from '@/components/navigation/pagination';
import { getRequestOrigin } from '@/utils/getRequestOrigin';

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
      {body && (
        <div className='w-full overflow-x-auto'>
          <table className='table w-full'>
            <thead>
              <tr>
                <th>THUMBNAIL</th>
                <th>TITLE</th>
                <th>CREATED-AT</th>
                <th>UPDATED-AT</th>
              </tr>
            </thead>
            <tbody>
              {body.posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <div className='flex items-center space-x-3'>
                      <div className='avatar'>
                        <div className='mask mask-squircle h-12 w-12'>{post.thumbnail}</div>
                      </div>
                      <div>
                        <div className='font-bold'>{post.title}</div>
                      </div>
                    </div>
                  </td>
                  <td>{post.createdAt}</td>
                  <td>{post.updatedAt}</td>
                  <th>
                    <button className='btn-ghost btn-xs btn'>Edit</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='my-4'>
            {body.posts.length > 0 && <Pagination hasNext={body.hasNext} />}
          </div>
        </div>
      )}
    </>
  );
}
