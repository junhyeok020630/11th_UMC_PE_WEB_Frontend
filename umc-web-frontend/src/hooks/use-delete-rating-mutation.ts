import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRating } from "@/api/ratings/delete-rating";
import type { Rating } from "@/api/ratings/models";
import { ratingQueryKeys } from "@/api/ratings/rating-query-keys";

export function useDeleteRatingMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteRating,
    onSuccess: (response, ratingId) => {
      queryClient.setQueryData<Rating[]>(
        ratingQueryKeys.member(memberId),
        (previousRatings = []) =>
          previousRatings.filter((rating) => rating.ratingId !== ratingId),
      );
      alert(response.message);
    },
    onError: () => {
      alert("평점 삭제에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
