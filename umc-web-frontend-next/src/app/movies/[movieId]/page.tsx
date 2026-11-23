import { Suspense } from "react";
import { MovieDetailPage } from "@/views/movies/movie-detail-page";

async function MovieContent({ params }: PageProps<"/movies/[movieId]">) {
  const { movieId } = await params;

  return <MovieDetailPage movieId={movieId} />;
}

export default function MoviePage(props: PageProps<"/movies/[movieId]">) {
  return (
    <Suspense fallback={<main className="flex flex-1 items-center justify-center">영화 정보를 불러오는 중이에요.</main>}>
      <MovieContent {...props} />
    </Suspense>
  );
}
