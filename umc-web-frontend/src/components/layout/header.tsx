import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getMe } from "@/api/members/me";
import { useAuthStore } from "@/stores/auth-store";

function Header() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const meQuery = useQuery({
    queryKey: ["members", "me"],
    queryFn: getMe,
    enabled: Boolean(accessToken),
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

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
          <Link
            className="text-[#606774] no-underline"
            to="/my-page"
            activeProps={{ className: "text-[#17191e] underline" }}
          >
            내 정보
          </Link>
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
        {!accessToken ? (
          <Link
            className="flex h-[42px] items-center justify-center rounded-lg border border-white bg-[#2563eb] px-4 text-sm leading-[17px] font-extrabold text-white no-underline"
            to="/login"
          >
            로그인
          </Link>
        ) : meQuery.isLoading ? (
          <span className="h-[42px] w-[82px] animate-pulse rounded-lg bg-[#e3e6eb]" />
        ) : (
          <Link
            className="flex h-[42px] items-center justify-center rounded-lg border border-white bg-[#2563eb] px-4 text-sm leading-[17px] font-extrabold text-white no-underline"
            to="/my-page"
          >
            마이페이지
          </Link>
        )}
      </div>
    </header>
  )
}

export default Header
