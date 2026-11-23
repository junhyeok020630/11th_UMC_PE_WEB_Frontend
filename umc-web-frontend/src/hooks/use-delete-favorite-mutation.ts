import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFavorite } from "@/api/favorites/delete-favorite";
import { favoriteQueryKeys } from "@/api/favorites/favorite-query-keys";
import type { Favorite, FavoriteStatus } from "@/api/favorites/models";

export function useDeleteFavoriteMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteFavorite,
    onSuccess: (response, movieId) => {
      const favoritesQueryKey = favoriteQueryKeys.list(memberId);
      const previousFavorites = queryClient.getQueryData<Favorite[]>(
        favoritesQueryKey,
      );

      if (previousFavorites !== undefined) {
        queryClient.setQueryData<Favorite[]>(
          favoritesQueryKey,
          previousFavorites.filter(
            (favorite) => favorite.movieId !== movieId,
          ),
        );
      }

      queryClient.setQueryData<FavoriteStatus>(
        favoriteQueryKeys.status(memberId, movieId),
        { isFavorite: false },
      );
      alert(response.message);
    },
    onError: () => {
      alert("즐겨찾기 해제에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
