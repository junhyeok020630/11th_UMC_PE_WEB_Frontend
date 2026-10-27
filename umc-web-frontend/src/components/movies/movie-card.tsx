import { Link } from '@tanstack/react-router'

import type { Movie } from '../../types/movie'
import { BookmarkButton } from '../bookmark-button'

interface MovieCardProps {
  movie: Movie
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <article className="flex min-w-0 flex-col items-start gap-1">
      <div className="relative h-[274px] w-full overflow-hidden rounded-[10px] bg-[#e3e6eb]">
        <Link
          className="block h-full w-full"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          <img
            className="block h-full w-full object-cover"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />
        </Link>
        <BookmarkButton movieId={movie.id} movieTitle={movie.title} />
      </div>
      <h2 className="m-0 w-full overflow-hidden pt-[5px] text-ellipsis whitespace-nowrap text-[14px] leading-[17px] font-extrabold text-[#17191e]">
        <Link
          className="text-inherit no-underline"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {movie.title}
        </Link>
      </h2>
      <time
        className="text-xs leading-[14px] font-normal text-[#969da8]"
        dateTime={movie.releaseDate.replaceAll('.', '-')}
      >
        {movie.releaseDate}
      </time>
    </article>
  )
}

export default MovieCard
