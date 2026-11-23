import { authApi } from "@/api/auth-api";
import type { Rating, RatingApiResponse } from "./models";

export interface UpdateRatingRequest {
  score: number;
  comment: string | null;
}

export function updateRating(
  ratingId: number,
  body: UpdateRatingRequest,
) {
  return authApi
    .patch(`ratings/${ratingId}`, { json: body })
    .json<RatingApiResponse<Rating>>();
}
