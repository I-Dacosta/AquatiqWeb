import { ContactForm } from "./components/contact-form";

export default function ContactPage() {
  return (
    <main>
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-slate-900 sm:text-5xl">Get In Touch</h1>
          <p className="text-lg text-slate-700">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </section>
      <ContactForm />
    </main>
  );
}
