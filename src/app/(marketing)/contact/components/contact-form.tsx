"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", company: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {submitted && (
          <div className="mb-6 rounded-lg bg-green-50 p-4 text-green-800">
            Thank you! We'll get back to you soon.
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-900">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2"
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-900">
              Company
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-900">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="mt-1 w-full rounded-lg border border-slate-300 px-4 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
