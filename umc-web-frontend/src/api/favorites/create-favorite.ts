import { authApi } from "@/api/auth-api";
import type { Favorite, FavoriteApiResponse } from "./models";

export interface CreateFavoriteRequest {
  movieId: number;
}

export function createFavorite(body: CreateFavoriteRequest) {
  return authApi
    .post("favorites", { json: body })
    .json<FavoriteApiResponse<Favorite>>();
}
