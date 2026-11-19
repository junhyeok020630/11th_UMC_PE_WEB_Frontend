import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateRating,
  type UpdateRatingRequest,
} from "@/api/ratings/update-rating";
import type { Rating } from "@/api/ratings/models";
import { ratingQueryKeys } from "@/api/ratings/rating-query-keys";

interface UpdateRatingVariables {
  ratingId: number;
  body: UpdateRatingRequest;
}

export function useUpdateRatingMutation(memberId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ ratingId, body }: UpdateRatingVariables) =>
      updateRating(ratingId, body),
    onSuccess: (response) => {
      queryClient.setQueryData<Rating[]>(
        ratingQueryKeys.member(memberId),
        (previousRatings = []) =>
          previousRatings.map((rating) =>
            rating.ratingId === response.result.ratingId
              ? response.result
              : rating,
          ),
      );
      alert(response.message);
    },
    onError: () => {
      alert("평점 수정에 실패했어요. 다시 시도해 주세요.");
    },
  });
}
