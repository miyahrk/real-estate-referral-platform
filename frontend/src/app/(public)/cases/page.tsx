const dummyCases = [
  {
    title: "都内ワンルームマンション投資のご紹介事例",
    summary: "資産形成を目的にご相談いただき、審査済みの提携会社をご紹介しました。",
  },
  {
    title: "地方エリアの一棟アパート投資のご紹介事例",
    summary: "節税を目的にご相談いただき、エリアに強い提携会社をご紹介しました。",
  },
];

export default function CasesPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <h1 className="text-center text-2xl font-bold text-brand-navy">事例紹介</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-sm text-stone-600">
        ※ 現在準備中です。掲載できる事例が整い次第、順次公開してまいります。
        以下はサイト構成確認用のダミー表示です。
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {dummyCases.map((item) => (
          <div key={item.title} className="rounded-lg border border-stone-200 p-6">
            <h2 className="font-semibold text-brand-navy">{item.title}</h2>
            <p className="mt-2 text-sm text-stone-600">{item.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
