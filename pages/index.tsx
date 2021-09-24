import Head from 'next/head'
import AboutButton from '../components/button/about'
import BlogButton from '../components/button/blog'
import GithubButton from '../components/button/github'
import TopLogo from '../components/logo/topLogo'

export default function Home(): JSX.Element {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-yellow-250'>
      <Head>
        <title>ryone9re</title>
      </Head>
      <TopLogo />
      <div className='flex flex-wrap justify-center gap-2'>
        <AboutButton />
        <BlogButton />
        <GithubButton />
      </div>
    </div>
  )
}
