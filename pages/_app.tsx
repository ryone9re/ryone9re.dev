import { AnimatePresence } from 'framer-motion'

import type { AppProps } from 'next/app'

import '../styles/globals.css'

function MyApp({ Component, pageProps, router }: AppProps): JSX.Element {
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}

export default MyApp
