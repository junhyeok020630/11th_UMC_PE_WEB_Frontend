const AUTH_STORAGE_KEY = "umcine-auth-store";

interface PersistedAuthState {
  state?: {
    accessToken?: unknown;
  };
}

export function getStoredAccessToken() {
  if (typeof window === "undefined") return null;

  const storedValue = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) return null;

  try {
    const persistedState = JSON.parse(storedValue) as PersistedAuthState;
    const accessToken = persistedState.state?.accessToken;

    return typeof accessToken === "string" && accessToken.trim().length > 0
      ? accessToken
      : null;
  } catch {
    return null;
  }
}

export function hasStoredAccessToken() {
  return getStoredAccessToken() !== null;
}
