"use client";

import { useState } from "react";

const fieldClass =
  "w-full rounded-xl border border-cream/15 bg-bg/60 px-4 py-3 text-cream placeholder-cream/35 outline-none transition focus:border-primary/70";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="rounded-2xl border border-cream/15 bg-ink p-10 text-center">
        <div className="font-display text-3xl text-cream">Slàinte — message received.</div>
        <p className="mt-4 text-cream/70">
          Thank you for writing to Iron Oak. We read every note ourselves and will reply within two
          working days.
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-7 font-mono text-xs uppercase tracking-[0.22em] text-primary hover:opacity-80"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="space-y-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-cream/55">
            Name
          </label>
          <input required name="name" type="text" placeholder="Your name" className={fieldClass} />
        </div>
        <div>
          <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-cream/55">
            Email
          </label>
          <input required name="email" type="email" placeholder="you@example.com" className={fieldClass} />
        </div>
      </div>
      <div>
        <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-cream/55">
          Subject
        </label>
        <input name="subject" type="text" placeholder="Tour, private cask, bottling…" className={fieldClass} />
      </div>
      <div>
        <label className="mb-2 block font-mono text-[11px] uppercase tracking-[0.2em] text-cream/55">
          Message
        </label>
        <textarea required name="message" rows={5} placeholder="Tell us what you have in mind." className={fieldClass} />
      </div>
      <button
        type="submit"
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-cream px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ink transition hover:brightness-95 sm:w-auto"
      >
        Send enquiry
      </button>
    </form>
  );
}
