import { motion } from 'framer-motion'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Navigation } from '../../components/page/navigation'
import { getAllPosts, getPostBySlug } from '../../libs/mdPosts'
import mdToHtml from '../../libs/mdToHtml'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts(['slug'])
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (
  { params }: any // eslint-disable-line
) => {
  const post = getPostBySlug(params.slug, ['slug', 'title', 'date', 'tags', 'content'])
  const content = await mdToHtml(post.content)

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  }
}

export default function Blog({ post }): JSX.Element {
  const router = useRouter()
  return (
    <>
      <Head>
        <title>ryone9re || blog</title>
      </Head>
      <Navigation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'backOut', duration: 0.3 }}
      >
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
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
                  {post.title}
                </h1>
                <p className='text-sm md:text-base font-normal text-gray-600'>{post.date}</p>
              </div>
              <div className='markdown'>
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
