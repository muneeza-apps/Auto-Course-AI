import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-base font-semibold text-[#0D0D0D]">Auto Course AI</span>
          <span className="rounded-full bg-purple-light px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-purple-dark">
            Beta
          </span>
        </Link>
        <span className="text-sm font-medium text-gray-400">Powered by Band AI</span>
      </div>
    </nav>
  );
}
