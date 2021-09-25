import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'

import type { AppProps } from 'next/app'

import '../styles/globals.css'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <html lang='ja' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}

export default MyApp
