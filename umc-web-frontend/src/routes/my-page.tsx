import { createFileRoute, redirect } from "@tanstack/react-router";
import { MyPage } from "@/pages/members/my-page";
import { hasStoredAccessToken } from "@/utils/auth-storage";

export const Route = createFileRoute("/my-page")({
  beforeLoad: () => {
    if (!hasStoredAccessToken()) {
      throw redirect({ to: "/login" });
    }
  },
  component: MyPage,
});
