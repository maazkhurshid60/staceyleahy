import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import { images } from "@/content/site";

const PATHS = [
  {
    key: "buy",
    label: "I'm buying",
    title: "Find it before the crowd.",
    href: "/buy",
    image: images.buy,
    points: ["Early access to Compass Private Exclusives", "Time to build the right offer", "Someone who has walked the house"],
  },
  {
    key: "sell",
    label: "I'm selling",
    title: "Sell faster, for more.",
    href: "/sell",
    image: images.sell,
    points: ["Compass Concierge: pay nothing until closing", "Test your price privately first", "Staging, painting and repairs handled"],
  },
];

/** Two tall arches; the one under the pointer opens wider and reveals what Stacey does. */
export default function TwoPaths() {
  return (
    <section aria-label="Buy or sell" className="bg-ivory py-28 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <Reveal as="p" variant="fade" className="eyebrow flex items-center gap-4 text-gold-600">
            <span className="block h-px w-12 bg-gold-500" />
            Where are you headed?
          </Reveal>
          <Reveal as="p" delay={100} className="max-w-md text-lg leading-relaxed text-ink-soft">
            Whichever side of the table you&apos;re on, you get the same full-time client relationship.
          </Reveal>
        </div>

        <div className="mt-14 flex flex-col gap-6 lg:h-[78vh] lg:min-h-[620px] lg:flex-row">
          {PATHS.map((p, i) => (
            <Reveal key={p.key} delay={i * 150} className="group relative flex-1 transition-[flex-grow] duration-700 ease-out-soft hover:flex-[1.45]">
              <Link href={p.href} className="arch-sm relative block h-[70vh] min-h-[480px] overflow-hidden text-ivory lg:h-full">
                <Image src={p.image.src} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover transition-[scale] duration-1000 ease-out-soft group-hover:scale-105" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_26_19/0.15)_0%,rgb(11_26_19/0.35)_45%,rgb(11_26_19/0.92)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
                  <p className="eyebrow text-gold-300">{p.label}</p>
                  <h2 className="mt-4 font-display text-5xl leading-none sm:text-6xl">{p.title}</h2>
                  <div className="mt-6 grid overflow-hidden text-ivory/85 transition-[grid-template-rows,opacity] duration-700 lg:grid-rows-[0fr] lg:opacity-0 lg:group-hover:grid-rows-[1fr] lg:group-hover:opacity-100">
                    <ul className="min-h-0 space-y-2">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-3">
                          <span className="size-1.5 rotate-45 bg-gold-400" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="mt-8 inline-flex items-center gap-4 text-sm font-semibold tracking-[0.16em] uppercase">
                    {p.key === "buy" ? "Start your search" : "Plan your sale"}
                    <span className="flex size-11 items-center justify-center rounded-full border border-gold-400 transition-all group-hover:bg-gold-400 group-hover:text-forest-950">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
