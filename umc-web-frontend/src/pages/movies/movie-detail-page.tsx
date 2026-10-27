import { Link, useParams } from "@tanstack/react-router";
import { BookmarkButton } from "../../components/bookmark-button";
import { Footer } from "../../components/layout/footer";
import { movies } from "../../data/movies";

export function MovieDetailPage() {
  const { movieId } = useParams({ from: "/movies/$movieId" });
  const movie = movies.find((item) => item.id === Number(movieId));

  if (!movie) {
    return (
      <main className="flex w-full flex-1 items-center justify-center px-20 py-24 text-lg font-bold text-[#606774]">
        영화를 찾을 수 없어요.
      </main>
    );
  }

  return (
    <>
      <main className="w-full flex-1">
        <section className="relative h-[360px] w-full overflow-hidden">
          <img
            className="absolute inset-0 size-full object-cover"
            src={movie.backdropPath}
            alt=""
            aria-hidden="true"
          />
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
              <p className="m-0 text-sm leading-normal">{movie.originalTitle}</p>
              <div className="flex w-full items-center gap-2 text-[13px] leading-normal font-bold">
                <time dateTime={movie.releaseDate.replaceAll(".", "-")}>{movie.releaseDate}</time>
                <span>{movie.genres.join(" · ")}</span>
                <span>{movie.runtime}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="flex w-full items-start gap-8 px-20 py-6">
          <img
            className="h-[286px] w-[200px] shrink-0 rounded-[10px] object-cover shadow-[0_12px_30px_rgba(12,15,20,0.12)]"
            src={movie.posterPath}
            alt={`${movie.title} 포스터`}
          />

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

          <aside className="flex w-[360px] shrink-0 flex-col items-start gap-2 border-l border-[#e3e6eb] pb-[41px] pl-[30px]">
            <h2 className="m-0 w-full text-[21px] leading-normal font-bold tracking-[-0.63px] text-[#17191e]">
              내 평점
            </h2>
            <p className="m-0 w-full text-xs leading-normal text-[#969da8]">
              별점은 필수, 후기는 선택이에요.
            </p>
            <div className="flex w-full items-start gap-1" aria-label="영화 별점">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  className="flex size-[38px] cursor-pointer items-center justify-center rounded-lg border border-[#e3e6eb] bg-white p-0"
                  type="button"
                  aria-label={`${score}점`}
                  key={score}
                >
                  <img className="size-6 opacity-60" src="/icons/star.svg" alt="" />
                </button>
              ))}
            </div>
            <textarea
              className="h-[102px] w-full resize-none rounded-lg border border-[#e3e6eb] bg-white px-3 py-4 text-[13px] leading-[19.5px] text-[#17191e] outline-none placeholder:text-[#969da8]"
              placeholder="영화를 보고 느낀 점을 남겨보세요."
              aria-label="영화 후기"
            />
            <button
              className="flex h-[42px] w-full cursor-pointer items-center justify-center rounded-lg border border-white bg-[#17191e] px-4 text-sm leading-normal font-extrabold text-white"
              type="button"
            >
              평점 저장
            </button>
          </aside>
        </section>
      </main>
      <Footer />
    </>
  );
}
