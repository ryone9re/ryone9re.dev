import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Head from 'next/head'
import Image from 'next/image'

import { HomeButton } from '../components/button/homeButton'
import { Thing } from '../components/three/wireframe'
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
        <Canvas className='absolute w-full h-screen flex flex-col items-center justify-center bg-yellow-250'>
          <Thing />
        </Canvas>
        <div className='min-h-screen flex flex-col items-center justify-center'>
          <div className='absolute w-4/5 md:w-auto bg-white p-4 rounded-md mb-4'>
            <div className='flex justify-center'>
              <Image src={profileIcon} alt='profile' className='rounded-md' />
            </div>
            <div className='mt-8 h-32 w-full space-y-3'>
              <p className='font-sans text-xs sm:text-sm md:text-lg lg:text-lg xl:text-lg'>
                こんにちは！ ryone9reと申す者です｡
                <br />
                大学ではコンピュータサイエンスを学んでいますが､高専では生物学系学んでました｡
                <br />
                web開発やインフラでなんとか生活を賄っています｡
                <br />
                この子はcuriosityくんです｡ かわいいですね〜
                <br />
              </p>
            </div>
            <div className='flex justify-center'>
              <HomeButton />
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
