import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import ClosingsGrid from "@/components/ClosingsGrid";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/ui/CountUp";
import { closings } from "@/content/site";

export const metadata: Metadata = {
  title: "Behind the Deal",
  description: "Homes Stacey Leahy has sold and leased across Los Angeles, from Burbank and Toluca Lake to Hancock Park and the Valley.",
};

export default function BehindTheDealPage() {
  const sold = closings.filter((c) => c.status === "Sold");
  const leased = closings.filter((c) => c.status === "Leased");
  const areas = new Set(closings.map((c) => c.area)).size;

  return (
    <>
      <PageHero
        eyebrow="Behind the Deal"
        crumbs={[{ label: "Behind the Deal" }]}
        title={
          <>
            Real strategies.
            <br />
            <em className="text-gold-300">Actual results.</em>
          </>
        }
        intro="Every home here had a plan behind it: the price, the preparation, the timing and the negotiation."
        image={closings[0].image}
        imageAlt={closings[0].name}
      />

      <section className="border-b border-forest-900/10 bg-ivory">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-3 divide-x divide-forest-900/10 px-5 sm:px-8 lg:px-14">
          {[
            ["Homes sold", sold.length],
            ["Homes leased", leased.length],
            ["Communities", areas],
          ].map(([label, value], i) => (
            <Reveal key={label} delay={i * 100} className="px-4 py-10 text-center sm:py-14">
              <dd className="font-display text-5xl text-forest-900 sm:text-7xl">
                <CountUp value={Number(value)} />
              </dd>
              <dt className="eyebrow mt-3 text-gold-600">{label}</dt>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <ClosingsGrid closings={closings} />
          <p className="mt-16 text-xs text-ink-soft/80">
            A selection of transactions from Stacey&apos;s previous website. Prices shown are sale or lease prices as
            published.
          </p>
        </div>
      </section>

      <CtaBand title={<>Your home could be <em className="text-gold-300">the next story.</em></>} />
    </>
  );
}
