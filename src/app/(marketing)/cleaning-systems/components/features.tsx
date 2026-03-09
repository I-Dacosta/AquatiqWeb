import { CheckCircle2 } from "lucide-react";

export function Features() {
  const features = [
    "Automated CIP systems",
    "Real-time monitoring",
    "Reduced water usage",
    "Energy efficient",
  ];

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">Key Features</h2>
        <ul className="mx-auto max-w-2xl space-y-4">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
              <span className="text-slate-700">{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
