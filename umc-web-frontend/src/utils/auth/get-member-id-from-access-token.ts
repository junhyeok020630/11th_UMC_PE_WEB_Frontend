interface AccessTokenPayload {
  sub?: string;
}

export function getMemberIdFromAccessToken(accessToken: string | null) {
  if (!accessToken) return null;

  try {
    const payloadPart = accessToken.split(".")[1];
    if (!payloadPart) return null;

    const base64 = payloadPart.replaceAll("-", "+").replaceAll("_", "/");
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );
    const payload = JSON.parse(atob(paddedBase64)) as AccessTokenPayload;
    const memberId = Number(payload.sub);

    return Number.isInteger(memberId) && memberId > 0 ? memberId : null;
  } catch {
    return null;
  }
}
