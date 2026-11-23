const tmdbApiBaseUrl =
  process.env.NEXT_PUBLIC_TMDB_API_BASE_URL ?? "https://api.themoviedb.org/3";
const tmdbAccessToken = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN ?? "";
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export const env = {
  tmdbApiBaseUrl,
  tmdbAccessToken,
  apiBaseUrl,
};
