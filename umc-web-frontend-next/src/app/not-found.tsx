import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-20 py-24 text-lg font-bold text-[#606774]">
      <p>페이지를 찾을 수 없어요.</p>
      <Link className="text-[#2563eb]" href="/">
        영화 목록으로 돌아가기
      </Link>
    </main>
  );
}
