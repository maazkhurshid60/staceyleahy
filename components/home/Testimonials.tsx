"use client";

import { useState } from "react";
import Reveal from "../Reveal";
import { testimonials } from "@/content/site";

/** Success stories: pick a client from the index, their words fill the page. */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index];

  return (
    <section aria-labelledby="stories-heading" className="relative overflow-hidden bg-forest-950 py-28 text-ivory sm:py-36">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 font-display text-[30rem] leading-none text-gold-500/[0.07] select-none"
      >
        &rdquo;
      </span>
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[0.42fr_1fr] lg:gap-20 lg:px-14">
        <div>
          <Reveal as="p" variant="fade" className="eyebrow flex items-center gap-4 text-gold-300">
            <span className="block h-px w-12 bg-gold-400" />
            Success Stories
          </Reveal>
          <h2 id="stories-heading" className="mt-6 font-display text-5xl leading-none sm:text-6xl">
            In their <em className="text-gold-300">words.</em>
          </h2>
          <ol className="mt-10 grid grid-cols-2 gap-x-6 border-t border-ivory/15 lg:grid-cols-1" role="tablist" aria-label="Clients">
            {testimonials.map((t, i) => (
              <li key={t.author} className="border-b border-ivory/15">
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  onClick={() => setIndex(i)}
                  className="group flex w-full items-center gap-4 py-4 text-left"
                >
                  <span className={`font-display text-lg transition-colors ${i === index ? "text-gold-300" : "text-ivory/35"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-sm tracking-[0.18em] uppercase transition-all duration-500 ${
                      i === index ? "translate-x-2 text-ivory" : "text-ivory/55 group-hover:text-ivory/80"
                    }`}
                  >
                    {t.author}
                  </span>
                  <span className={`ml-auto h-px bg-gold-400 transition-[width] duration-500 ${i === index ? "w-8" : "w-0"}`} />
                </button>
              </li>
            ))}
          </ol>
        </div>

        <figure className="flex min-h-[28rem] flex-col justify-center" aria-live="polite">
          <blockquote
            key={index}
            className={`enter font-display leading-[1.25] text-ivory/95 ${
              current.quote.length > 500
                ? "text-xl sm:text-[1.55rem]"
                : current.quote.length > 250
                  ? "text-2xl sm:text-[1.8rem]"
                  : "text-2xl sm:text-[2.1rem]"
            }`}
          >
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <figcaption key={`by-${index}`} className="enter mt-10 flex items-center gap-4 text-sm tracking-[0.2em] text-gold-300 uppercase [--d:150ms]">
            <span className="h-px w-12 bg-gold-400" />
            {current.author}, client of Stacey Leahy
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
