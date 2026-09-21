import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import SimpleMarkdown from "@/components/SimpleMarkdown";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <Link href="/blog" className="text-sm text-stone-500 hover:text-brand-navy">
        ← ブログ一覧に戻る
      </Link>
      <p className="mt-6 text-xs text-stone-400">{post.date}</p>
      <h1 className="mt-2 text-2xl font-bold text-brand-navy">{post.title}</h1>
      <div className="mt-8">
        <SimpleMarkdown content={post.content} />
      </div>
    </article>
  );
}
