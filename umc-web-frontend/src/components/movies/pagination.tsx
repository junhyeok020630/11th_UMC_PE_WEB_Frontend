import { cn } from '../../utils/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const visiblePageCount = 5
  const startPage = Math.max(
    1,
    Math.min(currentPage - Math.floor(visiblePageCount / 2), totalPages - visiblePageCount + 1),
  )
  const endPage = Math.min(totalPages, startPage + visiblePageCount - 1)
  const pages = Array.from({ length: Math.max(endPage - startPage + 1, 0) }, (_, index) => {
    return startPage + index
  })
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  return (
    <nav className="mt-5 flex h-9 w-full items-center justify-center gap-3" aria-label="영화 목록 페이지">
      <button
        type="button"
        className={cn(
          'flex size-6 cursor-pointer items-center justify-center border-0 bg-transparent p-0',
          isFirstPage && 'cursor-default opacity-35',
        )}
        aria-label="이전 페이지"
        disabled={isFirstPage}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <img className="size-6" src="/icons/chevron-left.svg" alt="" />
      </button>

      <div className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            type="button"
            className={cn(
              'flex size-9 cursor-pointer items-center justify-center rounded-[7px] border-0 bg-transparent p-0 text-[13px] leading-4 font-bold text-[#606774]',
              page === currentPage && 'bg-[#17191e] text-white',
            )}
            aria-current={page === currentPage ? 'page' : undefined}
            key={page}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={cn(
          'flex size-6 cursor-pointer items-center justify-center border-0 bg-transparent p-0',
          isLastPage && 'cursor-default opacity-35',
        )}
        aria-label="다음 페이지"
        disabled={isLastPage}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <img className="size-6" src="/icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  )
}

export default Pagination
