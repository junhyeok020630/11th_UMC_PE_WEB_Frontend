import { authApi } from "@/api/auth-api";
import type { FavoriteApiResponse, FavoriteStatus } from "./models";

export async function getFavoriteStatus(movieId: number) {
  const response = await authApi
    .get(`favorites/${movieId}`)
    .json<FavoriteApiResponse<FavoriteStatus>>();

  return response.result;
}
