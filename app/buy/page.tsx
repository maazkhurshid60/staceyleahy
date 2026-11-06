import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import ListingsBrowser from "@/components/ListingsBrowser";
import ButtonLink from "@/components/ui/ButtonLink";
import { images, listings } from "@/content/site";

export const metadata: Metadata = {
  title: "Buy",
  description: "Buy a home in Los Angeles with Stacey Leahy: early access to Compass Private Exclusives, in-person tours and a negotiator who wins bidding wars.",
};

const STEPS = [
  ["A strategy conversation", "What you need, what you can live without, and how the market you're shopping in actually behaves."],
  ["Private and public inventory", "Compass Private Exclusives alongside everything on the MLS, so you see homes before the crowd does."],
  ["Tours in person", "Stacey walks new listings every week. She'll tell you what the photos leave out."],
  ["The offer", "Priced with intent, written to win. Even through three bidding wars and 15 competing offers."],
  ["Keys, and everything after", "Movers, painters, landscapers: the Home Everything team stays on call after closing."],
];

const EXCLUSIVE = [
  ["First look", "Access privately listed homes before the rest of the competition sees them."],
  ["Time to think", "Fewer bidding wars, so you can prepare the offer that makes the most sense for you."],
  ["Privacy", "Your search stays between you and your agent until you're ready."],
];

export default function BuyPage() {
  return (
    <>
      <PageHero
        eyebrow="Buy"
        crumbs={[{ label: "Buy" }]}
        title={
          <>
            Find the home
            <br />
            <em className="text-gold-300">before the crowd.</em>
          </>
        }
        intro="In a market where sellers rule, the edge is access and preparation. Stacey brings both."
        image={images.buy}
        imageAlt="Modern single-story home with wood and stone siding"
      >
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="#on-the-market">Browse homes</ButtonLink>
          <ButtonLink href="/contact" variant="outline">
            Start a search with Stacey
          </ButtonLink>
        </div>
      </PageHero>

      {/* Process */}
      <section className="bg-ivory py-28 sm:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <Reveal as="p" variant="fade" className="eyebrow flex items-center gap-4 text-gold-600">
                <span className="block h-px w-12 bg-gold-500" />
                How buying with Stacey works
              </Reveal>
              <Reveal as="h2" delay={100} className="mt-6 font-display text-5xl leading-[1.02] text-forest-900 sm:text-6xl">
                Five steps, <em className="text-gold-600">one point of view.</em>
              </Reveal>
              <Reveal variant="wipe" delay={200} className="arch-sm relative mt-10 hidden aspect-[4/5] overflow-hidden lg:block">
                <Image src={images.interiorLiving.src} alt="Bright living room" fill sizes="34vw" className="object-cover" />
              </Reveal>
            </div>
            <ol>
              {STEPS.map(([title, body], i) => (
                <Reveal as="li" key={title} delay={i * 80} className="group grid grid-cols-[5rem_1fr] gap-6 border-b border-forest-900/15 py-10 first:pt-0 sm:grid-cols-[7rem_1fr]">
                  <span className="text-outline font-display text-7xl leading-none transition-colors duration-500 [--stroke:var(--color-gold-500)] group-hover:text-gold-400 sm:text-8xl">
                    {i + 1}
                  </span>
                  <div className="pt-2">
                    <h3 className="font-display text-3xl text-forest-900 sm:text-4xl">{title}</h3>
                    <p className="mt-3 max-w-lg text-lg leading-relaxed text-ink-soft">{body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Private Exclusives */}
      <section className="relative overflow-hidden bg-forest-900 py-28 text-ivory sm:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <Reveal as="p" variant="fade" className="eyebrow text-gold-300">
            Compass Private Exclusives
          </Reveal>
          <Reveal as="h2" delay={100} className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] sm:text-7xl">
            Some of the best homes are <em className="text-gold-300">never on Zillow.</em>
          </Reveal>
          <ul className="mt-16 grid gap-px bg-ivory/15 md:grid-cols-3">
            {EXCLUSIVE.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 120} className="bg-forest-900 p-10 transition-colors duration-500 hover:bg-forest-800">
                <span className="font-display text-2xl text-gold-300">0{i + 1}</span>
                <h3 className="mt-8 font-display text-4xl">{title}</h3>
                <p className="mt-4 leading-relaxed text-ivory/70">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* On the market */}
      <section id="on-the-market" className="scroll-mt-24 bg-sand py-28 sm:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Reveal as="p" variant="fade" className="eyebrow text-gold-600">
                On the market now
              </Reveal>
              <Reveal as="h2" delay={100} className="mt-4 font-display text-6xl leading-none text-forest-900 sm:text-7xl">
                Browse <em className="text-gold-600">homes.</em>
              </Reveal>
            </div>
            <Reveal as="p" delay={150} className="max-w-md text-ink-soft">
              Tap the heart to save a home to your account. For photos, disclosures or a private tour, ask Stacey.
            </Reveal>
          </div>
          <div className="mt-12">
            <ListingsBrowser listings={listings} />
          </div>
          <p className="mt-10 text-xs text-ink-soft/80">
            Listing information is deemed reliable but not guaranteed, and is subject to change or withdrawal. Most homes
            shown are listed by other brokerages.
          </p>
        </div>
      </section>

      <CtaBand title={<>Tell Stacey what <em className="text-gold-300">home means to you.</em></>} />
    </>
  );
}
