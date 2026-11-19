import { useQueries, useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { favoriteQueryKeys } from "@/api/favorites/favorite-query-keys";
import { getFavorites } from "@/api/favorites/get-favorites";
import { getMe } from "@/api/members/me";
import { getMovieDetail } from "@/api/movies/get-movie-detail";
import Pagination from "@/components/movies/pagination";
import { useAuthStore } from "@/stores/auth-store";
import { getMemberIdFromAccessToken } from "@/utils/auth/get-member-id-from-access-token";
import { getTmdbPosterUrl } from "@/utils/movies/tmdb-image";

const FAVORITES_PER_PAGE = 5;

export function MyPage() {
  const [page, setPage] = useState(1);
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = getMemberIdFromAccessToken(accessToken);
  const queryMemberId = memberId ?? 0;
  const isAuthenticated = accessToken !== null && memberId !== null;

  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
  const favoritesQuery = useQuery({
    queryKey: favoriteQueryKeys.list(queryMemberId),
    queryFn: getFavorites,
    enabled: isAuthenticated,
    retry: false,
  });

  const favorites = favoritesQuery.data ?? [];
  const totalPages = Math.max(
    1,
    Math.ceil(favorites.length / FAVORITES_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * FAVORITES_PER_PAGE;
  const currentFavorites = favorites.slice(
    startIndex,
    startIndex + FAVORITES_PER_PAGE,
  );
  const favoriteMovieQueries = useQueries({
    queries: currentFavorites.map((favorite) => ({
      queryKey: ["movies", "detail", favorite.movieId],
      queryFn: () => getMovieDetail(favorite.movieId),
    })),
  });
  const favoriteMovies = favoriteMovieQueries.flatMap((query) =>
    query.data ? [query.data] : [],
  );
  const isFavoriteMoviesPending = favoriteMovieQueries.some(
    (query) => query.isPending,
  );
  const isFavoriteMoviesError = favoriteMovieQueries.some(
    (query) => query.isError,
  );

  if (!accessToken) {
    return (
      <main className="flex w-full flex-1 flex-col items-center justify-center gap-4 px-20 py-24">
        <p className="m-0 text-lg font-bold text-[#606774]">
          로그인 후 내 정보를 확인할 수 있어요.
        </p>
        <Link
          className="flex h-[42px] items-center justify-center rounded-lg bg-[#2563eb] px-4 text-sm font-extrabold text-white no-underline"
          to="/login"
        >
          로그인
        </Link>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className="flex w-full flex-1 items-center justify-center px-20 py-24 text-lg font-bold text-[#606774]">
        로그인 정보를 확인할 수 없어요. 다시 로그인해 주세요.
      </main>
    );
  }

  if (meQuery.isPending) {
    return (
      <main className="flex w-full flex-1 items-center justify-center px-20 py-24 text-lg font-bold text-[#606774]">
        내 정보를 불러오는 중이에요.
      </main>
    );
  }

  if (meQuery.isError) {
    return (
      <main className="flex w-full flex-1 items-center justify-center px-20 py-24 text-lg font-bold text-[#606774]">
        내 정보를 불러오지 못했어요.
      </main>
    );
  }

  const profile = meQuery.data;

  return (
    <main className="flex w-full flex-1 flex-col items-start gap-7 px-20 py-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="m-0 text-[31px] leading-[37px] font-bold tracking-[-1.24px] text-[#17191e]">
          내 정보
        </h1>
        <Link
          className="flex h-[42px] items-center justify-center rounded-lg border border-white bg-[#2563eb] px-4 text-sm leading-normal font-extrabold text-white no-underline"
          to="/my-page/edit"
        >
          정보 수정
        </Link>
      </div>

      <section className="flex w-full flex-col items-start gap-4 border-y border-[#e3e6eb] py-3">
        <h2 className="m-0 w-full text-[17px] leading-5 font-bold text-[#17191e]">
          기본 정보
        </h2>
        <div className="flex w-full items-center gap-7">
          <span className="flex size-[82px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e3e6eb]">
            <img className="size-12" src="/icons/person.svg" alt="" />
          </span>
          <dl className="m-0 flex w-[760px] max-w-[760px] items-start justify-center gap-7">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
              <dt className="m-0 w-full text-[11px] leading-[13px] font-normal text-[#969da8]">
                닉네임
              </dt>
              <dd className="m-0 w-full text-sm leading-[17px] font-bold text-[#17191e]">
                {profile.nickname}
              </dd>
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
              <dt className="m-0 w-full text-[11px] leading-[13px] font-normal text-[#969da8]">
                이메일
              </dt>
              <dd className="m-0 w-full text-sm leading-[17px] font-bold text-[#17191e]">
                {profile.email}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-4">
        <h2 className="m-0 w-full text-[17px] leading-5 font-bold text-[#17191e]">
          내 즐겨찾기
        </h2>

        {favoritesQuery.isPending || isFavoriteMoviesPending ? (
          <p className="m-0 flex min-h-[339px] w-full items-center justify-center text-sm font-bold text-[#606774]">
            즐겨찾기를 불러오는 중이에요.
          </p>
        ) : favoritesQuery.isError || isFavoriteMoviesError ? (
          <p className="m-0 flex min-h-[339px] w-full items-center justify-center text-sm font-bold text-[#606774]">
            즐겨찾기를 불러오지 못했어요.
          </p>
        ) : favorites.length === 0 ? (
          <p className="m-0 flex min-h-[339px] w-full items-center justify-center text-sm font-bold text-[#606774]">
            아직 즐겨찾기한 영화가 없어요.
          </p>
        ) : (
          <>
            <div className="grid min-h-[339px] w-full grid-cols-5 gap-x-[18px] gap-y-5">
              {favoriteMovies.map((movie) => {
                const posterUrl = getTmdbPosterUrl(movie.poster_path);

                return (
                  <article
                    className="flex min-w-0 flex-col items-start gap-1 self-start"
                    key={movie.id}
                  >
                    <Link
                      className="h-[274px] w-full overflow-hidden rounded-[10px] bg-[#e3e6eb] no-underline"
                      to="/movies/$movieId"
                      params={{ movieId: String(movie.id) }}
                    >
                      {posterUrl ? (
                        <img
                          className="block size-full object-cover"
                          src={posterUrl}
                          alt={`${movie.title} 포스터`}
                        />
                      ) : (
                        <span className="flex size-full items-center justify-center text-sm text-[#969da8]">
                          이미지 없음
                        </span>
                      )}
                    </Link>
                    <h3 className="m-0 w-full overflow-hidden pt-[5px] text-ellipsis whitespace-nowrap text-sm leading-[17px] font-extrabold text-[#17191e]">
                      {movie.title}
                    </h3>
                    <time
                      className="text-xs leading-[14px] font-normal text-[#969da8]"
                      dateTime={movie.release_date}
                    >
                      {movie.release_date
                        ? movie.release_date.replaceAll("-", ".")
                        : "개봉일 미정"}
                    </time>
                  </article>
                );
              })}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </section>
    </main>
  );
}
