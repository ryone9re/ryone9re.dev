'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className='navbar bg-base-100'>
        <div className='dropdown lg:hidden'>
          <label tabIndex={0} className='btn-ghost btn-square btn'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block h-5 w-5 stroke-current'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className='dropdown-content menu mt-3 w-52 rounded-md bg-base-300 p-2 shadow-lg'
          >
            <li>
              <Link href='/'>Home</Link>
            </li>
            <li>
              <Link href='/about'>About</Link>
            </li>
            <li>
              <Link href='/blog'>Blog</Link>
            </li>
            <li>
              <Link href='/works'>Works</Link>
            </li>
          </ul>
        </div>
        <div className='flex-1'>
          <Link href='/' className='btn-ghost btn text-xl normal-case'>
            ryone9re
          </Link>
        </div>
        <div className='hidden flex-none lg:flex'>
          <Link href='/' className='text-md btn-ghost btn normal-case'>
            Home
          </Link>
          <Link href='/about' className='text-md btn-ghost btn normal-case'>
            About
          </Link>
          <Link href='/blog' className='text-md btn-ghost btn normal-case'>
            Blog
          </Link>
          <Link href='/works' className='text-md btn-ghost btn normal-case'>
            Works
          </Link>
        </div>
      </header>
    </>
  );
}
