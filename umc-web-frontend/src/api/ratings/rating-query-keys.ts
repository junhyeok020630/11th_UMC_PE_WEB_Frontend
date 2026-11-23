export const ratingQueryKeys = {
  all: ["ratings"] as const,
  member: (memberId: number) => ["ratings", "member", memberId] as const,
};
