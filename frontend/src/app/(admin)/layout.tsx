import Link from "next/link";

export default function AdminLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-stone-100">
      <div className="bg-amber-100 px-4 py-1 text-center text-xs text-amber-800">
        開発中：この管理画面にはまだログイン認証がありません（誰でもアクセスできます）
      </div>

      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/admin/leads" className="font-bold text-brand-navy">
            管理ワークスペース
          </Link>
          <nav className="flex items-center gap-6 text-sm text-stone-600">
            <Link href="/admin/leads" className="hover:text-brand-navy">
              案件
            </Link>
            <Link href="/admin/partners" className="hover:text-brand-navy">
              紹介先マスタ
            </Link>
            <Link href="/admin/login" className="hover:text-brand-navy">
              ログアウト
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10 sm:px-6">
        {children}
      </main>
    </div>
  );
}
