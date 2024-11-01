'use client';

import { postSchema } from '@/app/admin/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { Editor } from '@tinymce/tinymce-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

export default function Page() {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<z.infer<typeof postSchema>>({
    resolver: zodResolver(postSchema)
  });

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
      <div className='flex w-full flex-col items-center'>
        <form
          className='flex w-full flex-col items-center gap-4 md:w-4/5'
          onSubmit={handleSubmit(async (h) => {
            const res = await fetch('/api/admin/posts', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(h)
            });

            if (!res.ok) {
              setShowToast(true);
              return;
            }

            router.push('/admin');
          })}
        >
          <div className='grid w-full grid-cols-4 grid-rows-1 gap-4'>
            <div className='col-span-3 flex w-full flex-col gap-2'>
              <input
                {...register('title')}
                placeholder='Title'
                className='input-bordered input w-full'
              />
              {errors.title && (
                <span className='whitespace-normal break-words text-error'>
                  {errors.title.message}
                </span>
              )}
            </div>

            <div className='flex w-full flex-col gap-2'>
              <input
                {...register('thumbnail')}
                placeholder='Thumbnail'
                className='input-bordered input w-full'
              />
              {errors.thumbnail && (
                <span className='whitespace-normal break-words text-error'>
                  {errors.thumbnail.message}
                </span>
              )}
            </div>
          </div>

          <div className='col-span-3 flex w-full flex-col gap-2'>
            <Controller
              name='content'
              control={control}
              render={({ field: { onChange } }) => (
                <Editor
                  apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
                  id='tiny-mce'
                  onEditorChange={onChange}
                  init={{
                    plugins: [
                      'preview',
                      'importcss',
                      'searchreplace',
                      'autolink',
                      'autosave',
                      'save',
                      'directionality',
                      'code',
                      'visualblocks',
                      'visualchars',
                      'fullscreen',
                      'image',
                      'link',
                      'media',
                      'codesample',
                      'table',
                      'charmap',
                      'pagebreak',
                      'nonbreaking',
                      'anchor',
                      'insertdatetime',
                      'advlist',
                      'lists',
                      'wordcount',
                      'help',
                      'charmap',
                      'quickbars',
                      'emoticons',
                      'autoresize'
                    ],
                    menubar: 'file edit view insert format tools table help',
                    toolbar:
                      'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save | insertfile image media link anchor codesample | emoticons',
                    toolbar_sticky: true,
                    autosave_ask_before_unload: true,
                    autosave_interval: '30s',
                    autosave_prefix: '{path}{query}-{id}-',
                    autosave_restore_when_empty: false,
                    autosave_retention: '2m',
                    autoresize_bottom_margin: 10,
                    image_advtab: true,
                    importcss_append: true,
                    image_caption: true,
                    quickbars_selection_toolbar:
                      'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
                    toolbar_mode: 'sliding',
                    contextmenu: 'link image table',
                    skin: 'oxide-dark',
                    content_css: 'dark',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    width: '100%'
                  }}
                />
              )}
            />
            {errors.content && (
              <span className='whitespace-normal break-words text-error'>
                {errors.content.message}
              </span>
            )}
          </div>

          <div className='form-control'>
            <label className='gap label cursor-pointer gap-2'>
              <input
                {...register('visible')}
                type='checkbox'
                defaultChecked
                className='checkbox-accent checkbox'
              />
              <span className='label-text'>Publish</span>
            </label>
          </div>

          <button className='btn-secondary btn-wide btn' type='submit'>
            POST
          </button>
        </form>
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
