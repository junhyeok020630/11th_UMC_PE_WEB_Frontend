export function Footer() {
  return (
    <footer className="mt-auto flex min-h-[57px] w-full shrink-0 items-center justify-end gap-2 border-t border-[#e3e6eb] bg-white px-20 py-4">
      <img className="size-6 object-contain" src="/images/logos/tmdb-logo.svg" alt="TMDB" />
      <p className="m-0 text-xs leading-[14px] font-normal whitespace-nowrap text-[#606774]">
        This product uses the TMDB API but is not endorsed or certified by{' '}
        <a
          className="text-inherit underline"
          href="https://www.themoviedb.org/?language=ko"
          target="_blank"
          rel="noreferrer"
        >
          TMDB
        </a>
        .
      </p>
    </footer>
  )
}
