import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState, type SubmitEvent } from "react";
import type { TmdbMovieListItem } from "../../api/movies/models";
import { searchMovies } from "../../api/movies/search-movies";
import { BookmarkButton } from "../../components/bookmark-button";
import { Footer } from "../../components/layout/footer";
import { getTmdbPosterUrl } from "../../utils/movies/tmdb-image";

export function SearchPage() {
  const { query } = useSearch({ from: "/search" });
  const navigate = useNavigate({ from: "/search" });
  const [searchText, setSearchText] = useState(query ?? "");
  const [movies, setMovies] = useState<TmdbMovieListItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setSearchText(query ?? "");
  }, [query]);

  useEffect(() => {
    let ignore = false;
    const normalizedQuery = query?.trim() ?? "";

    setMovies([]);
    setErrorMessage(null);

    if (!normalizedQuery) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    searchMovies({ query: normalizedQuery })
      .then((response) => {
        if (!ignore) setMovies(response.results);
      })
      .catch(() => {
        if (!ignore) setErrorMessage("검색 결과를 불러오지 못했어요.");
      })
      .finally(() => {
        if (!ignore) setIsLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [query]);

  const normalizedQuery = query?.trim() ?? "";

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextQuery = searchText.trim();
    navigate({
      search: nextQuery ? { query: nextQuery } : {},
    });
  }

  if (!normalizedQuery) {
    return (
      <main className="flex w-full flex-1 flex-col items-center px-[72px] pt-[209px] pb-[210px]">
        <div className="flex w-[790px] flex-col items-center gap-9">
          <h1 className="m-0 text-[46px] leading-[52.44px] font-bold tracking-[-2.3px] text-[#17191e]">
            어떤 영화를 찾고 있나요?
          </h1>
          <form
            className="flex h-[74px] w-full items-center gap-[14px] rounded-xl border-2 border-[#17191e] bg-white pr-[17px] pl-[21px] shadow-[0_12px_17px_rgba(17,19,24,0.08)]"
            onSubmit={handleSubmit}
          >
            <img className="size-6 opacity-60" src="/icons/search.svg" alt="" />
            <input
              className="min-w-0 flex-1 border-0 bg-transparent px-0.5 py-px text-[17px] leading-normal text-[#17191e] outline-none placeholder:text-[#969da8]"
              aria-label="검색어"
              placeholder="예: 스파이더맨"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button
              className="flex h-[42px] cursor-pointer items-center justify-center rounded-lg border border-[#17191e] bg-[#17191e] px-4 text-sm leading-normal font-extrabold text-white"
              type="submit"
            >
              검색
            </button>
          </form>
          <p className="m-0 text-sm text-[#969da8]">검색어를 입력해 주세요.</p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="flex w-full flex-1 flex-col px-20 py-6">
        <div className="flex w-full flex-col gap-[17px]">
          <h1 className="m-0 text-[38px] leading-[44px] font-bold tracking-[-1.71px] text-[#17191e]">
            영화 검색
          </h1>
          <form
            className="flex h-[54px] w-full items-center gap-[18px] rounded-[9px] border border-[#e3e6eb] bg-white pr-[10px] pl-[15px]"
            onSubmit={handleSubmit}
          >
            <img className="size-6 opacity-60" src="/icons/search.svg" alt="" />
            <input
              className="min-w-0 flex-1 border-0 bg-transparent px-0.5 py-px text-sm leading-normal font-bold text-[#17191e] outline-none"
              aria-label="검색어"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <img className="size-6 opacity-60" src="/icons/close.svg" alt="" />
            <button
              className="flex h-[42px] cursor-pointer items-center justify-center rounded-lg border border-white bg-[#17191e] px-4 text-sm leading-normal font-extrabold text-white"
              type="submit"
            >
              다시 검색
            </button>
          </form>
        </div>

        <div className="flex h-[54px] w-full items-center justify-between border-y border-[#e3e6eb]">
          <h2 className="m-0 text-lg leading-normal font-bold text-[#17191e]">
            ‘{normalizedQuery}’ 검색 결과
          </h2>
          <p className="m-0 text-xs leading-normal text-[#969da8]">
            영화 {movies.length}편 · 1페이지
          </p>
        </div>

        {isLoading ? (
          <div className="flex min-h-[360px] w-full items-center justify-center">
            <p className="m-0 text-sm text-[#606774]">검색 결과를 불러오는 중이에요.</p>
          </div>
        ) : errorMessage ? (
          <div className="flex min-h-[360px] w-full items-center justify-center">
            <p className="m-0 text-sm text-[#606774]">{errorMessage}</p>
          </div>
        ) : movies.length === 0 ? (
          <div className="flex min-h-[360px] w-full items-center justify-center">
            <p className="m-0 text-sm text-[#606774]">검색 결과가 없어요.</p>
          </div>
        ) : (
          <ul className="m-0 grid w-full list-none grid-cols-2 gap-x-10 p-0">
            {movies.map((movie) => {
              const posterUrl = getTmdbPosterUrl(movie.poster_path);

              return (
                <li
                  className="flex h-[240px] min-w-0 items-start gap-[18px] border-b border-[#e3e6eb] py-5"
                  key={movie.id}
                >
                  {posterUrl ? (
                    <img
                      className="h-[190px] w-[126px] shrink-0 rounded-[10px] object-cover"
                      src={posterUrl}
                      alt={`${movie.title} 포스터`}
                    />
                  ) : (
                    <div className="flex h-[190px] w-[126px] shrink-0 items-center justify-center rounded-[10px] bg-[#e3e6eb] text-xs text-[#969da8]">
                      이미지 없음
                    </div>
                  )}
                  <div className="flex h-full min-w-0 flex-1 flex-col gap-2">
                    <h3 className="m-0 truncate text-lg leading-[24.3px] font-bold text-[#17191e]">
                      {movie.title}
                    </h3>
                    <div className="flex w-full items-center gap-2 text-xs leading-normal text-[#969da8]">
                      <span>{movie.original_title}</span>
                      <span>{movie.release_date.replaceAll("-", ".")}</span>
                    </div>
                    <p className="m-0 line-clamp-2 text-[12.5px] leading-[20.25px] text-[#606774]">
                      {movie.overview}
                    </p>
                    <div className="mt-auto flex items-center gap-3">
                      <Link
                        className="flex items-center gap-1 text-xs leading-normal font-extrabold text-[#2563eb] no-underline"
                        to="/movies/$movieId"
                        params={{ movieId: String(movie.id) }}
                      >
                        상세 보기
                        <img className="size-4" src="/icons/arrow-right.svg" alt="" />
                      </Link>
                      <BookmarkButton
                        movieId={movie.id}
                        movieTitle={movie.title}
                        variant="action"
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
