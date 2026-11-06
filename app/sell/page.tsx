import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import ValuationForm from "@/components/ValuationForm";
import ButtonLink from "@/components/ui/ButtonLink";
import { closingLabel, featuredClosings, images } from "@/content/site";

export const metadata: Metadata = {
  title: "Sell",
  description: "Sell your Los Angeles home with Stacey Leahy and Compass Concierge: staging, repairs and upgrades fronted with nothing due until closing.",
};

const CONCIERGE = [
  ["Smart", "Stacey helps you choose the improvements that deliver the greatest return on your investment."],
  ["Fast", "Designed for speed, so work can begin, and your home can sell, as quickly as possible."],
  ["Transparent", "Compass fronts the cost of services. Zero due until closing.*"],
  ["Easy", "Stacey is by your side, coordinating every vendor, from start to finish."],
];

const SERVICES = ["Staging", "Painting", "Flooring", "Floor repair", "Carpet", "Deep-cleaning", "Decluttering", "Landscaping", "Cosmetic renovations"];

const EXCLUSIVE = [
  ["Test your price without risk", "Get feedback from buyers on your aspirational price, without days on market or public price drops."],
  ["Soft launch before you're ready", "Market to buyers before investing time or money in preparing the home for the public."],
  ["Generate buzz", "Like a movie trailer, a Private Exclusive tells buyers something is coming, weeks or months ahead."],
  ["Launch twice", "First on Compass.com, then again when the listing goes live on the MLS and the big portals."],
  ["Keep it private", "Photos and floor plans are shared only with Compass agents and their qualified clients."],
];

