"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { useAuthStore } from "@/stores/auth-store";

interface AuthGuardProps {
  children: ReactNode;
}

function getAccessToken() {
  return useAuthStore.getState().accessToken;
}

function getServerAccessToken() {
  return null;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const accessToken = useSyncExternalStore(
    useAuthStore.subscribe,
    getAccessToken,
    getServerAccessToken,
  );

  useEffect(() => {
    if (!accessToken) {
      router.replace("/login");
    }
  }, [accessToken, router]);

  if (!accessToken) return null;

  return children;
}
