import { motion } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'

import { HomeButton } from '../components/button/homeButton'
import profileIcon from '../public/icon.jpg'

export default function Home(): JSX.Element {
  return (
    <>
      <Head>
        <title>ryone9re || about</title>
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'backOut', duration: 0.3 }}
      >
        <div className='min-h-screen bg-gradient-to-b from-yellow-250 to-yellow-250 flex flex-col items-center justify-center'>
          <div className='w-4/5 md:w-auto bg-white p-4 rounded-md mb-4'>
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
      </motion.div>
    </>
  )
}
