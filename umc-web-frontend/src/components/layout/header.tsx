import { Link } from "@tanstack/react-router";

function Header() {
  return (
    <header className="flex h-[91px] w-full shrink-0 items-center justify-between border-b border-[#e3e6eb] bg-white px-20 py-6">
      <div className="flex items-center gap-[42px]">
        <Link className="flex items-center gap-[10px] text-[#17191e] no-underline" to="/" aria-label="UMCine 홈">
          <span
            className="flex size-8 items-center justify-center rounded-lg border-2 border-[#17191e]"
            aria-hidden="true"
          >
            <img className="size-6" src="/icons/movie.svg" alt="" />
          </span>
          <span className="text-xl leading-normal font-black tracking-[-0.7px]">UMCine</span>
        </Link>

        <nav className="flex items-center gap-[30px] text-center text-sm leading-normal font-bold" aria-label="주요 메뉴">
          <Link
            className="text-[#606774] no-underline"
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "text-[#17191e] underline" }}
          >
            영화
          </Link>
          <Link
            className="text-[#606774] no-underline"
            to="/search"
            activeProps={{ className: "text-[#17191e] underline" }}
          >
            검색
          </Link>
          <a className="text-[#606774] no-underline" href="#my-page">
            내 정보
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-[10px]">
        <Link
          className="flex size-[42px] items-center justify-center rounded-lg border border-[#e3e6eb] bg-white"
          to="/search"
          aria-label="영화 검색"
        >
          <img className="size-6 opacity-60" src="/icons/search.svg" alt="" />
        </Link>
        <button
          className="flex h-[42px] cursor-pointer items-center justify-center rounded-lg border border-white bg-[#2563eb] px-4 text-sm leading-[17px] font-extrabold text-white"
          type="button"
        >
          로그인
        </button>
      </div>
    </header>
  )
}

export default Header
