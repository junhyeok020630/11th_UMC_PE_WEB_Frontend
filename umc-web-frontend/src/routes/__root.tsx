import { createRootRoute } from "@tanstack/react-router";
import { RootLayout } from "../components/layout/root-layout";

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => (
    <main className="flex flex-1 items-center justify-center px-20 py-24 text-lg font-bold text-[#606774]">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
