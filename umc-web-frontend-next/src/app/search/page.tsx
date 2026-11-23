import { Suspense } from "react";
import { SearchPage } from "@/views/movies/search-page";

async function SearchContent({ searchParams }: PageProps<"/search">) {
  const { query } = await searchParams;
  const normalizedQuery = typeof query === "string" ? query : "";

  return <SearchPage key={normalizedQuery} query={normalizedQuery} />;
}

export default function MovieSearchPage(props: PageProps<"/search">) {
  return (
    <Suspense fallback={<main className="flex flex-1 items-center justify-center">검색 화면을 불러오는 중이에요.</main>}>
      <SearchContent {...props} />
    </Suspense>
  );
}
