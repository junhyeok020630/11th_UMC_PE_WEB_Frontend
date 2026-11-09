const PROFILE = {
  nickname: "gs0428",
  email: "gwangsoo@cinemalab.kr",
};

const FAVORITE_MOVIES = [
  {
    id: 1,
    title: "스파이더맨: 브랜드 뉴 데이",
    releaseDate: "2026.07.29",
    posterPath: "/images/movies/spider-man-brand-new-day.jpg",
  },
  {
    id: 2,
    title: "오디세이",
    releaseDate: "2026.08.05",
    posterPath: "/images/movies/odyssey.jpg",
  },
  {
    id: 5,
    title: "미니언즈 & 몬스터즈",
    releaseDate: "2026.07.15",
    posterPath: "/images/movies/minions-monsters.jpg",
  },
];

export function MyPage() {
  return (
    <main className="flex w-full flex-1 flex-col items-start gap-7 px-20 py-6">
      <div className="flex w-full items-center justify-between">
        <h1 className="m-0 text-[31px] leading-[37px] font-bold tracking-[-1.24px] text-[#17191e]">
          내 정보
        </h1>
        <button
          className="flex h-[42px] cursor-pointer items-center justify-center rounded-lg border border-white bg-[#2563eb] px-4 text-sm leading-normal font-extrabold text-white"
          type="button"
        >
          정보 수정
        </button>
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
                {PROFILE.nickname}
              </dd>
            </div>
            <div className="flex min-w-0 flex-1 flex-col items-start gap-1.5">
              <dt className="m-0 w-full text-[11px] leading-[13px] font-normal text-[#969da8]">
                이메일
              </dt>
              <dd className="m-0 w-full text-sm leading-[17px] font-bold text-[#17191e]">
                {PROFILE.email}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="flex w-full flex-col items-start gap-4">
        <h2 className="m-0 w-full text-[17px] leading-5 font-bold text-[#17191e]">
          내 즐겨찾기
        </h2>

        <div className="grid h-[339px] w-full grid-cols-5 gap-x-[18px] gap-y-5">
          {FAVORITE_MOVIES.map((movie) => (
            <article
              className="flex min-w-0 flex-col items-start gap-1 self-start"
              key={movie.id}
            >
              <div className="h-[274px] w-full overflow-hidden rounded-[10px] bg-[#e3e6eb]">
                <img
                  className="block size-full object-cover"
                  src={movie.posterPath}
                  alt={`${movie.title} 포스터`}
                />
              </div>
              <h3 className="m-0 w-full overflow-hidden pt-[5px] text-ellipsis whitespace-nowrap text-sm leading-[17px] font-extrabold text-[#17191e]">
                {movie.title}
              </h3>
              <time
                className="text-xs leading-[14px] font-normal text-[#969da8]"
                dateTime={movie.releaseDate.replaceAll(".", "-")}
              >
                {movie.releaseDate}
              </time>
            </article>
          ))}
        </div>

        <nav
          className="flex h-9 w-full items-center justify-center gap-3"
          aria-label="내 즐겨찾기 페이지"
        >
          <button
            className="flex size-6 cursor-default items-center justify-center border-0 bg-transparent p-0 opacity-10"
            type="button"
            aria-label="이전 페이지"
            disabled
          >
            <img className="size-6" src="/icons/chevron-left.svg" alt="" />
          </button>
          <span
            className="flex size-9 items-center justify-center rounded-[7px] bg-[#17191e] text-[13px] leading-4 font-bold text-white"
            aria-current="page"
          >
            1
          </span>
          <button
            className="flex size-6 cursor-default items-center justify-center border-0 bg-transparent p-0 opacity-10"
            type="button"
            aria-label="다음 페이지"
            disabled
          >
            <img className="size-6" src="/icons/chevron-right.svg" alt="" />
          </button>
        </nav>
      </section>
    </main>
  );
}
