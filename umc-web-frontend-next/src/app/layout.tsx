import type { Metadata } from "next";
import { AppProviders } from "@/components/app-providers";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "UMCine",
  description: "영화를 검색하고 즐겨찾기와 평점을 관리하는 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body>
        <AppProviders>
          <AppShell>{children}</AppShell>
        </AppProviders>
      </body>
    </html>
  );
}
