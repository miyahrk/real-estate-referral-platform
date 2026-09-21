const linkGroups = [
  {
    heading: "公的機関・統計",
    links: [
      { label: "国土交通省 不動産情報ライブラリ", href: "https://www.reinfolib.mlit.go.jp/" },
      { label: "国税庁 タックスアンサー（不動産関連）", href: "https://www.nta.go.jp/" },
    ],
  },
  {
    heading: "業界団体",
    links: [
      { label: "不動産流通経営協会", href: "https://www.frk.or.jp/" },
    ],
  },
];

export default function LinksPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-center text-2xl font-bold text-brand-navy">参考リンク</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-sm text-stone-600">
        不動産投資を検討するうえで参考になる、外部の公的機関・資料へのリンク集です。
      </p>

      <div className="mt-12 space-y-10">
        {linkGroups.map((group) => (
          <div key={group.heading}>
            <h2 className="font-semibold text-brand-navy">{group.heading}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-navy underline underline-offset-2 hover:text-brand-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
