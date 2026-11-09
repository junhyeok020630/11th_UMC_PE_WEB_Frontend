import { Outlet, useLocation } from "@tanstack/react-router";
import { Footer } from "./footer";
import Header from "./header";

export function RootLayout() {
  const pathname = useLocation({ select: (location) => location.pathname });
  const shouldShowFooter = pathname !== "/login";

  return (
    <div className="relative flex min-h-screen min-w-[1024px] flex-col bg-[#f6f7f9] font-[Pretendard,'Pretendard_Variable',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[#17191e] antialiased">
      <Header />
      <Outlet />
      {shouldShowFooter && <Footer />}
    </div>
  );
}
