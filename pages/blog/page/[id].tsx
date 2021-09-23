import Head from 'next/head'
import { useRouter } from 'next/router'
import { GetStaticProps, GetStaticPaths } from 'next'
import { client } from '../../../libs/client'
import { Pagination, PageRange } from '../../../components/page/pagenation'
import { CmsResponse, Article } from '../../../types/article'
import { setTimeFormat } from '../../../libs/setTimeFormat'

const PER_PAGE = 5

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CmsResponse = await client.get({ endpoint: 'blog' })
  const paths = PageRange(1, Math.ceil(data.totalCount / PER_PAGE)).map(
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
      <ul>
        {contents.map(({ id, title, createdAt }) => (
          <li key={id}>
            <div className=' flex w-64 sm:w-short md:w-short lg:w-medium xl:w-medium bg-white shadow-2xl h-50 sm:h-40 mx-auto mt-5 mb-16 p-5'>
              <div className='relative flex w-full'>
                <p className='flex static text-justify text-sm sm:text-base lg:text-xl my-auto p-3'>
                  {title}
                </p>
                <div className='absolute  bottom-0 right-0  inline-flex'>
                  <p className='flex static text-justify text-xs sm:text-xs lg:text-sm my-auto'>
                    {setTimeFormat(createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <Pagination totalCount={totalCount} urlPath={query.id} />
    </div>
  )
}
