import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { favoriteQueryKeys } from "@/api/favorites/favorite-query-keys";
import { getFavoriteStatus } from "@/api/favorites/get-favorite-status";
import { getFavorites } from "@/api/favorites/get-favorites";
import { useCreateFavoriteMutation } from "@/hooks/use-create-favorite-mutation";
import { useDeleteFavoriteMutation } from "@/hooks/use-delete-favorite-mutation";
import { useAuthStore } from "@/stores/auth-store";
import { getMemberIdFromAccessToken } from "@/utils/auth/get-member-id-from-access-token";
import { cn } from "@/utils/cn";

interface BookmarkButtonProps {
  movieId: number;
  movieTitle: string;
  variant?: "card" | "action";
  statusSource?: "list" | "detail";
}

export function BookmarkButton({
  movieId,
  movieTitle,
  variant = "card",
  statusSource = "list",
}: BookmarkButtonProps) {
  const navigate = useNavigate();
  const accessToken = useAuthStore((state) => state.accessToken);
  const memberId = getMemberIdFromAccessToken(accessToken);
  const queryMemberId = memberId ?? 0;
  const isAuthenticated = accessToken !== null && memberId !== null;
  const favoritesQuery = useQuery({
    queryKey: favoriteQueryKeys.list(queryMemberId),
    queryFn: getFavorites,
    enabled: isAuthenticated && statusSource === "list",
    retry: false,
  });
  const favoriteStatusQuery = useQuery({
    queryKey: favoriteQueryKeys.status(queryMemberId, movieId),
    queryFn: () => getFavoriteStatus(movieId),
    enabled: isAuthenticated && statusSource === "detail",
    retry: false,
  });
  const createFavoriteMutation = useCreateFavoriteMutation(queryMemberId);
  const deleteFavoriteMutation = useDeleteFavoriteMutation(queryMemberId);
  const isBookmarked =
    statusSource === "detail"
      ? (favoriteStatusQuery.data?.isFavorite ?? false)
      : (favoritesQuery.data?.some(
          (favorite) => favorite.movieId === movieId,
        ) ?? false);
  const isQueryPending =
    isAuthenticated &&
    (statusSource === "detail"
      ? favoriteStatusQuery.isPending
      : favoritesQuery.isPending);
  const isMutationPending =
    createFavoriteMutation.isPending || deleteFavoriteMutation.isPending;
  const isPending = isQueryPending || isMutationPending;
  const bookmarkLabel = isBookmarked ? "즐겨찾기 해제" : "즐겨찾기 추가";

  const handleClick = () => {
    if (!isAuthenticated) {
      alert("로그인 후 즐겨찾기를 이용할 수 있어요.");
      void navigate({ to: "/login" });
      return;
    }

    const hasQueryError =
      statusSource === "detail"
        ? favoriteStatusQuery.isError
        : favoritesQuery.isError;

    if (hasQueryError) {
      alert("즐겨찾기 정보를 불러오지 못했어요. 다시 시도해 주세요.");
      return;
    }

    if (isPending) return;

    if (isBookmarked) {
      deleteFavoriteMutation.mutate(movieId);
      return;
    }

    createFavoriteMutation.mutate({ movieId });
  };

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
        isPending && "cursor-not-allowed opacity-60",
      )}
      type="button"
      aria-label={`${movieTitle} ${bookmarkLabel}`}
      aria-pressed={isBookmarked}
      disabled={isPending}
      onClick={handleClick}
    >
      <img
        className={cn("invert", variant === "card" ? "size-6" : "size-4")}
        src={isBookmarked ? "/icons/bookmark.svg" : "/icons/bookmark-outline.svg"}
        alt=""
      />
      {variant === "action" &&
        (isPending
          ? "확인 중"
          : isBookmarked
            ? "즐겨찾기 해제"
            : "즐겨찾기")}
    </button>
  );
}
