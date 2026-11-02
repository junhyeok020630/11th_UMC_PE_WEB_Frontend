import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { getMovies } from '../../api/movies/get-movies'
import MovieGrid from '../../components/movies/movie-grid'
import Pagination from '../../components/movies/pagination'

export function MovieListPage() {
  const [page, setPage] = useState(1)

  const moviesQuery = useQuery({
    queryKey: ['movies', 'list', { page }],
    queryFn: () => getMovies({ page }),
  })

  const movies = moviesQuery.data?.results ?? []
  const totalPages = moviesQuery.data?.total_pages ?? 0

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
  }

  return (
    <main className="flex w-full flex-1 flex-col gap-5 px-20 py-6" id="movies">
      <h1 className="m-0 text-[38px] leading-[44px] font-bold tracking-[-1.71px]">영화 목록</h1>
      {moviesQuery.isPending ? (
        <p>영화 목록을 불러오는 중이에요.</p>
      ) : moviesQuery.isError ? (
        <p>{moviesQuery.error.message}</p>
      ) : movies.length === 0 ? (
        <p>조건에 맞는 영화가 없어요.</p>
      ) : (
        <>
          <MovieGrid movies={movies} />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      )}
    </main>
  )
}
