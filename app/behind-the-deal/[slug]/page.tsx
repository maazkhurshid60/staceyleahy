import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import { WatchButton } from "@/components/VideoPlayer";
import type { HeroVideo } from "@/content/site";
import { closingLabel, closings, getClosing } from "@/content/site";

// Video tours that exist for a few of these homes
const TOURS: Record<string, HeroVideo> = {
  "634-s-citrus-avenue-los-angeles-ca-us-90036-bb25112409": { kind: "youtube", id: "_BGTtnMQqLM", title: "634 S Citrus Avenue: interior tour" },
  "302-n-lima-street-burbank-ca-us-91505-sr24104193": { kind: "youtube", id: "nrYOj4mMbaQ", title: "302 North Lima Street, Burbank: home tour" },
};

export function generateStaticParams() {
  return closings.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/behind-the-deal/[slug]">): Promise<Metadata> {
  const c = getClosing((await params).slug);
  return c ? { title: `${c.name}, ${c.area}`, description: c.summary } : {};
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function ClosingPage({ params }: PageProps<"/behind-the-deal/[slug]">) {
  const c = getClosing((await params).slug);
  if (!c) notFound();
  const tour = TOURS[c.slug];
  const others = closings.filter((o) => o.slug !== c.slug && o.gallery.length > 0).slice(0, 3);

  return (
    <>
      {/* Opening: arched cover photo beside the headline facts */}
      <section className="relative isolate overflow-hidden bg-forest-900 text-ivory">
        <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pt-36 pb-20 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20 lg:px-14 lg:pt-44 lg:pb-28">
          <div>
            <nav aria-label="Breadcrumb" className="enter text-xs tracking-[0.18em] text-ivory/55 uppercase" style={d(100)}>
              <Link href="/" className="hover:text-gold-300">Home</Link>
              <span className="mx-2 text-gold-400">/</span>
              <Link href="/behind-the-deal" className="hover:text-gold-300">Behind the Deal</Link>
            </nav>
            <p className="eyebrow enter mt-10 text-gold-300" style={d(200)}>
              {closingLabel(c)} · {c.area}
            </p>
            <h1 className="enter mt-5 font-display text-6xl leading-[0.95] sm:text-7xl xl:text-8xl" style={d(300)}>
              {c.name}
            </h1>
            <p className="enter mt-6 font-display text-4xl text-gold-300" style={d(400)}>
              {c.price}
            </p>
            {c.status === "Sold" && c.listPrice && c.listPrice !== c.price && (
              <p className="enter mt-2 text-sm text-ivory/60" style={d(450)}>
                Listed at {c.listPrice}
              </p>
            )}
            <dl className="enter mt-10 grid max-w-md grid-cols-3 border-t border-ivory/15 pt-6" style={d(500)}>
              {[
                ["Bedrooms", c.beds],
                ["Sq. Ft.", c.sqft],
                [c.status === "Leased" ? "Leased" : "Closed", c.year],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs tracking-[0.16em] text-ivory/55 uppercase">{k}</dt>
                  <dd className="mt-1 font-display text-3xl">{v || "—"}</dd>
                </div>
              ))}
            </dl>
            {tour && (
              <div className="enter mt-10" style={d(600)}>
                <WatchButton video={tour} label="Watch the tour" />
              </div>
            )}
          </div>
          <div className="enter-card relative mx-auto aspect-[4/5] w-full max-w-lg" style={d(300)}>
            <span aria-hidden="true" className="arch absolute inset-0 translate-x-5 -translate-y-5 border border-gold-500/60" />
            <div className="arch relative h-full w-full overflow-hidden">
              <Image src={c.image.src} alt={c.name} fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="ken-burns object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Story + facts */}
      <section className="bg-ivory py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24 lg:px-14">
          <div>
            <Reveal as="p" variant="fade" className="eyebrow text-gold-600">
              The home
            </Reveal>
            {c.description ? (
              <Reveal as="p" delay={100} className="mt-6 font-display text-3xl leading-[1.35] text-forest-900 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[5.5rem] first-letter:leading-[0.8] first-letter:text-gold-600 sm:text-[2.1rem]">
                {c.description}
              </Reveal>
            ) : (
              <Reveal as="p" delay={100} className="mt-6 font-display text-3xl leading-snug text-forest-900">
                {c.status} by Stacey Leahy in {c.area}.
              </Reveal>
            )}
          </div>
          {c.facts.length > 0 && (
            <Reveal delay={150} className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="eyebrow border-b border-forest-900 pb-3 text-forest-900">Property facts</h2>
              <dl>
                {c.facts.map((f) => (
                  <div key={f.label} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-forest-900/10 py-3 text-sm">
                    <dt className="text-ink-soft">{f.label}</dt>
                    <dd className="text-forest-900">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          )}
        </div>
      </section>

      {c.gallery.length > 1 && (
        <section className="bg-sand py-24 sm:py-32">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
            <Reveal as="h2" className="mb-10 font-display text-5xl text-forest-900">
              Inside <em className="text-gold-600">{c.name}</em>
            </Reveal>
            <Gallery photos={c.gallery} name={c.name} />
          </div>
        </section>
      )}

      {/* More closings */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="flex items-end justify-between gap-6">
            <Reveal as="h2" className="font-display text-4xl text-forest-900 sm:text-5xl">
              More <em className="text-gold-600">closings.</em>
            </Reveal>
            <Link href="/behind-the-deal" className="text-sm font-semibold tracking-[0.16em] text-forest-900 uppercase hover:text-gold-600">
              View all →
            </Link>
          </div>
          <ul className="mt-10 grid gap-8 sm:grid-cols-3">
            {others.map((o, i) => (
              <Reveal as="li" key={o.slug} delay={i * 100}>
                <Link href={`/behind-the-deal/${o.slug}`} className="group block">
                  <div className="arch-sm relative aspect-[4/5] overflow-hidden">
                    <Image src={o.image.src} alt={o.name} fill sizes="(min-width: 640px) 30vw, 90vw" className="object-cover transition-[scale] duration-700 group-hover:scale-105" />
                  </div>
                  <p className="eyebrow mt-4 text-gold-600">{closingLabel(o)}</p>
                  <p className="mt-1 font-display text-2xl text-forest-900 group-hover:text-gold-600">{o.name}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={<>Thinking of selling in <em className="text-gold-300">{c.area}?</em></>} />
    </>
  );
}
