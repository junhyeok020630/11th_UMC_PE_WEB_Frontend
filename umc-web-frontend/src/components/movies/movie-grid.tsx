import type { Movie } from '../../types/movie'
import MovieCard from './movie-card'

interface MovieGridProps {
  movies: Movie[]
}

function MovieGrid({ movies }: MovieGridProps) {
  return (
    <section
      className="grid w-full grid-cols-1 gap-x-[18px] gap-y-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      aria-label="영화 목록"
    >
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  )
}

export default MovieGrid
