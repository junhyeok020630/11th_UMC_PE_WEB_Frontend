import { authApi } from "@/api/auth-api";
import type { FavoriteApiResponse } from "./models";

export function deleteFavorite(movieId: number) {
  return authApi
    .delete(`favorites/${movieId}`)
    .json<FavoriteApiResponse<null>>();
}
