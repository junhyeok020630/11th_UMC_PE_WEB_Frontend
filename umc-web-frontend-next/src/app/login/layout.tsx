import type { ReactNode } from "react";
import { GuestGuard } from "@/components/guest-guard";

interface LoginLayoutProps {
  children: ReactNode;
}

export default function LoginLayout({ children }: LoginLayoutProps) {
  return <GuestGuard>{children}</GuestGuard>;
}
