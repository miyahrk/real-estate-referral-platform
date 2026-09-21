import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogListPage() {
  const posts = getAllPosts();

  return (
    <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <h1 className="text-center text-2xl font-bold text-brand-navy">ブログ</h1>
      <p className="mx-auto mt-4 max-w-xl text-center text-sm text-stone-600">
        不動産投資に関する情報を発信しています。
      </p>

      <div className="mt-12 space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-lg border border-stone-200 p-6 transition hover:border-brand-navy"
          >
            <p className="text-xs text-stone-400">{post.date}</p>
            <h2 className="mt-1 font-semibold text-brand-navy">{post.title}</h2>
            <p className="mt-2 text-sm text-stone-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
