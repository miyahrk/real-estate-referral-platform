/**
 * Minimal Markdown renderer: supports only headings (#, ##) and paragraphs.
 * Swap in react-markdown or similar if richer syntax support is needed later.
 */
export default function SimpleMarkdown({ content }: { content: string }) {
  const blocks = content.trim().split(/\n\n+/);

  return (
    <div className="space-y-4 text-sm leading-relaxed text-stone-700">
      {blocks.map((block, index) => {
        if (block.startsWith("## ")) {
          return (
            <h2 key={index} className="pt-2 text-lg font-bold text-brand-navy">
              {block.replace(/^## /, "")}
            </h2>
          );
        }
        if (block.startsWith("# ")) {
          return (
            <h1 key={index} className="pt-2 text-xl font-bold text-brand-navy">
              {block.replace(/^# /, "")}
            </h1>
          );
        }
        return <p key={index}>{block}</p>;
      })}
    </div>
  );
}
