import Link from "next/link";

export default function NewsPage() {
  const articles = [
    { slug: "aquatiq-launches-analytics", title: "Aquatiq Launches Advanced Analytics Platform", date: "2024-12-15" },
    { slug: "sustainability-goals", title: "Achieving Water Sustainability Goals", date: "2024-12-08" },
    { slug: "global-partnership", title: "Partnership with Global Water Foundation", date: "2024-11-30" },
  ];

  return (
    <main>
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl">News</h1>
          <p className="max-w-2xl text-lg text-slate-700">
            Latest updates and insights from Aquatiq.
          </p>
        </div>
      </section>
      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.slug}
                href={`/news/${a.slug}`}
                className="rounded-lg border border-slate-200 p-6 transition-shadow hover:shadow-md"
              >
                <h3 className="mb-2 text-lg font-bold text-slate-900">{a.title}</h3>
                <p className="text-sm text-slate-500">{a.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
