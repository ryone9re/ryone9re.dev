import Image from 'next/image'
import Head from 'next/head'
import HomeButton from '../components/button/homeButton'
import profileIcon from '../public/icon.jpg'

export default function Home(): JSX.Element {
  return (
    <div className='min-h-screen bg-gradient-to-b from-yellow-250 to-yellow-250 flex flex-col items-center justify-center'>
      <Head>
        <title>ryone9re || about</title>
      </Head>
      <div className='bg-white p-4 rounded-md mb-4'>
        <Image src={profileIcon} alt='profile' className='rounded-md' />
        <div className='mt-8 h-32 w-full space-y-3'>
          <p className='font-sans text-xs sm:text-sm md:text-lg lg:text-lg xl:text-lg'>
            こんにちは！ ryone9reと申す者です｡
            <br />
            大学では言語処理の研究をしていますが､元々は生物学出身です｡
            <br />
            web開発やインフラでなんとか生活を賄っています｡
            <br />
            この子はcuriosityくんです｡ かわいいですね〜
            <br />
          </p>
        </div>
      </div>
      <HomeButton />
    </div>
  )
}
