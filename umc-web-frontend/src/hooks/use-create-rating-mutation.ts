import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRating } from "@/api/ratings/create-rating";
import type { Rating } from "@/api/ratings/models";
import { ratingQueryKeys } from "@/api/ratings/rating-query-keys";

export function useCreateRatingMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createRating,
    onSuccess: (response) => {
      queryClient.setQueryData<Rating[]>(
        ratingQueryKeys.member(memberId),
        (previousRatings = []) => [response.result, ...previousRatings],
      );
      alert(response.message);
    },
    onError: () => {
      alert("평점 등록에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
