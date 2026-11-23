import { createFileRoute, redirect } from "@tanstack/react-router";
import { EditMyPage } from "@/pages/members/edit-my-page";
import { hasStoredAccessToken } from "@/utils/auth-storage";

export const Route = createFileRoute("/my-page_/edit")({
  beforeLoad: () => {
    if (!hasStoredAccessToken()) {
      throw redirect({ to: "/login" });
    }
  },
  component: EditMyPage,
});
