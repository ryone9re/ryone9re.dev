'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Table({
  posts
}: {
  posts: {
    id: string;
    title: string;
    thumbnail: string;
    content: string;
    visible: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
}) {
  const [deletionTarget, setDeletionTarget] = useState<string | null>(null);

  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (showToast) {
      setTimeout(() => {
        setShowToast(false);
      }, 3500);
    }
  }, [showToast]);

  return (
    <>
      <div className='w-full overflow-x-auto'>
        <table className='table w-full'>
          <thead>
            <tr>
              <th>TITLE</th>
              <th>THUMBNAIL</th>
              <th>CREATED-AT</th>
              <th>UPDATED-AT</th>
              <th>EDIT</th>
              <th>DELETE</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, i) => (
              <tr key={post.id}>
                <th>{post.title}</th>
                <td>{post.thumbnail}</td>
                <td>{new Date(post.createdAt).toLocaleString('ja-JP')}</td>
                <td>{new Date(post.updatedAt).toLocaleString('ja-JP')}</td>
                <td>
                  <Link href={`/admin/edit/${post.id}`}>
                    <button className='btn-ghost btn-xs btn'>Edit</button>
                  </Link>
                </td>
                <td>
                  <label
                    htmlFor='my-modal'
                    className='btn-ghost btn-xs btn'
                    onClick={() => setDeletionTarget(post.id)}
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <input type='checkbox' id='my-modal' className='modal-toggle' />
      <div className='modal'>
        <div className='modal-box'>
          <label
            htmlFor='my-modal'
            className='btn-sm btn-circle btn absolute right-2 top-2'
            onClick={() => setDeletionTarget(null)}
          >
            ✕
          </label>
          <h3 className='text-lg font-bold'>本当に削除しますか?</h3>
          <div className='modal-action'>
            <label
              htmlFor='my-modal'
              className='btn'
              onClick={async () => {
                const res = await fetch(`/api/admin/posts/${deletionTarget}`, {
                  method: 'DELETE'
                });

                if (!res.ok) {
                  setShowToast(true);
                  return;
                }

                setDeletionTarget(null);

                location.reload();
              }}
            >
              Yes
            </label>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='toast z-50'
          >
            <div className='alert alert-error'>
              <div>
                <span>送信に失敗しました｡</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
