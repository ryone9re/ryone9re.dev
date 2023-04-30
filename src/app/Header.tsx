'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <>
      <header className='navbar bg-base-100'>
        <div className='dropdown lg:hidden'>
          <label tabIndex={0} className='btn btn-square btn-ghost'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              className='inline-block w-5 h-5 stroke-current'
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
            className='dropdown-content menu mt-3 p-2 shadow-lg bg-base-300 rounded-md w-52'
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
          <Link href='/' className='btn btn-ghost normal-case text-xl'>
            ryone9re
          </Link>
        </div>
        <div className='flex-none hidden lg:flex'>
          <Link href='/' className='btn btn-ghost normal-case text-md'>
            Home
          </Link>
          <Link href='/about' className='btn btn-ghost normal-case text-md'>
            About
          </Link>
          <Link href='/blog' className='btn btn-ghost normal-case text-md'>
            Blog
          </Link>
          <Link href='/works' className='btn btn-ghost normal-case text-md'>
            Works
          </Link>
        </div>
      </header>
    </>
  );
}
