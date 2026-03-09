export function Products() {
  const products = [
    { name: "Water Treatment", description: "Chemical solutions for purification" },
    { name: "Industrial Cleaners", description: "Heavy-duty cleaning agents" },
    { name: "Scale Inhibitors", description: "Prevent buildup in systems" },
  ];

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">Our Products</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {products.map((p) => (
            <div key={p.name} className="rounded-lg bg-slate-50 p-6">
              <h3 className="mb-2 text-xl font-bold text-slate-900">{p.name}</h3>
              <p className="text-slate-600">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
