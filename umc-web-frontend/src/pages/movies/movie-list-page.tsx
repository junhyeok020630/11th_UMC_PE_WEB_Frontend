import { Footer } from '../../components/layout/footer'
import MovieGrid from '../../components/movies/movie-grid'
import Pagination from '../../components/movies/pagination'
import { movies } from '../../data/movies'

export function MovieListPage() {
  return (
    <>
      <main className="flex w-full flex-1 flex-col gap-5 px-20 py-6" id="movies">
        <h1 className="m-0 text-[38px] leading-[44px] font-bold tracking-[-1.71px]">영화 목록</h1>
        <MovieGrid movies={movies} />
        <Pagination currentPage={1} totalPages={5} />
      </main>

      <Footer />
    </>
  )
}
