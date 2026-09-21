const profile = [
  { label: "会社名", value: "準備中" },
  { label: "所在地", value: "準備中" },
  { label: "設立", value: "準備中" },
  { label: "代表者", value: "準備中" },
  { label: "資本金", value: "準備中" },
  { label: "事業内容", value: "不動産紹介マッチングサービスの運営" },
];

export default function CompanyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-center font-serif text-2xl font-bold text-brand-navy">
        会社概要
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-sm text-stone-600">
        当サービスは、不動産投資に関心のある方と、審査済みの不動産営業・会社をつなぐ
        マッチングサービスとして運営しています。
      </p>

      <dl className="mt-12 divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
        {profile.map((item) => (
          <div key={item.label} className="grid grid-cols-1 gap-1 px-6 py-4 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-semibold text-brand-navy">{item.label}</dt>
            <dd className="text-sm text-stone-600 sm:col-span-2">{item.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16">
        <h2 className="font-serif text-xl font-bold text-brand-navy">沿革</h2>
        <p className="mt-4 text-sm text-stone-600">
          準備中です。今後の歩みをこちらにまとめてまいります。
        </p>
      </div>
    </section>
  );
}
