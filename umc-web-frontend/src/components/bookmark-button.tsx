import { useBookmarkStore } from "../stores/bookmark-store";
import { cn } from "../utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  movieTitle: string;
  variant?: "card" | "action";
}

export function BookmarkButton({
  movieId,
  movieTitle,
  variant = "card",
}: BookmarkButtonProps) {
  const isBookmarked = useBookmarkStore((state) =>
    state.bookmarkedMovieIds.includes(movieId),
  );
  const toggleBookmark = useBookmarkStore((state) => state.toggleBookmark);
  const bookmarkLabel = isBookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가";

  return (
    <button
      className={cn(
        "flex cursor-pointer items-center justify-center rounded-lg border border-white text-white",
        variant === "card" &&
          "absolute top-[10px] right-[10px] size-[34px] bg-[#17191e] p-0",
        variant === "card" &&
          isBookmarked &&
          "border-[#2563eb] bg-[#2563eb]",
        variant === "action" &&
          "h-[42px] gap-2 bg-[#2563eb] px-4 text-sm leading-normal font-extrabold",
      )}
      type="button"
      aria-label={`${movieTitle} ${bookmarkLabel}`}
      aria-pressed={isBookmarked}
      onClick={() => toggleBookmark(movieId)}
    >
      <img
        className={cn("invert", variant === "card" ? "size-6" : "size-4")}
        src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
      />
      {variant === "action" && (isBookmarked ? "즐겨찾기 해제" : "즐겨찾기")}
    </button>
  );
}
