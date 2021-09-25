import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Navigation } from '../../components/page/navigation'
import { client } from '../../libs/client'
import { SetTimeFormat } from '../../libs/setTimeFormat'
import { Article, CmsIdResponse } from '../../types/article'

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CmsIdResponse = await client.get({ endpoint: `blog?limit=10000&fields=id` })
  const paths: string[] = data.contents.map((content) => `/blog/${content.id}`)
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = String(context.params.id)
  const data: Article = await client.get({ endpoint: `blog`, contentId: id })
  return {
    props: {
      blog: data
    }
  }
}

export default function Blog({ blog }: { blog: Article }): JSX.Element {
  const router = useRouter()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>ryone9re || blog</title>
      </Head>
      <Navigation />
      <div className='container w-full md:max-w-3xl mx-auto pt-20'>
        <div
          className='w-full px-4 md:px-6 text-xl text-gray-800 leading-normal'
          style={{ fontFamily: 'Georgia,serif' }}
        >
          <div className='font-sans'>
            <p className='text-base md:text-sm text-green-500 font-bold'>
              &lt;{' '}
              <button
                className='text-base md:text-sm text-green-500 font-bold no-underline hover:underline'
                onClick={(): void => router.back()}
              >
                BACK TO BLOG
              </button>
            </p>
            <h1 className='font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl'>
              {blog.title}
            </h1>
            <p className='text-sm md:text-base font-normal text-gray-600'>
              {SetTimeFormat(blog.publishedAt)}
            </p>
          </div>
          <p className='py-6' dangerouslySetInnerHTML={{ __html: blog.content }} />
        </div>
      </div>
    </div>
  )
}
