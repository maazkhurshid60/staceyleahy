"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { closingLabel, type Closing } from "@/content/site";

const FILTERS = ["All", "Sold", "Leased"] as const;

/** Every closing, filterable by outcome, in a staggered arched grid. */
export default function ClosingsGrid({ closings }: { closings: Closing[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const shown = closings.filter((c) => filter === "All" || c.status === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-forest-900/15 pb-6">
        <div className="flex gap-2" role="group" aria-label="Filter closings">
          {FILTERS.map((f) => {
            const count = f === "All" ? closings.length : closings.filter((c) => c.status === f).length;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className={`px-5 py-2.5 text-sm tracking-[0.12em] uppercase transition-colors ${
                  filter === f ? "bg-forest-900 text-ivory" : "border border-forest-900/20 text-forest-800 hover:border-gold-500"
                }`}
              >
                {f} <span className="ml-1 opacity-60">{count}</span>
              </button>
            );
          })}
        </div>
        <p className="text-sm text-ink-soft" aria-live="polite">
          Showing {shown.length} of {closings.length}
        </p>
      </div>

      <ul className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c, i) => (
          <li key={c.slug} className={`enter ${i % 3 === 1 ? "lg:mt-20" : ""}`} style={{ "--d": `${(i % 6) * 70}ms` } as React.CSSProperties}>
            <Link href={`/behind-the-deal/${c.slug}`} className="group block">
              <div className="arch-sm relative aspect-[4/5] overflow-hidden bg-sand">
                <Image
                  src={c.image.src}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-[scale] duration-1000 ease-out-soft group-hover:scale-105"
                />
                {c.gallery.length > 1 && (
                  <span className="absolute right-4 bottom-4 bg-forest-950/80 px-3 py-1.5 text-[0.68rem] tracking-[0.16em] text-ivory uppercase backdrop-blur">
                    {c.gallery.length} photos
                  </span>
                )}
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <p className="eyebrow text-gold-600">{closingLabel(c)}</p>
                <p className="text-sm text-ink-soft">{c.area}</p>
              </div>
              <h2 className="mt-2 font-display text-3xl leading-tight text-forest-900 transition-colors group-hover:text-gold-600">{c.name}</h2>
              <p className="mt-1 font-display text-xl text-forest-900/70">{c.price}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
