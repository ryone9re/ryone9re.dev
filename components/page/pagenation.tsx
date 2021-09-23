import Link from 'next/link'
import { PaginationReq } from '../../types/article'

export const PageRange = (start: number, end: number) => [...Array(end - start + 1)].map((_, i) => start + i)

export const Pagination = ({ totalCount, urlPath }: PaginationReq) => {
  const PER_PAGE = 5
  const path: number = typeof urlPath === "string" ? Number(urlPath) : Number(urlPath.join(''))
  const maxPage: number = Math.ceil(totalCount / PER_PAGE)

  return (
    <div className="bg-white w-full px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing
            <span className="font-medium"> {path*5-4} </span>
            to
            <span className="font-medium"> {path*5 >= totalCount ? totalCount : path*5} </span>
            of
            <span className="font-medium"> {totalCount} </span>
            results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {(() => {
              if (path > 1) {
                return (
                  <Link href={`/blog/page/${path - 1 >= 1 ? path - 1 : 1}`}>
                    <a className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </Link>
                )
              }
            })()}
            {(() => {
              if (maxPage < 9) {
                return (
                  PageRange(1, Math.ceil(totalCount / PER_PAGE)).map((num: number, index: number) => (
                    <div key={index}>
                      <Link href={`/blog/page/${num}`}>
                        {(() => {
                          if (num === path) {
                            return (
                              <a aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                {num}
                              </a>
                            )
                          } else {
                            return (
                              <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                {num}
                              </a>
                            )
                          }
                        })()}
                      </Link>
                    </div>
                  ))
                )
              } else {
                return (
                  PageRange(1, Math.ceil(totalCount / PER_PAGE)).map((num: number, index: number) => (
                    <div key={index}>
                      <Link href={`/blog/page/${num}`}>
                        {(() => {
                          if (num === path) {
                            return (
                              <a aria-current="page" className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                {num}
                              </a>
                            )
                          } else {
                            return (
                              <a className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                                {num}
                              </a>
                            )
                          }
                        })()}
                      </Link>
                    </div>
                  ))
                )
              }
            })()}
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            {
              (() => {
                if (path < maxPage) {
                  return (
                    <Link href={ `/blog/page/${path+1 <= maxPage ? path+1 : maxPage}` }>
                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </Link>
                  )
                }
              })()
            }
          </nav>
        </div>
      </div>
    </div>

  )
}
