"use client";

import { useMemo, useState } from "react";
import SaveHomeButton from "./SaveHomeButton";
import type { Listing } from "@/content/site";

const SORTS = {
  featured: { label: "Featured", fn: () => 0 },
  "price-desc": { label: "Price: high to low", fn: (a: Listing, b: Listing) => price(b) - price(a) },
  "price-asc": { label: "Price: low to high", fn: (a: Listing, b: Listing) => price(a) - price(b) },
  "beds-desc": { label: "Most bedrooms", fn: (a: Listing, b: Listing) => Number(b.beds || 0) - Number(a.beds || 0) },
};
type SortKey = keyof typeof SORTS;

function price(l: Listing) {
  return Number(l.price.replace(/[^0-9.]/g, "")) || 0;
}

const sqftFmt = new Intl.NumberFormat("en-US");

/** Filterable grid of homes on the market (design only; data from the old site's listing cards). */
export default function ListingsBrowser({ listings }: { listings: Listing[] }) {
  const cities = useMemo(() => {
    const counts = new Map<string, number>();
    listings.forEach((l) => l.city && counts.set(l.city, (counts.get(l.city) ?? 0) + 1));
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([c]) => c);
  }, [listings]);

  const [city, setCity] = useState("All");
  const [status, setStatus] = useState("All");
  const [sort, setSort] = useState<SortKey>("featured");
  const [shown, setShown] = useState(12);

  const filtered = listings
    .filter((l) => (city === "All" || l.city === city) && (status === "All" || l.status === status))
    .sort(SORTS[sort].fn);

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-forest-900/15 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by city">
          {["All", ...cities].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={city === c}
              onClick={() => {
                setCity(c);
                setShown(12);
              }}
              className={`px-4 py-2 text-sm transition-colors ${
                city === c ? "bg-forest-900 text-ivory" : "border border-forest-900/20 text-forest-800 hover:border-gold-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm">
          <label className="flex items-center gap-3">
            <span className="eyebrow text-gold-600">Status</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="border-b border-forest-900/30 bg-transparent py-1 pr-6 focus:border-gold-500 focus:outline-none">
              {["All", "For Sale", "Pending", "Active Under Contract"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-3">
            <span className="eyebrow text-gold-600">Sort</span>
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="border-b border-forest-900/30 bg-transparent py-1 pr-6 focus:border-gold-500 focus:outline-none">
              {Object.entries(SORTS).map(([k, v]) => (
                <option key={k} value={k}>
                  {v.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "home" : "homes"}
      </p>

      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, shown).map((l, i) => (
          <li
            key={l.address}
            className="enter group relative flex flex-col justify-between bg-ivory p-7 shadow-[0_0_0_1px_rgb(15_34_25/0.1)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_0_1px_var(--color-gold-500),0_24px_40px_-28px_rgb(15_34_25/0.5)]"
            style={{ "--d": `${(i % 12) * 40}ms` } as React.CSSProperties}
          >
            <div className="flex items-start justify-between gap-4">
              <span
                className={`px-2.5 py-1 text-[0.68rem] font-semibold tracking-[0.16em] uppercase ${
                  l.status === "For Sale" ? "bg-forest-900 text-gold-300" : "bg-gold-400/25 text-forest-900"
                }`}
              >
                {l.status}
              </span>
              <SaveHomeButton id={l.address} label={l.name} className="text-forest-900" />
            </div>
            <div className="mt-10">
              <p className="font-display text-4xl text-forest-900">{l.price}</p>
              <p className="mt-3 font-display text-2xl leading-snug text-forest-900 transition-colors group-hover:text-gold-600">{l.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{l.address}</p>
            </div>
            <dl className="mt-8 grid grid-cols-3 border-t border-forest-900/10 pt-5 text-center">
              {[
                ["Beds", l.beds],
                ["Baths", l.baths],
                ["Sq. Ft.", l.sqft ? sqftFmt.format(Number(l.sqft)) : "—"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[0.68rem] tracking-[0.16em] text-ink-soft uppercase">{k}</dt>
                  <dd className="mt-1 font-display text-2xl text-forest-900">{v || "—"}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {shown < filtered.length && (
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => setShown((s) => s + 12)}
            className="shimmer border border-forest-900 px-10 py-4 text-sm font-semibold tracking-[0.16em] text-forest-900 uppercase transition-colors hover:bg-forest-900 hover:text-ivory"
          >
            Show more homes
          </button>
        </div>
      )}
    </div>
  );
}
