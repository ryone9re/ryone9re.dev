import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { client } from '../../libs/client'
import { Article, CmsResponse } from '../../types/article'

export const getStaticPaths: GetStaticPaths = async () => {
  const data: CmsResponse = await client.get({ endpoint: 'blog' })
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
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <Head>
        <title>ryone9re || blog</title>
      </Head>
      <h1>{blog.title}</h1>
    </div>
  )
}
