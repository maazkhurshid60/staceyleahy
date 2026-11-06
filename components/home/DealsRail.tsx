"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { closingLabel, closings, featuredClosings } from "@/content/site";

/**
 * Behind the Deal: on large screens the section pins and vertical scrolling slides the
 * closings sideways; on smaller screens it is a native swipe rail.
 */
export default function DealsRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const desktop = matchMedia("(min-width: 1024px)");
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let overflow = 0;
    let frame = 0;

    const measure = () => {
      if (!desktop.matches || reduced.matches) {
        section.style.height = "";
        track.style.transform = "";
        return;
      }
      overflow = Math.max(0, track.scrollWidth - window.innerWidth);
      section.style.height = `${window.innerHeight + overflow}px`;
      update();
    };
    const update = () => {
      if (!desktop.matches || reduced.matches) return;
      const top = section.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, -top / Math.max(1, overflow)));
      track.style.transform = `translate3d(${-progress * overflow}px,0,0)`;
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    desktop.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      desktop.removeEventListener("change", measure);
    };
  }, []);

  return (
    <section ref={sectionRef} id="behind-the-deal" aria-label="Behind the Deal" className="relative bg-sand">
      <div className="lg:sticky lg:top-0 lg:flex lg:h-svh lg:flex-col lg:justify-center lg:overflow-hidden">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 py-24 will-change-transform sm:px-8 lg:snap-none lg:gap-10 lg:overflow-visible lg:px-14 lg:py-0"
        >
          {/* Intro panel */}
          <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[34vw] lg:pr-6">
            <p className="eyebrow flex items-center gap-4 text-gold-600">
              <span className="font-display text-xl tracking-normal">01</span>
              <span className="block h-px w-10 bg-gold-500" />
              Behind the Deal
            </p>
            <h2 className="mt-6 font-display text-6xl leading-[0.98] text-forest-900 lg:text-[4rem]">
              Real strategies.
              <br />
              <em className="text-gold-600">Actual results.</em>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-ink-soft">
              Pricing, staging, negotiation and timing. Scroll through a few of the homes Stacey has recently closed.
            </p>
            <Link
              href="/behind-the-deal"
              className="group mt-10 inline-flex items-center gap-4 text-sm font-semibold tracking-[0.16em] text-forest-900 uppercase"
            >
              All {closings.length} closings
              <span className="flex size-11 items-center justify-center rounded-full border border-gold-500 transition-all group-hover:bg-gold-500">
                →
              </span>
            </Link>
          </div>

          {featuredClosings.map((c, i) => (
            <Link
              key={c.slug}
              href={`/behind-the-deal/${c.slug}`}
              className={`group w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[25vw] ${i % 2 ? "lg:mt-24" : ""}`}
            >
              <div className="arch-sm relative aspect-[3/4] overflow-hidden bg-ivory lg:aspect-auto lg:h-[56vh]">
                <Image
                  src={c.image.src}
                  alt={c.name}
                  fill
                  sizes="(min-width: 1024px) 26vw, 80vw"
                  className="object-cover transition-[scale] duration-1000 ease-out-soft group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-forest-950/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="absolute bottom-5 left-5 translate-y-3 text-sm font-semibold tracking-[0.16em] text-ivory uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  The story →
                </span>
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <p className="eyebrow text-gold-600">{closingLabel(c)}</p>
                <span className="font-display text-xl text-forest-900/40">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="mt-2 font-display text-3xl leading-tight text-forest-900 transition-colors group-hover:text-gold-600">{c.name}</h3>
              <p className="mt-1 text-ink-soft">
                {c.area} · <span className="text-forest-900">{c.price}</span>
              </p>
            </Link>
          ))}

          {/* End card */}
          <Link
            href="/behind-the-deal"
            className="group flex w-[60vw] shrink-0 snap-start flex-col items-center justify-center gap-6 text-center sm:w-[36vw] lg:w-[22vw]"
          >
            <span className="flex size-36 items-center justify-center rounded-full border border-gold-500 font-display text-5xl text-forest-900 transition-all duration-500 group-hover:scale-105 group-hover:bg-forest-900 group-hover:text-gold-300">
              →
            </span>
            <span className="font-display text-3xl text-forest-900">
              See every
              <br />
              closing
            </span>
          </Link>
        </div>

        {/* Scroll progress (desktop) */}
        <div className="mx-14 mt-12 hidden h-px bg-forest-900/15 lg:block" aria-hidden="true">
          <span ref={progressRef} className="block h-px origin-left scale-x-0 bg-gold-500" />
        </div>
      </div>
    </section>
  );
}
