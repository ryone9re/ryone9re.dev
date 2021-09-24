import Link from 'next/link'
import { PaginationReq } from '../../types/article'

export const PageRange = (start: number, end: number): number[] =>
  [...Array(end - start + 1)].map((_, i) => start + i)

export const Pagination = ({ totalCount, urlPath }: PaginationReq): JSX.Element => {
  const PER_PAGE = 5
  const path: number = typeof urlPath === 'string' ? Number(urlPath) : Number(urlPath.join(''))
  const maxPage: number = Math.ceil(totalCount / PER_PAGE)

  return (
    <div>
      <div className='flex flex-col items-center my-12'>
        <div className='flex text-gray-700'>
          {((): JSX.Element => {
            if (path > 1) {
              return (
                <Link href={`/blog/page/1`}>
                  <a>
                    <div className='h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer'>
                      <span className='sr-only'>First</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='100%'
                        height='100%'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-chevron-left w-6 h-6'
                      >
                        <polyline points='12 18 7 12 12 6' />
                        <polyline points='16 18 11 12 16 6' />
                      </svg>
                    </div>
                  </a>
                </Link>
              )
            }
          })()}
          {((): JSX.Element => {
            if (path > 1) {
              return (
                <Link href={`/blog/page/${path - 1 > 1 ? path - 1 : 1}`}>
                  <a>
                    <div className='h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer'>
                      <span className='sr-only'>Previous</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='100%'
                        height='100%'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-chevron-left w-6 h-6'
                      >
                        <polyline points='14 18 8 12 14 6' />
                      </svg>
                    </div>
                  </a>
                </Link>
              )
            }
          })()}
          <div className='flex h-12 font-medium rounded-full bg-gray-200'>
            <div className='w-12 h-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-green-600 text-white'>
              {path}
            </div>
          </div>
          {((): JSX.Element => {
            if (path < maxPage) {
              return (
                <Link href={`/blog/page/${path + 1 < maxPage ? path + 1 : maxPage}`}>
                  <a>
                    <div className='h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer'>
                      <span className='sr-only'>Next</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='100%'
                        height='100%'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-chevron-right w-6 h-6'
                      >
                        <polyline points='9 18 15 12 9 6' />
                      </svg>
                    </div>
                  </a>
                </Link>
              )
            }
          })()}
          {((): JSX.Element => {
            if (path < maxPage) {
              return (
                <Link href={`/blog/page/${maxPage}`}>
                  <a>
                    <div className='h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer'>
                      <span className='sr-only'>Last</span>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='100%'
                        height='100%'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        strokeWidth={2}
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='feather feather-chevron-left w-6 h-6'
                      >
                        <polyline points='8 18 13 12 8 6' />
                        <polyline points='12 18 17 12 12 6' />
                      </svg>
                    </div>
                  </a>
                </Link>
              )
            }
          })()}
        </div>
      </div>
    </div>
  )
}
