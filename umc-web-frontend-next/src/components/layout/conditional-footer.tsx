"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export function ConditionalFooter() {
  const pathname = usePathname();
  const shouldShowFooter = pathname !== "/login" && pathname !== "/my-page/edit";

  return shouldShowFooter ? <Footer /> : null;
}
