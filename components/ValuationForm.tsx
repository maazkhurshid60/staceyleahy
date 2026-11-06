"use client";

import { useState } from "react";

const STEPS = ["The home", "The details", "About you"];

/** Three-step home valuation request (design only: nothing is sent). */
export default function ValuationForm() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [address, setAddress] = useState("");

  if (done) {
    return (
      <div role="status" className="enter py-10 text-center">
        <span className="mx-auto flex size-20 items-center justify-center rounded-full border border-gold-400 font-display text-4xl text-gold-300">✓</span>
        <p className="mt-8 font-display text-4xl">Request received.</p>
        <p className="mx-auto mt-4 max-w-sm text-ivory/70">
          Stacey will be in touch personally to prepare a Comparative Market Analysis for {address || "your home"}.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (step < STEPS.length - 1) setStep(step + 1);
        else setDone(true);
      }}
    >
      {/* Progress */}
      <ol className="flex gap-3" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1">
            <span className={`block h-0.5 transition-colors duration-500 ${i <= step ? "bg-gold-400" : "bg-ivory/15"}`} />
            <span className={`mt-3 block text-xs tracking-[0.16em] uppercase ${i === step ? "text-gold-300" : "text-ivory/45"}`}>
              {String(i + 1).padStart(2, "0")} {s}
            </span>
          </li>
        ))}
      </ol>

      <div key={step} className="enter mt-10 grid gap-6 sm:grid-cols-2">
        {step === 0 && (
          <>
            <label className="sm:col-span-2">
              <span className="eyebrow text-gold-300">Property address</span>
              <input required value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, city, ZIP" autoComplete="street-address" className="field text-ivory" />
            </label>
            <label>
              <span className="eyebrow text-gold-300">Property type</span>
              <select required defaultValue="" className="field text-ivory [&>option]:text-ink">
                <option value="" disabled>
                  Choose one
                </option>
                <option>Single-family home</option>
                <option>Condo / townhome</option>
                <option>Multi-family</option>
                <option>Land</option>
              </select>
            </label>
            <label>
              <span className="eyebrow text-gold-300">Timeline</span>
              <select required defaultValue="" className="field text-ivory [&>option]:text-ink">
                <option value="" disabled>
                  When might you sell?
                </option>
                <option>Just curious</option>
                <option>Within 3 months</option>
                <option>3 to 12 months</option>
                <option>More than a year</option>
              </select>
            </label>
          </>
        )}
        {step === 1 && (
          <>
            {[
              ["Bedrooms", "3"],
              ["Bathrooms", "2"],
              ["Square feet", "1,800"],
              ["Year built", "1952"],
            ].map(([label, ph]) => (
              <label key={label}>
                <span className="eyebrow text-gold-300">{label}</span>
                <input inputMode="numeric" placeholder={ph} className="field text-ivory" />
              </label>
            ))}
            <label className="sm:col-span-2">
              <span className="eyebrow text-gold-300">Recent updates</span>
              <textarea rows={3} placeholder="New roof, remodeled kitchen, pool…" className="field resize-none text-ivory" />
            </label>
          </>
        )}
        {step === 2 && (
          <>
            <label>
              <span className="eyebrow text-gold-300">Full name</span>
              <input required autoComplete="name" className="field text-ivory" />
            </label>
            <label>
              <span className="eyebrow text-gold-300">Phone</span>
              <input type="tel" autoComplete="tel" className="field text-ivory" />
            </label>
            <label className="sm:col-span-2">
              <span className="eyebrow text-gold-300">Email</span>
              <input type="email" required autoComplete="email" className="field text-ivory" />
            </label>
          </>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button type="button" onClick={() => setStep(step - 1)} className="text-sm tracking-[0.16em] text-ivory/70 uppercase hover:text-gold-300">
            ← Back
          </button>
        ) : (
          <span />
        )}
        <button type="submit" className="btn-gold shimmer px-8 py-4 text-sm font-semibold tracking-[0.16em] uppercase">
          {step < STEPS.length - 1 ? "Continue →" : "Request my valuation"}
        </button>
      </div>
    </form>
  );
}
