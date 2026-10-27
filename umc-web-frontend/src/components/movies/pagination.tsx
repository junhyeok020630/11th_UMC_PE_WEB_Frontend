import { cn } from '../../utils/cn'

interface PaginationProps {
  currentPage: number
  totalPages: number
}

function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <nav className="mt-5 flex h-9 w-full items-center justify-center gap-3" aria-label="영화 목록 페이지">
      <button
        type="button"
        className="flex size-6 cursor-default items-center justify-center border-0 bg-transparent p-0 opacity-35"
        aria-label="이전 페이지"
        disabled
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
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className="flex size-6 cursor-pointer items-center justify-center border-0 bg-transparent p-0"
        aria-label="다음 페이지"
      >
        <img className="size-6" src="/icons/chevron-right.svg" alt="" />
      </button>
    </nav>
  )
}

export default Pagination
