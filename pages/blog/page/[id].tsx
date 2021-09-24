import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Pagination, PageRange } from '../../../components/page/pagenation'
import { Navigation } from '../../../components/page/navigation'
import { client } from '../../../libs/client'
import { SetTimeFormat } from '../../../libs/setTimeFormat'
import { CmsResponse, Article } from '../../../types/article'

const PER_PAGE = 5

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CmsResponse = await client.get({ endpoint: 'blog' })
  const paths: string[] = PageRange(1, Math.ceil(data.totalCount / PER_PAGE)).map(
    (repo) => `/blog/page/${repo}`
  )
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = Number(context.params.id)
  const data: CmsResponse = await client.get({ endpoint: `blog?offset=${(id - 1) * 5}&limit=5` })

  return {
    props: {
      contents: data.contents,
      totalCount: data.totalCount
    }
  }
}

export default function Blog({
  contents,
  totalCount
}: {
  contents: Article[]
  totalCount: number
}): JSX.Element {
  const { query } = useRouter()
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>ryone9re || blog</title>
      </Head>
      <Navigation />
      <div className='container w-full md:max-w-3xl mx-auto pt-10'>
        {contents.map(({ id, title, createdAt }) => (
          <Link key={id} href={`/blog/${id}`}>
            <a>
              <div className='flex w-64 sm:w-short md:w-short lg:w-medium xl:w-medium bg-white shadow-xl h-50 sm:h-40 mx-auto mt-5 mb-5 p-5 rounded'>
                <div className='relative flex w-full'>
                  <p className='flex static text-justify text-sm sm:text-base lg:text-xl my-auto p-3'>
                    {title}
                  </p>
                  <div className='absolute  bottom-0 right-0  inline-flex'>
                    <p className='flex static text-justify text-xs sm:text-xs lg:text-sm my-auto'>
                      {SetTimeFormat(createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
      <Pagination totalCount={totalCount} urlPath={query.id} />
    </div>
  )
}