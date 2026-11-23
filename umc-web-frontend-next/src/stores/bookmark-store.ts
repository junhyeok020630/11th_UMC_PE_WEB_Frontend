import { create } from "zustand";
import { saveBookmarkIds } from "@/utils/bookmark-storage";

interface BookmarkStore {
  bookmarkedMovieIds: number[];
  hydrateBookmarks: (movieIds: number[]) => void;
  toggleBookmark: (movieId: number) => void;
}

export const useBookmarkStore = create<BookmarkStore>()((set) => ({
  bookmarkedMovieIds: [],
  hydrateBookmarks: (movieIds) => set({ bookmarkedMovieIds: movieIds }),
  toggleBookmark: (movieId) =>
    set((state) => {
      const bookmarkedMovieIds = state.bookmarkedMovieIds.includes(movieId)
        ? state.bookmarkedMovieIds.filter((id) => id !== movieId)
        : [...state.bookmarkedMovieIds, movieId];

      saveBookmarkIds(bookmarkedMovieIds);
      return { bookmarkedMovieIds };
    }),
}));
