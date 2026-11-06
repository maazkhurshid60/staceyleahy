import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import SaveHomeButton from "@/components/SaveHomeButton";
import CountUp from "@/components/ui/CountUp";
import ScoreRing from "@/components/ui/ScoreRing";
import { getNeighborhood, neighborhoods } from "@/content/site";

export function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/neighborhoods/[slug]">): Promise<Metadata> {
  const n = getNeighborhood((await params).slug);
  return n ? { title: n.name, description: n.tagline } : {};
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function NeighborhoodPage({ params }: PageProps<"/neighborhoods/[slug]">) {
  const n = getNeighborhood((await params).slug);
  if (!n) notFound();
  const index = neighborhoods.indexOf(n);
  const next = neighborhoods[(index + 1) % neighborhoods.length];

  const categories = [...new Set(n.places.map((p) => p.category.split(" · ")[0]))];
  const families = n.withChildren && n.withoutChildren ? Math.round((n.withChildren / (n.withChildren + n.withoutChildren)) * 100) : null;
  const scores = [
    n.walkScore != null && { label: "Walk Score", score: n.walkScore, rating: n.walkRating },
    n.bikeScore != null && { label: "Bike Score", score: n.bikeScore, rating: n.bikeRating },
    n.transitScore != null && { label: "Transit Score", score: n.transitScore, rating: n.transitRating },
  ].filter(Boolean) as { label: string; score: number; rating: string }[];

  return (
    <>
      {/* Full-bleed opening */}
      <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden bg-forest-950 text-ivory">
        <Image src={n.image.src} alt={`${n.name} homes`} fill priority sizes="100vw" className="ken-burns -z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_26_19/0.75)_0%,rgb(11_26_19/0.3)_35%,rgb(11_26_19/0.45)_60%,rgb(11_26_19/0.92)_100%)]" />
        <div className="mx-auto w-full max-w-[1440px] px-5 pt-40 pb-16 sm:px-8 lg:px-14 lg:pb-24">
          <nav aria-label="Breadcrumb" className="enter text-xs tracking-[0.18em] text-ivory/60 uppercase" style={d(100)}>
            <Link href="/" className="hover:text-gold-300">Home</Link>
            <span className="mx-2 text-gold-400">/</span>
            <Link href="/neighborhoods" className="hover:text-gold-300">Neighborhoods</Link>
            <span className="mx-2 text-gold-400">/</span>
            <span className="text-ivory/85">{n.name}</span>
          </nav>
          <p className="eyebrow enter mt-10 text-gold-300" style={d(200)}>
            The Neighborhood Edit · {String(index + 1).padStart(2, "0")}
          </p>
          <h1 className="enter mt-4 font-display text-6xl leading-[0.92] sm:text-8xl lg:text-[6.5rem]" style={d(300)}>
            {n.name}
          </h1>
          <p className="enter mt-8 max-w-2xl text-lg leading-relaxed text-ivory/80 sm:text-xl" style={d(450)}>
            {n.tagline}
          </p>
        </div>
      </section>

      {/* Key numbers */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <Reveal as="h2" className="font-display text-4xl text-forest-900 sm:text-5xl">
            {n.name} <em className="text-gold-600">by the numbers</em>
          </Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-px bg-forest-900/15 lg:grid-cols-4">
            {[
              n.population && { label: "Residents", node: <CountUp value={n.population} /> },
              n.medianAge && { label: "Median age", node: <CountUp value={n.medianAge} decimals={1} /> },
              n.avgIncome && { label: "Avg. individual income", node: <CountUp value={n.avgIncome} prefix="$" /> },
              families != null && { label: "Households with children", node: <CountUp value={families} suffix="%" /> },
            ]
              .filter(Boolean)
              .map((s, i) => {
                const stat = s as { label: string; node: React.ReactNode };
                return (
                  <Reveal key={stat.label} delay={i * 100} className="bg-ivory p-8 sm:p-10">
                    <dt className="eyebrow text-gold-600">{stat.label}</dt>
                    <dd className="mt-4 font-display text-4xl text-forest-900 sm:text-6xl">{stat.node}</dd>
                  </Reveal>
                );
              })}
          </dl>

          <div className="mt-20 grid gap-16 lg:grid-cols-2">
            <Bars title="Age" rows={n.ages} />
            <Bars title="Daily commute" rows={n.commute} />
          </div>
          <p className="mt-10 text-xs text-ink-soft/80">Source: U.S. Census Bureau estimates, as published on staceyleahyhomes.com.</p>
        </div>
      </section>

      {/* Getting around */}
      {scores.length > 0 && (
        <section className="bg-forest-900 py-24 text-ivory sm:py-32">
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:px-14">
            <div>
              <Reveal as="p" variant="fade" className="eyebrow text-gold-300">
                Getting around
              </Reveal>
              <Reveal as="h2" delay={100} className="mt-6 font-display text-5xl leading-[1.02] sm:text-6xl">
                Life on foot, <em className="text-gold-300">bike and train.</em>
              </Reveal>
            </div>
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3">
              {scores.map((s) => (
                <ScoreRing key={s.label} {...s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Places */}
      {n.places.length > 0 && (
        <section className="bg-sand py-24 sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <Reveal as="h2" className="font-display text-5xl leading-none text-forest-900 sm:text-6xl">
              Local <em className="text-gold-600">favorites.</em>
            </Reveal>
            <div className="mt-14 grid gap-14 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((cat, ci) => (
                <Reveal key={cat} delay={ci * 100}>
                  <h3 className="eyebrow border-b border-forest-900 pb-3 text-forest-900">{cat}</h3>
                  <ul>
                    {n.places
                      .filter((p) => p.category.startsWith(cat))
                      .slice(0, 8)
                      .map((p) => (
                        <li key={p.name} className="flex items-baseline justify-between gap-4 border-b border-forest-900/10 py-3">
                          <span className="font-display text-xl text-forest-900">{p.name}</span>
                          <span className="shrink-0 text-sm text-ink-soft">
                            {p.rating ? <span className="text-gold-600">★ {p.rating}</span> : null}
                            {p.miles != null && <span className="ml-3">{p.miles} mi</span>}
                          </span>
                        </li>
                      ))}
                  </ul>
                </Reveal>
              ))}
            </div>
            <p className="mt-10 text-xs text-ink-soft/80">Ratings and distances from Yelp, as published on staceyleahyhomes.com.</p>
          </div>
        </section>
      )}

      {/* Homes here */}
      {n.listings.length > 0 && (
        <section className="bg-ivory py-24 sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <Reveal as="h2" className="font-display text-5xl leading-none text-forest-900 sm:text-6xl">
                On the market in <em className="text-gold-600">{n.name}.</em>
              </Reveal>
              <Link href="/buy#on-the-market" className="text-sm font-semibold tracking-[0.16em] text-forest-900 uppercase hover:text-gold-600">
                All homes →
              </Link>
            </div>
            <ul className="mt-12 grid gap-px bg-forest-900/15 sm:grid-cols-2 lg:grid-cols-3">
              {n.listings.map((l, i) => (
                <Reveal as="li" key={l.address} delay={(i % 3) * 90} className="group flex flex-col justify-between gap-8 bg-ivory p-8 transition-colors hover:bg-sand">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-4xl text-forest-900">{l.price}</p>
                      <p className="mt-2 text-ink-soft">{l.address}</p>
                    </div>
                    <SaveHomeButton id={l.address} label={l.name || l.address} className="text-forest-900" />
                  </div>
                  <p className="text-sm tracking-[0.14em] text-forest-900 uppercase">
                    {[l.beds && `${l.beds} bd`, l.baths && `${l.baths} ba`, l.sqft && `${Number(l.sqft).toLocaleString("en-US")} sq ft`]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Next neighborhood */}
      <Link href={`/neighborhoods/${next.slug}`} className="group relative isolate block overflow-hidden bg-forest-950 text-ivory">
        <Image src={next.image.src} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-35 transition-[opacity,scale] duration-1000 group-hover:scale-105 group-hover:opacity-50" />
        <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-20 sm:px-8 lg:px-14">
          <div>
            <p className="eyebrow text-gold-300">Next neighborhood</p>
            <p className="mt-3 font-display text-5xl sm:text-7xl">{next.name}</p>
          </div>
          <span className="flex size-20 shrink-0 items-center justify-center rounded-full border border-gold-400 text-2xl transition-all group-hover:bg-gold-400 group-hover:text-forest-950">
            →
          </span>
        </div>
      </Link>

      <CtaBand title={<>Thinking about <em className="text-gold-300">{n.name}?</em></>} />
    </>
  );
}

function Bars({ title, rows }: { title: string; rows: { label: string; value: number | null }[] }) {
  const max = Math.max(...rows.map((r) => r.value ?? 0), 1);
  return (
    <Reveal>
      <h3 className="eyebrow border-b border-forest-900 pb-3 text-forest-900">{title}</h3>
      <ul className="mt-6 space-y-4">
        {rows.map((r, i) => (
          <li key={r.label} className="grid grid-cols-[7rem_1fr_3.5rem] items-center gap-4 text-sm">
            <span className="text-ink-soft">{r.label.replace(" to ", "–").replace(" Minutes", " min")}</span>
            <span className="block h-2 bg-forest-900/10">
              <span className="block h-full" style={{ width: `${((r.value ?? 0) / max) * 100}%` }}>
                <Reveal as="span" variant="line" delay={i * 80} className="block h-full bg-gold-500" />
              </span>
            </span>
            <span className="text-right font-display text-xl text-forest-900">{r.value ?? "—"}%</span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
