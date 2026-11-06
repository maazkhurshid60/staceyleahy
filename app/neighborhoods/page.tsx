import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { images, neighborhoods } from "@/content/site";

export const metadata: Metadata = {
  title: "Neighborhoods",
  description: "The Neighborhood Edit: Studio City, Burbank, Toluca Lake, the Westside, Los Angeles and Santa Clarita, with local stats, places and homes for sale.",
};

const number = new Intl.NumberFormat("en-US");
const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function NeighborhoodsPage() {
  return (
    <>
      <PageHero
        eyebrow="The Neighborhood Edit"
        crumbs={[{ label: "Neighborhoods" }]}
        title={
          <>
            Know the street,
            <br />
            <em className="text-gold-300">not just the ZIP.</em>
          </>
        }
        intro="Six areas Stacey knows street by street, from the Valley's walkable villages to the Westside and Santa Clarita."
        image={images.neighborhoodsWide}
        imageAlt="Hillside homes in the San Fernando Valley at golden hour"
      />

      <section className="bg-ivory py-24 sm:py-32">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <ul className="grid gap-x-10 gap-y-20 md:grid-cols-2">
            {neighborhoods.map((n, i) => (
              <Reveal as="li" key={n.slug} delay={(i % 2) * 150} className={i % 2 ? "md:mt-32" : ""}>
                <Link href={`/neighborhoods/${n.slug}`} className="group block">
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="text-outline absolute -top-14 -left-2 z-10 font-display text-[4.5rem] leading-none [--stroke:var(--color-gold-500)] sm:text-[6.5rem]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="arch-sm relative aspect-[4/5] overflow-hidden bg-sand">
                      <Image
                        src={n.image.src}
                        alt={`${n.name} homes`}
                        fill
                        sizes="(min-width: 768px) 45vw, 100vw"
                        className="object-cover transition-[scale] duration-1000 ease-out-soft group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-forest-950/80 via-transparent to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-8 text-ivory">
                        <h2 className="font-display text-5xl leading-none sm:text-6xl">{n.name}</h2>
                        <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-gold-400 transition-all duration-500 group-hover:rotate-[-45deg] group-hover:bg-gold-400 group-hover:text-forest-950">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-6 max-w-lg leading-relaxed text-ink-soft">{n.tagline}</p>
                  <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 border-t border-forest-900/15 pt-5">
                    {n.population && <Stat label="Residents" value={number.format(n.population)} />}
                    {n.avgIncome && <Stat label="Avg. income" value={usd.format(n.avgIncome)} />}
                    {n.walkScore != null && <Stat label="Walk Score" value={String(n.walkScore)} />}
                  </dl>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={<>Not sure where <em className="text-gold-300">you belong?</em></>} />
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow text-gold-600">{label}</dt>
      <dd className="mt-1 font-display text-2xl text-forest-900">{value}</dd>
    </div>
  );
}
