type Params = Promise<{ slug: string }>

export default async function NewsArticlePage(props: {
  params: Params
}) {
  const { slug } = await props.params
  
  return (
    <main>
      <article className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="mb-6 text-4xl font-bold text-slate-900">Article: {slug}</h1>
        <p className="text-slate-700">Full article content goes here.</p>
      </article>
    </main>
  );
}
