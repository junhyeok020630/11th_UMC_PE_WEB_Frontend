import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import { getMovieDetail } from "../../api/movies/get-movie-detail";
import { BookmarkButton } from "../../components/bookmark-button";
import { RatingEditor } from "../../components/ratings/rating-editor";
import { getMovieDetailErrorMessage } from "../../utils/movies/get-movie-detail-error-message";
import {
  getTmdbBackdropUrl,
  getTmdbPosterUrl,
} from "../../utils/movies/tmdb-image";

function formatRuntime(runtime: number | null) {
  if (runtime === null) {
    return "상영 시간 정보가 없어요.";
  }

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;

  if (hours === 0) return `${minutes}분`;
  if (minutes === 0) return `${hours}시간`;
  return `${hours}시간 ${minutes}분`;
}

export function MovieDetailPage() {
  const { movieId: movieIdParam } = useParams({ from: "/movies/$movieId" });
  const movieId = Number(movieIdParam);
  const isValidMovieId = Number.isInteger(movieId) && movieId > 0;

  const movieDetailQuery = useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetail(movieId),
    enabled: isValidMovieId,
    staleTime: 30 * 1000,
  });

  if (!isValidMovieId) {
    return (
      <main className="flex w-full flex-1 items-center justify-center px-20 py-24 text-lg font-bold text-[#606774]">
        올바르지 않은 영화 번호예요.
      </main>
    );
  }

  if (movieDetailQuery.isPending) {
    return (
      <main className="flex w-full flex-1 items-center justify-center px-20 py-24 text-lg font-bold text-[#606774]">
        영화 정보를 불러오는 중이에요.
      </main>
    );
  }

  if (movieDetailQuery.isError) {
    return (
      <main className="flex w-full flex-1 items-center justify-center px-20 py-24 text-lg font-bold text-[#606774]">
        {getMovieDetailErrorMessage(movieDetailQuery.error)}
      </main>
    );
  }

  const movie = movieDetailQuery.data;

  const backdropUrl = getTmdbBackdropUrl(movie.backdrop_path);
  const posterUrl = getTmdbPosterUrl(movie.poster_path);
  const genreNames = movie.genres.map((genre) => genre.name).join(", ");
  const runtime = formatRuntime(movie.runtime);

  return (
    <main className="w-full flex-1">
        <section className="relative h-[360px] w-full overflow-hidden">
          {backdropUrl ? (
            <img
              className="absolute inset-0 size-full object-cover"
              src={backdropUrl}
              alt=""
              aria-hidden="true"
            />
          ) : (
            <div className="absolute inset-0 flex size-full items-center justify-center bg-[#e3e6eb] text-sm text-[#969da8]">
              이미지 없음
            </div>
          )}
          <div className="absolute inset-0 flex h-full w-full flex-col justify-between px-20 py-6">
            <Link
              className="flex items-center gap-1 text-[13px] leading-normal font-bold text-white no-underline"
              to="/"
            >
              <img className="size-6 invert" src="/icons/chevron-left.svg" alt="" />
              영화 목록
            </Link>
            <div className="flex w-[800px] flex-col items-start gap-2 text-white">
              <h1 className="m-0 w-full text-[46px] leading-[49.68px] font-bold tracking-[-2.3px]">
                {movie.title}
              </h1>
              <p className="m-0 text-sm leading-normal">{movie.original_title}</p>
              <div className="flex w-full items-center gap-2 text-[13px] leading-normal font-bold">
                <time dateTime={movie.release_date}>
                  {movie.release_date.replaceAll("-", ".")}
                </time>
                <span>{genreNames}</span>
                <span>{runtime}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex w-full items-start gap-8 px-20 py-6">
          {posterUrl ? (
            <img
              className="h-[286px] w-[200px] shrink-0 rounded-[10px] object-cover shadow-[0_12px_30px_rgba(12,15,20,0.12)]"
              src={posterUrl}
              alt={`${movie.title} 포스터`}
            />
          ) : (
            <div className="flex h-[286px] w-[200px] shrink-0 items-center justify-center rounded-[10px] bg-[#e3e6eb] text-sm text-[#969da8] shadow-[0_12px_30px_rgba(12,15,20,0.12)]">
              이미지 없음
            </div>
          )}

          <section className="flex min-w-0 flex-1 flex-col items-start gap-3">
            <h2 className="m-0 w-full text-[21px] leading-normal font-bold tracking-[-0.63px] text-[#17191e]">
              {movie.tagline}
            </h2>
            <p className="m-0 w-full text-sm leading-6 text-[#606774]">{movie.overview}</p>
            <BookmarkButton
              movieId={movie.id}
              movieTitle={movie.title}
              variant="action"
            />
          </section>

          <RatingEditor movieId={movie.id} />
        </section>
    </main>
  );
}
