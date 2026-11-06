"use client";

import { useState } from "react";

/** Design-only sign-up: validates and confirms in place, nothing is sent. */
export default function NewsletterForm() {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p role="status" className="enter mt-8 font-display text-2xl text-gold-300 italic">
        Thank you. The next edition is on its way.
      </p>
    );
  }

  return (
    <form
      className="mt-8 flex max-w-md items-end gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label className="flex-1">
        <span className="sr-only">Email address</span>
        <input type="email" required placeholder="Your email address" autoComplete="email" className="field text-ivory" />
      </label>
      <button
        type="submit"
        className="shimmer border border-gold-500 px-6 py-3 text-xs font-semibold tracking-[0.18em] text-ivory uppercase transition-colors hover:bg-gold-500 hover:text-forest-950"
      >
        Subscribe
      </button>
    </form>
  );
}
