import { Suspense, type ReactNode } from "react";
import { ConditionalFooter } from "./conditional-footer";
import Header from "./header";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative flex min-h-screen min-w-[1024px] flex-col bg-[#f6f7f9] font-[Pretendard,'Pretendard_Variable',-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[#17191e] antialiased">
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      {children}
      <Suspense fallback={null}>
        <ConditionalFooter />
      </Suspense>
    </div>
  );
}