export default function SellPage() {
  return (
    <>
      <PageHero
        eyebrow="Sell"
        crumbs={[{ label: "Sell" }]}
        title={
          <>
            Sell faster,
            <br />
            <em className="text-gold-300">for more.</em>
          </>
        }
        intro="Pricing strategy, preparation and marketing, handled. With Compass Concierge you pay nothing for improvements until closing."
        image={images.sell}
        imageAlt="Modern living room with a fireplace"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="#valuation">What&apos;s my home worth?</ButtonLink>
          <ButtonLink href="/behind-the-deal" variant="outline">
            See recent closings
          </ButtonLink>
        </div>
      </PageHero>

      {/* Concierge */}
      <section className="bg-ivory py-28 sm:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid items-end gap-10 lg:grid-cols-2">
            <div>
              <Reveal as="p" variant="fade" className="eyebrow flex items-center gap-4 text-gold-600">
                <span className="block h-px w-12 bg-gold-500" />
                Compass Concierge
              </Reveal>
              <Reveal as="h2" delay={100} className="mt-6 font-display text-5xl leading-[1.02] text-forest-900 sm:text-7xl">
                Improve now, <em className="text-gold-600">pay at closing.</em>
              </Reveal>
            </div>
            <Reveal as="p" delay={200} className="max-w-lg text-lg leading-relaxed text-ink-soft lg:justify-self-end">
              The hassle-free way to sell your home faster and for a higher price. Get fronted the cost of home
              improvement services, with zero due until closing.*
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <Reveal variant="wipe" className="arch-sm relative min-h-[420px] overflow-hidden lg:min-h-full">
              <Image src={images.interiorFireplace.src} alt="Staged living room with fireplace" fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
            </Reveal>
            <dl className="grid gap-px bg-forest-900/15 sm:grid-cols-2">
              {CONCIERGE.map(([title, body], i) => (
                <Reveal key={title} delay={i * 100} className="group bg-ivory p-8 transition-colors duration-500 hover:bg-forest-900 sm:p-10">
                  <dt className="flex items-baseline justify-between font-display text-4xl text-forest-900 transition-colors group-hover:text-gold-300">
                    {title}
                    <span className="text-lg text-gold-600 group-hover:text-gold-300">0{i + 1}</span>
                  </dt>
                  <dd className="mt-4 leading-relaxed text-ink-soft transition-colors group-hover:text-ivory/75">{body}</dd>
                </Reveal>
              ))}
            </dl>
          </div>

          <Reveal className="mt-14">
            <p className="eyebrow text-ink-soft">Covered services</p>
            <ul className="mt-5 flex flex-wrap gap-3">
              {SERVICES.map((s) => (
                <li key={s} className="arch-sm border border-forest-900/20 px-6 pt-3 pb-2.5 text-forest-800 transition-colors hover:border-gold-500 hover:bg-gold-500/10">
                  {s}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-ink-soft/80">*Compass Concierge is subject to terms and eligibility.</p>
          </Reveal>
        </div>
      </section>

      {/* Private Exclusives */}
      <section className="bg-sand py-28 sm:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal as="p" variant="fade" className="eyebrow text-gold-600">
              Compass Private Exclusives
            </Reveal>
            <Reveal as="h2" delay={100} className="mt-6 font-display text-5xl leading-[1.02] text-forest-900 sm:text-6xl">
              Who says you only get <em className="text-gold-600">one first impression?</em>
            </Reveal>
            <Reveal as="blockquote" delay={200} className="mt-10 border-l-2 border-gold-500 pl-6 font-display text-2xl leading-snug text-forest-900 italic">
              &ldquo;Another agent brought buyers to see the home and they submitted a full price, all cash offer within
              days.&rdquo;
              <footer className="mt-3 font-sans text-xs tracking-[0.16em] text-ink-soft not-italic uppercase">
                Compass agents, San Francisco Bay Area
              </footer>
            </Reveal>
          </div>
          <ol>
            {EXCLUSIVE.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 80} className="flex gap-8 border-b border-forest-900/15 py-9 first:pt-0">
                <span className="font-display text-3xl text-gold-600">0{i + 1}</span>
                <div>
                  <h3 className="font-display text-3xl text-forest-900">{title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-ink-soft">{body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Valuation */}
      <section id="valuation" className="relative isolate scroll-mt-24 overflow-hidden bg-forest-900 text-ivory">
        <Image src={images.valuation.src} alt="" fill sizes="100vw" className="-z-20 object-cover opacity-25" />
        <div className="absolute inset-0 -z-10 bg-linear-to-r from-forest-900 via-forest-900/95 to-forest-900/80" />
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[0.8fr_1.2fr] lg:px-14">
          <div>
            <Reveal as="p" variant="fade" className="eyebrow text-gold-300">
              Home valuation
            </Reveal>
            <Reveal as="h2" delay={100} className="mt-6 font-display text-5xl leading-[1.02] sm:text-7xl">
              What&apos;s your home <em className="text-gold-300">worth today?</em>
            </Reveal>
            <Reveal as="p" delay={200} className="mt-8 max-w-md text-lg leading-relaxed text-ivory/70">
              Online estimates miss renovations, character and the street you&apos;re on. Stacey prepares a personal
              Comparative Market Analysis based on what has actually sold nearby.
            </Reveal>
          </div>
          <Reveal delay={200} className="border border-ivory/15 bg-forest-950/50 p-8 backdrop-blur-sm sm:p-12">
            <ValuationForm />
          </Reveal>
        </div>
      </section>

      {/* Recent closings strip */}
      <section className="bg-ivory py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="flex items-end justify-between gap-6">
            <Reveal as="h2" className="font-display text-4xl text-forest-900 sm:text-5xl">
              Recently <em className="text-gold-600">closed.</em>
            </Reveal>
            <Link href="/behind-the-deal" className="text-sm font-semibold tracking-[0.16em] text-forest-900 uppercase hover:text-gold-600">
              All closings →
            </Link>
          </div>
          <ul className="no-scrollbar mt-10 flex snap-x gap-6 overflow-x-auto pb-2">
            {featuredClosings.map((c) => (
              <li key={c.slug} className="w-72 shrink-0 snap-start">
                <Link href={`/behind-the-deal/${c.slug}`} className="group block">
                  <div className="arch-sm relative aspect-[4/5] overflow-hidden">
                    <Image src={c.image.src} alt={c.name} fill sizes="288px" className="object-cover transition-[scale] duration-700 group-hover:scale-105" />
                  </div>
                  <p className="eyebrow mt-4 text-gold-600">{closingLabel(c)}</p>
                  <p className="mt-1 font-display text-2xl text-forest-900 group-hover:text-gold-600">{c.name}</p>
                  <p className="text-ink-soft">{c.price}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
