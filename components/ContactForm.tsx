"use client";

import { useState } from "react";

const INTERESTS = ["Buying", "Selling", "Both", "Leasing", "Just exploring"];

/** Contact form (design only: validates and confirms in place, nothing is sent). */
export default function ContactForm() {
  const [interest, setInterest] = useState("Buying");
  const [sent, setSent] = useState<string | null>(null);

  if (sent) {
    return (
      <div role="status" className="enter flex min-h-[28rem] flex-col items-start justify-center">
        <span className="flex size-20 items-center justify-center rounded-full border border-gold-500 font-display text-4xl text-gold-600">✓</span>
        <p className="mt-8 font-display text-5xl text-forest-900">Thank you, {sent}.</p>
        <p className="mt-4 max-w-md text-lg text-ink-soft">Your message is on its way. Stacey will be in touch personally.</p>
        <button type="button" onClick={() => setSent(null)} className="mt-8 text-sm tracking-[0.16em] text-forest-900 uppercase underline decoration-gold-500 underline-offset-8">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid gap-8 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        const name = String(new FormData(e.currentTarget).get("name") || "").split(" ")[0];
        setSent(name || "there");
      }}
    >
      <fieldset className="sm:col-span-2">
        <legend className="eyebrow text-gold-600">I&apos;m interested in</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {INTERESTS.map((i) => (
            <label
              key={i}
              className={`cursor-pointer px-5 py-2.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold-400 ${
                interest === i ? "bg-forest-900 text-ivory" : "border border-forest-900/20 text-forest-800 hover:border-gold-500"
              }`}
            >
              <input type="radio" name="interest" value={i} checked={interest === i} onChange={() => setInterest(i)} className="sr-only" />
              {i}
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        <span className="eyebrow text-gold-600">Full name</span>
        <input name="name" required autoComplete="name" className="field text-ink" />
      </label>
      <label>
        <span className="eyebrow text-gold-600">Phone</span>
        <input type="tel" autoComplete="tel" className="field text-ink" />
      </label>
      <label className="sm:col-span-2">
        <span className="eyebrow text-gold-600">Email</span>
        <input type="email" required autoComplete="email" className="field text-ink" />
      </label>
      <label className="sm:col-span-2">
        <span className="eyebrow text-gold-600">How can Stacey help?</span>
        <textarea rows={4} placeholder="Neighborhoods you love, timing, questions…" className="field resize-none text-ink" />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-6 sm:col-span-2">
        <p className="max-w-sm text-xs text-ink-soft">By sending, you agree to be contacted by Stacey Leahy about real estate. No spam, ever.</p>
        <button type="submit" className="btn-gold shimmer px-10 py-4 text-sm font-semibold tracking-[0.16em] uppercase">
          Send message →
        </button>
      </div>
    </form>
  );
}
