import { motion } from 'framer-motion'
import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Navigation } from '../../../components/page/navigation'
import { Pagination, PageRange } from '../../../components/page/pagenation'
import { getAllPosts } from '../../../libs/mdPosts'

const PER_PAGE = 5

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = getAllPosts(['slug'])
  const paths: string[] = PageRange(1, Math.ceil(allPosts.length / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  )
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = getAllPosts(['slug', 'title', 'date', 'tags'])

  return {
    props: { allPosts }
  }
}

export default function Blog({ allPosts }): JSX.Element {
  const router = useRouter()
  const queryId = typeof router.query.id === 'string' ? Number(router.query.id) : 1
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
          <div className='container w-full md:max-w-3xl mx-auto pt-10'>
            {allPosts.slice(5 * (queryId - 1), 5 * (queryId - 1) + 5).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <a>
                  <div className='flex w-64 sm:w-short md:w-short lg:w-medium xl:w-medium bg-white shadow-xl h-50 sm:h-40 mx-auto mt-5 mb-5 p-5 rounded'>
                    <div className='relative flex w-full'>
                      <p className='flex static text-justify text-sm sm:text-base lg:text-xl my-auto p-3'>
                        {post.title}
                      </p>
                      <div className='absolute  bottom-0 right-0  inline-flex'>
                        <p className='flex static text-justify text-xs sm:text-xs lg:text-sm my-auto'>
                          {post.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          </div>
          <Pagination totalCount={allPosts.length} path={queryId} />
        </div>
      </motion.div>
    </>
  )
}
