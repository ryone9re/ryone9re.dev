import { animationControls } from 'framer-motion'
import Link from 'next/link'

export const Navigation = (): JSX.Element => {
  const controls = animationControls()
  controls.stop()
  return (
    <nav id='header' className='fixed w-full z-10 top-0 bg-white'>
      <div className='w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3'>
        <div className='pl-4'>
          <Link href='/'>
            <a className='text-gray-900 no-underline hover:no-underline font-extrabold text-xl'>
              ryone9re
            </a>
          </Link>
        </div>
        <div className='block lg:hidden pr-4'>
          <Link href='/'>
            <a>
              <button
                id='nav-toggle'
                className='flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none'
              >
                <svg
                  className='fill-current h-3 w-3'
                  viewBox='0 0 576 512'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <title>Home</title>
                  <path d='M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z' />
                </svg>
              </button>
            </a>
          </Link>
        </div>
        <div
          className='w-full flex-grow lg:flex lg:items-center lg:w-auto hidden mt-2 lg:mt-0 bg-gray-100 md:bg-transparent z-20'
          id='nav-content'
        >
          <ul className='list-reset lg:flex justify-end flex-1 items-center'>
            <li className='mr-3'>
              <Link href='/'>
                <a className='inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4'>
                  Home
                </a>
              </Link>
            </li>
            <li className='mr-3'>
              <Link href='/about'>
                <a className='inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4'>
                  About
                </a>
              </Link>
            </li>
            <li className='mr-3'>
              <Link href='/blog/page/1'>
                <a className='inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4'>
                  Blog
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
