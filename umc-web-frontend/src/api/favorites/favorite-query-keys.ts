export const favoriteQueryKeys = {
  all: ["favorites"] as const,
  list: (memberId: number) => ["favorites", "list", memberId] as const,
  status: (memberId: number, movieId: number) =>
    ["favorites", "status", memberId, movieId] as const,
};
