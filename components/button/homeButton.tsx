import Link from 'next/link'

export default function HomeButton(): JSX.Element {
  return (
    <Link href='/'>
      <a className='bg-gray-370 hover:bg-gray-700 p-1 flex items-center justify-center rounded-full h-8 sm:h-12 md:h-12 lg:h-16 xl:h-16 w-8 sm:w-12 md:w-12 lg:w-16 xl:w-16'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-3/4 w-3/4'
          viewBox='0 0 576 512'
          fill='#557C7E'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z'
          />
        </svg>
      </a>
    </Link>
  )
}
