"use client";

import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

// TODO(kickoff instructions step 4): real authentication is not implemented yet.
// This is UI-only for now; submitting always navigates to /admin/leads.
export default function AdminLoginPage() {
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/admin/leads");
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center">
      <h1 className="text-center font-serif text-xl font-bold text-brand-navy">
        管理ワークスペース ログイン
      </h1>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <label className="flex flex-col gap-1 text-sm text-stone-700">
          <span className="font-medium">メールアドレス</span>
          <input
            type="email"
            required
            className="rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm text-stone-700">
          <span className="font-medium">パスワード</span>
          <input
            type="password"
            required
            className="rounded-md border border-stone-300 px-3 py-2 outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-full bg-brand-navy px-6 py-2 text-sm font-semibold text-white hover:bg-brand-navy-light"
        >
          ログイン
        </button>
        <p className="text-center text-xs text-amber-700">
          ※開発中：現在は入力内容に関わらずログインできます
        </p>
      </form>
    </div>
  );
}
