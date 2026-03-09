"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-2xl font-semibold text-red-600">Something went wrong</h1>
      <p className="mt-2 text-slate-700">{error.message}</p>
    </div>
  );
}
