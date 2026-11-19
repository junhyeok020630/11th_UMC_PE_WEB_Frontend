import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavorite } from "@/api/favorites/create-favorite";
import { favoriteQueryKeys } from "@/api/favorites/favorite-query-keys";
import type { Favorite, FavoriteStatus } from "@/api/favorites/models";

export function useCreateFavoriteMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createFavorite,
    onSuccess: (response) => {
      const favorite = response.result;
      const favoritesQueryKey = favoriteQueryKeys.list(memberId);
      const previousFavorites = queryClient.getQueryData<Favorite[]>(
        favoritesQueryKey,
      );

      if (previousFavorites !== undefined) {
        queryClient.setQueryData<Favorite[]>(favoritesQueryKey, [
          favorite,
          ...previousFavorites.filter(
            (previousFavorite) =>
              previousFavorite.movieId !== favorite.movieId,
          ),
        ]);
      }

      queryClient.setQueryData<FavoriteStatus>(
        favoriteQueryKeys.status(memberId, favorite.movieId),
        { isFavorite: true },
      );
      alert(response.message);
    },
    onError: () => {
      alert("즐겨찾기 등록에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
