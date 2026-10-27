import { Link } from '@tanstack/react-router'

import type { TmdbMovieListItem } from '../../api/movies/models'
import { getTmdbPosterUrl } from '../../utils/movies/tmdb-image'
import { BookmarkButton } from '../bookmark-button'

interface MovieCardProps {
  movie: TmdbMovieListItem
}

function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = getTmdbPosterUrl(movie.poster_path)

  return (
    <article className="flex min-w-0 flex-col items-start gap-1">
      <div className="relative h-[274px] w-full overflow-hidden rounded-[10px] bg-[#e3e6eb]">
        <Link
          className="block h-full w-full"
          to="/movies/$movieId"
          params={{ movieId: String(movie.id) }}
        >
          {posterUrl ? (
            <img
              className="block h-full w-full object-cover"
              src={posterUrl}
              alt={`${movie.title} 포스터`}
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-sm text-[#969da8]">
              이미지 없음
            </span>
          )}
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
        dateTime={movie.release_date}
      >
        {movie.release_date.replaceAll('-', '.')}
      </time>
    </article>
  )
}

export default MovieCard
