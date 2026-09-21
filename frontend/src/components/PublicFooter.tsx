import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function PublicFooter() {
  return (
    <footer className="border-t border-stone-200 bg-brand-navy text-stone-300">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="text-base font-semibold text-white">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm text-stone-400">
              審査済みの不動産営業・会社を、無料でご紹介します。
            </p>
          </div>

          <div className="flex flex-col gap-2 text-sm">
            <Link href="/cases" className="hover:text-white">
              事例紹介
            </Link>
            <Link href="/blog" className="hover:text-white">
              ブログ
            </Link>
            <Link href="/links" className="hover:text-white">
              参考リンク
            </Link>
          </div>

          <div className="flex gap-4 text-sm">
            <a href={siteConfig.sns.x} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              X
            </a>
            <a href={siteConfig.sns.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram
            </a>
            <a href={siteConfig.sns.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white">
              YouTube
            </a>
          </div>
        </div>

        <p className="mt-8 border-t border-stone-700 pt-6 text-xs text-stone-500">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
