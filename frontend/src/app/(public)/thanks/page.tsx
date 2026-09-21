import Link from "next/link";

export default function ThanksPage() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-brand-navy">
        お問い合わせありがとうございました
      </h1>
      <p className="mt-4 text-sm text-stone-600">
        担当者より順次ご連絡いたします。今しばらくお待ちください。
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-stone-300 px-6 py-2 text-sm font-semibold text-brand-navy hover:bg-stone-50"
      >
        トップページに戻る
      </Link>
    </section>
  );
}
