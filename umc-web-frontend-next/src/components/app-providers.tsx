"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState, type ReactNode } from "react";
import { useBookmarkStore } from "@/stores/bookmark-store";
import { readBookmarkIds } from "@/utils/bookmark-storage";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { retry: 1, refetchOnWindowFocus: false },
        },
      }),
  );
  const hydrateBookmarks = useBookmarkStore((state) => state.hydrateBookmarks);

  useEffect(() => {
    hydrateBookmarks(readBookmarkIds());
  }, [hydrateBookmarks]);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
