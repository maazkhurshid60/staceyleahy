"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { agent, film, heroCards, images } from "@/content/site";
import { PlayIcon, useVideo } from "../VideoPlayer";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// Where each card sits by its distance from the front card. --w is the front card's width.
const FAN: { transform: string; z: number; dim: string }[] = [
  { transform: "perspective(1400px) translateX(0) translateY(0) scale(1) rotateY(-5deg)", z: 30, dim: "" },
  { transform: "perspective(1400px) translateX(calc(var(--w) * 0.82)) translateY(5%) scale(0.82) rotateY(-9deg)", z: 20, dim: "brightness-[0.72]" },
  { transform: "perspective(1400px) translateX(calc(var(--w) * 1.43)) translateY(10%) scale(0.67) rotateY(-11deg)", z: 10, dim: "brightness-[0.6]" },
];

/** Inset photo frame: headline on the left, the three series as a small overlapping card fan on the right. */
export default function Hero() {
  const openVideo = useVideo();
  const count = heroCards.length;
  const [{ active, prev }, setSlide] = useState({ active: 0, prev: 0 });
  const setActive = (fn: (a: number) => number) => setSlide((s) => ({ active: fn(s.active), prev: s.active }));
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const choose = (i: number) => {
    setAutoplay(false);
    setActive(() => (i + count) % count);
  };

  // Advance gently until the visitor takes over
  useEffect(() => {
    if (!autoplay || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % count), 6000);
    return () => clearInterval(t);
  }, [autoplay, count]);

  // The photo drifts slower than the page as you scroll away
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    const backdrop = backdropRef.current;
    if (!section || !backdrop) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, section.offsetHeight);
        backdrop.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} id="top" className="bg-forest-950 p-2 sm:p-3 lg:p-4" onFocusCapture={() => setAutoplay(false)}>
      <div className="relative isolate flex min-h-[calc(100svh-1rem)] flex-col overflow-hidden rounded-[22px] text-ivory sm:min-h-[calc(100svh-1.5rem)] lg:min-h-[calc(100svh-2rem)] lg:rounded-[32px]">
        <div ref={backdropRef} className="absolute -inset-y-[6%] inset-x-0 -z-20 will-change-transform">
          <Image src={images.hero.src} alt="" fill priority sizes="100vw" className="ken-burns object-cover object-[70%_40%]" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(11_26_19/0.7)_0%,rgb(11_26_19/0.2)_28%,rgb(11_26_19/0.3)_60%,rgb(11_26_19/0.85)_100%)]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(11_26_19/0.85)_0%,rgb(11_26_19/0.45)_45%,rgb(11_26_19/0.15)_80%)]" />

        <div className="mx-auto grid w-full max-w-[1440px] flex-1 items-center gap-14 px-5 pt-32 pb-10 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-8 lg:px-12 lg:pt-36 lg:pb-14">
          {/* Message */}
          <div>
            <p className="eyebrow enter flex flex-wrap gap-x-3 gap-y-1 text-[0.68rem] text-ivory/85" style={delay(150)}>
              {agent.areas.map((area, i) => (
                <span key={area} className="flex items-center gap-3 whitespace-nowrap">
                  {i > 0 && <span className="size-1 rotate-45 bg-gold-400" aria-hidden="true" />}
                  {area}
                </span>
              ))}
            </p>
            <h1 className="mt-8 font-display text-[2.9rem] leading-[1] font-medium tracking-[-0.01em] sm:text-6xl xl:text-[4.4rem]">
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="enter block" style={delay(300)}>
                  Real Estate With a
                </span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <span className="enter block" style={delay(440)}>
                  <em className="text-gold-300">Point of View.</em>
                </span>
              </span>
            </h1>
            <span className="gold-rule enter-line mt-7 block w-16!" style={delay(600)} />
            <p className="enter mt-6 max-w-sm text-base leading-relaxed text-ivory/80 sm:text-lg" style={delay(650)}>
              Local insight. Strategic guidance.
              <br />
              Real conversations.
            </p>
            <div className="enter mt-8 flex flex-wrap items-center gap-x-6 gap-y-4" style={delay(800)}>
              <Link
                href="/contact"
                className="group btn-gold shimmer inline-flex items-center gap-3 px-7 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase"
              >
                Work With Stacey
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <button
                type="button"
                onClick={() => openVideo(film)}
                className="group inline-flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-ivory/85 uppercase hover:text-gold-300"
              >
                <span className="flex size-10 items-center justify-center rounded-full border border-ivory/40 transition-colors group-hover:border-gold-300">
                  <PlayIcon className="ml-0.5 size-3" />
                </span>
                Watch the film
              </button>
            </div>
          </div>

          {/* The three series */}
          <div>
            {/* Desktop: overlapping fan */}
            <div
              className="relative hidden h-[calc(var(--w)*1.36+2rem)] [--w:clamp(230px,19vw,300px)] lg:block"
              aria-roledescription="carousel"
              aria-label="Series"
            >
              {heroCards.map((card, i) => {
                const pos = (i - active + count) % count;
                const isActive = pos === 0;
                const fan = FAN[pos];
                // Moving two places means wrapping round the stack: fade it rather than sweep it across
                const wrapped = prev !== active && Math.abs(pos - (i - prev + count) % count) === 2;
                return (
                  <article
                    key={card.title}
                    className={`${prev === active ? "enter-card" : ""} group absolute top-0 left-0 aspect-[3/4.1] w-(--w) origin-left overflow-hidden rounded-2xl border border-ivory/60 bg-forest-950 shadow-[0_30px_60px_-28px_rgb(0_0_0/0.85)] transition-[transform,filter] duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${fan.dim} ${
                      wrapped ? "animate-[fan-wrap_1100ms_ease-in-out]" : ""
                    } ${
                      isActive ? "" : "cursor-pointer hover:brightness-90"
                    }`}
                    style={{ ...delay(500 + i * 180), transform: fan.transform, zIndex: fan.z }}
                    onClick={isActive ? undefined : () => choose(i)}
                    aria-hidden={!isActive}
                  >
                    <CardBody card={card} active={isActive} eager={i === 0} onPlay={() => card.video && openVideo(card.video)} />
                  </article>
                );
              })}
            </div>

            <div className="enter mt-6 hidden items-center gap-8 pl-[calc(var(--w)*0.55)] [--w:clamp(230px,19vw,300px)] lg:flex" style={delay(1200)}>
              <button type="button" onClick={() => choose(active - 1)} aria-label="Previous" className="text-xl text-ivory/75 transition-transform hover:-translate-x-1 hover:text-gold-300">
                ←
              </button>
              <div className="flex gap-2.5" role="tablist" aria-label="Series">
                {heroCards.map((card, i) => (
                  <button
                    key={card.title}
                    type="button"
                    role="tab"
                    aria-selected={i === active}
                    aria-label={card.title}
                    onClick={() => choose(i)}
                    className={`size-2.5 rounded-full border border-ivory/80 transition-colors ${i === active ? "bg-ivory" : "bg-transparent hover:bg-ivory/40"}`}
                  />
                ))}
              </div>
              <button type="button" onClick={() => choose(active + 1)} aria-label="Next" className="text-xl text-ivory/75 transition-transform hover:translate-x-1 hover:text-gold-300">
                →
              </button>
            </div>

            {/* Phones and tablets: swipeable row */}
            <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:hidden">
              {heroCards.map((card, i) => (
                <article
                  key={card.title}
                  className="enter-card group relative aspect-[3/4.1] w-[66%] max-w-[17rem] shrink-0 snap-start overflow-hidden rounded-2xl border border-ivory/60 bg-forest-950"
                  style={delay(700 + i * 160)}
                >
                  <CardBody card={card} active onPlay={() => card.video && openVideo(card.video)} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardBody({
  card,
  active,
  eager = false,
  onPlay,
}: {
  card: (typeof heroCards)[number];
  active: boolean;
  eager?: boolean;
  onPlay: () => void;
}) {
  const circle =
    "flex size-14 items-center justify-center rounded-full border-[1.5px] border-ivory/90 bg-forest-950/25 text-ivory backdrop-blur-[2px] transition-all duration-300 hover:scale-105 hover:border-gold-300 hover:text-gold-300";
  return (
    <>
      <Image
        src={card.image.src}
        alt=""
        fill
        loading={eager ? "eager" : "lazy"}
        sizes="(min-width: 1024px) 300px, 66vw"
        className={`object-cover transition-transform duration-[1.6s] ease-out-soft ${active ? "scale-100" : "scale-110"}`}
        style={{ objectPosition: card.imagePosition }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_26_19/0)_40%,rgb(11_26_19/0.55)_65%,rgb(11_26_19/0.92)_100%)]" />

      <div className="absolute inset-x-0 top-[38%] flex justify-center">
        {card.video ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            tabIndex={active ? 0 : -1}
            aria-label={`Play: ${card.video.title}`}
            className={circle}
          >
            <PlayIcon className="ml-1 size-5" />
          </button>
        ) : (
          <Link href={card.href} tabIndex={active ? 0 : -1} aria-label={`Go to ${card.title}`} className={`${circle} text-xl`}>
            <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="flex items-center gap-3 text-sm">
          {card.number}
          <span className={`h-px bg-ivory/70 transition-[width] duration-700 ${active ? "w-14" : "w-8"}`} />
        </p>
        <h2 className="mt-2 text-[0.95rem] leading-snug font-semibold tracking-[0.08em] uppercase">
          <Link href={card.href} tabIndex={active ? 0 : -1} className="hover:text-gold-300">
            {card.title}
          </Link>
        </h2>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ivory/80">{card.subtitle}</p>
      </div>
    </>
  );
}
