"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

function Header() {
  const pathname = usePathname() ?? "";

  return (
    <header className="flex h-[91px] w-full shrink-0 items-center justify-between border-b border-[#e3e6eb] bg-white px-20 py-6">
      <div className="flex items-center gap-[42px]">
        <Link className="flex items-center gap-[10px] text-[#17191e] no-underline" href="/" aria-label="UMCine 홈">
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
            className={cn(
              "text-[#606774] no-underline",
              pathname === "/" && "text-[#17191e] underline",
            )}
            href="/"
          >
            영화
          </Link>
          <Link
            className={cn(
              "text-[#606774] no-underline",
              pathname === "/search" && "text-[#17191e] underline",
            )}
            href="/search"
          >
            검색
          </Link>
          <Link
            className={cn(
              "text-[#606774] no-underline",
              pathname.startsWith("/my-page") && "text-[#17191e] underline",
            )}
            href="/my-page"
          >
            내 정보
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-[10px]">
        <Link
          className="flex size-[42px] items-center justify-center rounded-lg border border-[#e3e6eb] bg-white"
          href="/search"
          aria-label="영화 검색"
        >
          <img className="size-6 opacity-60" src="/icons/search.svg" alt="" />
        </Link>
        <Link
          className="flex h-[42px] items-center justify-center rounded-lg border border-white bg-[#2563eb] px-4 text-sm leading-[17px] font-extrabold text-white no-underline"
          href="/login"
        >
          로그인
        </Link>
      </div>
    </header>
  )
}

export default Header
