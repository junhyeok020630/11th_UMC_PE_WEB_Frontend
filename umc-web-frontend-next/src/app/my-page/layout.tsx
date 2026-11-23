import type { ReactNode } from "react";
import { AuthGuard } from "@/components/auth-guard";

interface MyPageLayoutProps {
  children: ReactNode;
}

export default function MyPageLayout({ children }: MyPageLayoutProps) {
  return <AuthGuard>{children}</AuthGuard>;
}
