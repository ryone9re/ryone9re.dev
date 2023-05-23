'use client';

import { Variants, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 }
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef<HTMLLabelElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, dropdownRef, buttonRef]);

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className='navbar sticky top-0 z-10 bg-base-100 bg-opacity-80 backdrop-blur-md'>
        <motion.nav
          className='dropdown lg:hidden'
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
        >
          <label
            tabIndex={0}
            ref={buttonRef}
            className='btn-ghost btn-square btn'
            onClick={() => setIsOpen(!isOpen)}
          >
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
          <motion.ul
            tabIndex={0}
            ref={dropdownRef}
            className='dropdown-content menu mt-3 w-52 rounded-md bg-base-300 p-2 shadow-lg'
            variants={{
              open: {
                clipPath: 'inset(0% 0% 0% 0% round 10px)',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.7,
                  delayChildren: 0.3,
                  staggerChildren: 0.05
                }
              },
              closed: {
                clipPath: 'inset(10% 50% 90% 50% round 10px)',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.3
                }
              }
            }}
          >
            <motion.li variants={itemVariants}>
              <Link href='/'>Home</Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link href='/about'>About</Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link href='/blog'>Blog</Link>
            </motion.li>
            <motion.li variants={itemVariants}>
              <Link href='/resume'>Resume</Link>
            </motion.li>
          </motion.ul>
        </motion.nav>
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
          <Link href='/resume' className='text-md btn-ghost btn normal-case'>
            Resume
          </Link>
        </div>
      </header>
    </>
  );
}
