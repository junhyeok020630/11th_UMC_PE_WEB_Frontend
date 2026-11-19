export interface Favorite {
  favoriteId: number;
  movieId: number;
  createdAt: string;
}

export interface FavoriteStatus {
  isFavorite: boolean;
}

export interface FavoriteApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
