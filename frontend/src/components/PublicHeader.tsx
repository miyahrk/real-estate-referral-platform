import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/cases", label: "事例紹介" },
  { href: "/blog", label: "ブログ" },
  { href: "/links", label: "参考リンク" },
];

export default function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-serif text-lg tracking-wide text-brand-navy">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-stone-600 sm:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-navy">
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={siteConfig.lineAddFriendUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-[#06C755] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
        >
          LINEで相談する
        </a>
      </div>
    </header>
  );
}
