import { authApi } from "@/api/auth-api";
import type { Rating, RatingApiResponse } from "./models";

export interface CreateRatingRequest {
  movieId: number;
  score: number;
  comment: string | null;
}

export function createRating(body: CreateRatingRequest) {
  return authApi
    .post("ratings", { json: body })
    .json<RatingApiResponse<Rating>>();
}
