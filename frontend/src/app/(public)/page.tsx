import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site-config";

const strengths = [
  {
    title: "審査済みの紹介先のみ",
    body: "実績・対応エリア・専門分野を確認した提携先だけをご紹介します。",
  },
  {
    title: "完全無料・ログイン不要",
    body: "会員登録は不要。相談から紹介まで費用は一切かかりません。",
  },
  {
    title: "中立的な立場でマッチング",
    body: "特定の会社に偏らず、状況に合った提携先をご紹介します。",
  },
];

const flowSteps = [
  {
    title: "ご紹介・発信をきっかけに知る",
    body: "社員からのご紹介や直接のご案内、SNSでの発信などをきっかけにお問い合わせいただきます。",
  },
  {
    title: "無料相談フォーム or LINEでご連絡",
    body: "お名前・ご連絡先・エリア・ご予算・投資目的を教えてください。ログイン登録は不要です。",
  },
  {
    title: "個別ヒアリング",
    body: "ご状況やご希望を詳しくお伺いします。",
  },
  {
    title: "審査済みの紹介先とマッチング",
    body: "ご状況に合った不動産営業・会社をご紹介します。",
  },
];

const faqs = [
  {
    q: "費用はかかりますか？",
    a: "見込み客の方が費用を負担することは一切ありません。すべて無料でご利用いただけます。",
  },
  {
    q: "しつこい営業をされませんか？",
    a: "審査済みの提携先のみをご紹介しており、無理な勧誘をしないことを条件としています。",
  },
  {
    q: "個人情報はどう扱われますか？",
    a: "ご提供いただいた情報は、ご紹介・ヒアリングの目的以外には使用しません。",
  },
  {
    q: "LINEとフォーム、どちらで相談すればいいですか？",
    a: "どちらでも構いません。お好きな方法でご連絡ください。",
  },
];

export default function LandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-28 sm:px-6 sm:py-36">
        {/* Background organic decoration (subtle blurred shapes evoking natural forms) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-[45%_55%_60%_40%/50%_45%_55%_50%] bg-brand-navy/[0.07] blur-2xl sm:h-[36rem] sm:w-[36rem]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 left-[-6rem] h-72 w-72 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] bg-brand-accent/[0.10] blur-2xl"
        />
        {/* Thin line-art accent evoking a building's window/roofline */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="pointer-events-none absolute right-6 top-16 hidden h-40 w-40 text-brand-navy/20 sm:block lg:right-16 lg:h-56 lg:w-56"
        >
          <polyline points="10,120 100,40 190,120" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <line x1="100" y1="40" x2="100" y2="180" stroke="currentColor" strokeWidth="1.5" />
          <rect x="40" y="120" width="30" height="45" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <rect x="130" y="120" width="30" height="45" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        <div className="relative mx-auto max-w-3xl">
          <p className="font-serif text-sm tracking-[0.3em] text-brand-accent">
            不動産投資 × 信頼できる紹介
          </p>
          <h1 className="mt-6 font-serif text-4xl leading-[1.4] text-brand-navy sm:text-5xl">
            あなたに合った
            <br />
            不動産のプロを、
            <br />
            無料でご紹介します。
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-stone-600 sm:text-lg">
            審査済みの不動産営業・会社だけをご紹介する、無料マッチングサービスです。
            ログイン登録は不要。LINEでも、フォームでも、お気軽にご相談ください。
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href={siteConfig.lineAddFriendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full bg-[#06C755] px-8 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90 sm:w-auto"
            >
              LINEで相談する
            </a>
            <Link
              href="#contact"
              className="w-full rounded-full border border-brand-navy/30 px-8 py-3 text-center text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/5 sm:w-auto"
            >
              フォームで相談する
            </Link>
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-navy">
            不動産投資、誰に相談すればいいか分からない。
          </h2>
          <p className="mt-4 text-stone-600">
            情報はたくさんあるのに、どの営業・会社が信頼できるのか判断がつかない。
            そんな不安を感じたことはありませんか。
          </p>
        </div>
      </section>

      {/* Strengths */}
      <section className="bg-stone-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center font-serif text-2xl font-bold text-brand-navy">
            選ばれる3つの理由
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {strengths.map((item) => (
              <div key={item.title} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-brand-navy">{item.title}</h3>
                <p className="mt-2 text-sm text-stone-600">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center font-serif text-2xl font-bold text-brand-navy">
            ご利用の流れ
          </h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-4">
            {flowSteps.map((step, index) => (
              <li key={step.title} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 text-sm font-semibold text-brand-navy">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs text-stone-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About the company */}
      <section className="bg-stone-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-navy">
            運営会社について
          </h2>
          <p className="mt-4 text-sm text-stone-600">
            当サービスは、不動産投資に関心のある方と、審査済みの不動産営業・会社を
            つなぐマッチングサービスとして運営しています。
          </p>
          <Link
            href="/company"
            className="mt-6 inline-block rounded-full border border-brand-navy/30 px-6 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5"
          >
            会社概要を見る
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-center font-serif text-2xl font-bold text-brand-navy">
            よくある質問
          </h2>
          <div className="mt-10 space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q}>
                <p className="font-semibold text-brand-navy">Q. {faq.q}</p>
                <p className="mt-1 text-sm text-stone-600">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-stone-50 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="font-serif text-2xl font-bold text-brand-navy">無料相談を申し込む</h2>
          <p className="mt-3 text-sm text-stone-600">
            LINEでもフォームでも、お好きな方法でご相談ください。
          </p>
          <div className="mt-8">
            <a
              href={siteConfig.lineAddFriendUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-[#06C755] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              LINEで相談する
            </a>
          </div>
          <div className="my-8 flex items-center gap-4 text-xs text-stone-400">
            <span className="h-px flex-1 bg-stone-200" />
            または
            <span className="h-px flex-1 bg-stone-200" />
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
