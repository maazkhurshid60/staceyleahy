"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Reveal from "../Reveal";
import { neighborhoods } from "@/content/site";

const number = new Intl.NumberFormat("en-US");

/** The Neighborhood Edit as a type index: hovering a name swaps the arched photo beside it. */
export default function NeighborhoodIndex() {
  const [active, setActive] = useState(0);

  return (
    <section id="neighborhoods" className="relative overflow-hidden bg-forest-900 py-28 text-ivory sm:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:px-14">
        <div>
          <Reveal as="p" variant="fade" className="eyebrow flex items-center gap-4 text-gold-300">
            <span className="font-display text-xl tracking-normal">02</span>
            <span className="block h-px w-10 bg-gold-400" />
            The Neighborhood Edit
          </Reveal>
          <Reveal as="p" delay={100} className="mt-6 max-w-lg text-lg leading-relaxed text-ivory/70">
            Six areas Stacey knows street by street. Choose one for its numbers, its favorite places and the homes on
            the market there now.
          </Reveal>

          <ol className="mt-14 border-t border-ivory/15">
            {neighborhoods.map((n, i) => (
              <Reveal as="li" key={n.slug} delay={i * 80} className="border-b border-ivory/15">
                <Link
                  href={`/neighborhoods/${n.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 sm:grid-cols-[4rem_1fr_auto] sm:py-7"
                >
                  <span className={`font-display text-xl transition-colors ${active === i ? "text-gold-300" : "text-ivory/40"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`font-display text-4xl leading-none transition-all duration-500 ease-out-soft sm:text-6xl xl:text-7xl ${
                      active === i ? "translate-x-3 text-ivory italic" : "text-ivory/55"
                    }`}
                  >
                    {n.name}
                  </span>
                  <span
                    className={`hidden text-right text-sm text-ivory/60 transition-opacity duration-500 sm:block ${active === i ? "opacity-100" : "opacity-0"}`}
                  >
                    {n.population && (
                      <>
                        {number.format(n.population)} residents
                        <br />
                      </>
                    )}
                    {n.walkScore != null && `Walk Score ${n.walkScore}`}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={200} className="mt-10">
            <Link href="/neighborhoods" className="group inline-flex items-center gap-4 text-sm font-semibold tracking-[0.16em] uppercase">
              Explore all neighborhoods
              <span className="flex size-11 items-center justify-center rounded-full border border-gold-500 transition-all group-hover:bg-gold-500 group-hover:text-forest-950">
                →
              </span>
            </Link>
          </Reveal>
        </div>

        {/* Sticky arched photo that follows the active name */}
        <div className="relative hidden lg:block">
          <div className="sticky top-28">
            <div className="relative aspect-[3/4] w-full">
              <span aria-hidden="true" className="arch absolute inset-0 translate-x-5 -translate-y-5 border border-gold-500/60" />
              <div className="arch relative h-full w-full overflow-hidden bg-forest-950">
                {neighborhoods.map((n, i) => (
                  <Image
                    key={n.slug}
                    src={n.image.src}
                    alt={i === active ? `${n.name} homes` : ""}
                    fill
                    sizes="32vw"
                    className={`object-cover transition-[opacity,scale] duration-1000 ease-out-soft ${
                      i === active ? "scale-100 opacity-100" : "scale-110 opacity-0"
                    }`}
                  />
                ))}
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-forest-950/90 to-transparent p-8 pt-24">
                  <p key={active} className="enter font-display text-lg leading-snug text-ivory/90 italic">
                    {neighborhoods[active].tagline}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
