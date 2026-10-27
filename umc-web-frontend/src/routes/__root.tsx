import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/layout/header";

export const Route = createRootRoute({
  component: () => (
    <div className="relative flex min-h-screen min-w-[1024px] flex-col bg-[#f6f7f9] font-[Pretendard,'Pretendard_Variable',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[#17191e] antialiased">
      <Header />
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <main className="flex flex-1 items-center justify-center px-20 py-24 text-lg font-bold text-[#606774]">
      페이지를 찾을 수 없어요.
    </main>
  ),
});
