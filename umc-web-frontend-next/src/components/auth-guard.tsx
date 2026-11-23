"use client";

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { hasStoredAccessToken } from "@/utils/auth-storage";

interface AuthGuardProps {
  children: ReactNode;
}

function subscribeToAuthStorage(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}

function getServerAuthSnapshot() {
  return false;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const isAuthenticated = useSyncExternalStore(
    subscribeToAuthStorage,
    hasStoredAccessToken,
    getServerAuthSnapshot,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;

  return children;
}
