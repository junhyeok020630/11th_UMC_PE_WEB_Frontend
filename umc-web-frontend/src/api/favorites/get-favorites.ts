import { authApi } from "@/api/auth-api";
import type { Favorite, FavoriteApiResponse } from "./models";

export async function getFavorites() {
  const response = await authApi
    .get("favorites")
    .json<FavoriteApiResponse<Favorite[]>>();

  return response.result;
}
