"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { agent, film, heroCards, images } from "@/content/site";
import { PlayIcon, useVideo } from "../VideoPlayer";
import { asset } from "@/lib/base-path";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

// Where each card sits by its distance from the front card. --w is the front card's width.
const FAN: { transform: string; z: number; dim: string }[] = [
  { transform: "perspective(1400px) translateX(0) translateY(0) scale(1) rotateY(-5deg)", z: 30, dim: "" },
  { transform: "perspective(1400px) translateX(calc(var(--w) * 0.82)) translateY(5%) scale(0.82) rotateY(-9deg)", z: 20, dim: "brightness-[0.72]" },
  { transform: "perspective(1400px) translateX(calc(var(--w) * 1.43)) translateY(10%) scale(0.67) rotateY(-11deg)", z: 10, dim: "brightness-[0.6]" },
];

/** Inset photo frame: headline on the left, the three series as a small overlapping card fan on the right. */
export default function Hero() {
  const count = heroCards.length;
  // Which card is playing its video in place (Stacey Asks has no episode yet: the LA film stands in)
  const [playing, setPlaying] = useState<number | null>(null);
  const play = (i: number) => {
    setAutoplay(false);
    setPlaying(i);
  };
  const openVideo = useVideo();
  // Expand: move the playing video into the full-size player
  const expand = (card: (typeof heroCards)[number]) => {
    setPlaying(null);
    openVideo(card.video ?? film);
  };
  const [hover, setFocus] = useState(false);
  const focus = hover || playing !== null;
  const [{ active, prev }, setSlide] = useState({ active: 0, prev: 0 });
  const setActive = (fn: (a: number) => number) => setSlide((s) => ({ active: fn(s.active), prev: s.active }));
  const [autoplay, setAutoplay] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const choose = (i: number) => {
    setAutoplay(false);
    setPlaying(null);
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
          <Image src={images.hero.src} alt="" fill priority sizes="100vw" className={`ken-burns object-cover object-[70%_40%] transition-[filter] duration-700 ${focus ? "blur-[6px] brightness-75" : ""}`} />
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
            </div>
          </div>

          {/* The three series */}
          <div>
            {/* Desktop: overlapping fan */}
            <div
              className="relative hidden h-[calc(var(--w)*1.36+2rem)] [--w:clamp(250px,21vw,330px)] lg:block"
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
                    className={`${prev === active ? "enter-card" : ""} group absolute top-0 left-0 aspect-[3/4.1] w-(--w) origin-left overflow-hidden rounded-2xl border border-ivory/60 bg-forest-950 shadow-[0_30px_60px_-28px_rgb(0_0_0/0.85)] transition-[transform,filter,scale,box-shadow] duration-[1100ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${fan.dim} ${
                      wrapped ? "animate-[fan-wrap_1100ms_ease-in-out]" : ""
                    } ${
                      isActive
                        ? "cursor-pointer outline-none hover:scale-[1.06] hover:shadow-[0_40px_80px_-24px_rgb(0_0_0/0.9)] focus-visible:scale-[1.06] focus-visible:ring-2 focus-visible:ring-gold-300"
                        : "cursor-pointer hover:brightness-90"
                    }`}
                    style={{ ...delay(500 + i * 180), transform: fan.transform, zIndex: fan.z, scale: isActive && playing === i ? "1.28" : undefined }}
                    onClick={() => (isActive ? playing !== i && play(i) : choose(i))}
                    onMouseEnter={isActive ? () => (setFocus(true), setAutoplay(false)) : undefined}
                    onMouseLeave={isActive ? () => setFocus(false) : undefined}
                    onKeyDown={(e) => isActive && playing !== i && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), play(i))}
                    onFocus={isActive ? () => setFocus(true) : undefined}
                    onBlur={isActive ? () => setFocus(false) : undefined}
                    tabIndex={isActive ? 0 : -1}
                    role={isActive ? "button" : undefined}
                    aria-label={isActive ? `Play: ${(card.video ?? film).title}` : undefined}
                    aria-hidden={!isActive}
                  >
                    <CardBody card={card} active={isActive} eager={i === 0} playing={isActive && playing === i} onStop={() => setPlaying(null)} onExpand={() => expand(card)} />
                  </article>
                );
              })}
            </div>

            <div className="enter mt-6 hidden items-center gap-8 pl-[calc(var(--w)*0.55)] [--w:clamp(250px,21vw,330px)] lg:flex" style={delay(1200)}>
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
                  onClick={() => playing !== i && play(i)}
                  role="button"
                  aria-label={`Play: ${(card.video ?? film).title}`}
                >
                  <CardBody card={card} active playing={playing === i} onStop={() => setPlaying(null)} onExpand={() => expand(card)} />
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
  playing = false,
  onStop,
  onExpand,
}: {
  card: (typeof heroCards)[number];
  active: boolean;
  eager?: boolean;
  playing?: boolean;
  onStop: () => void;
  onExpand: () => void;
}) {
  const video = card.video ?? film;
  return (
    <>
      {playing && (
        <div className="absolute inset-0 z-20 overflow-hidden bg-black">
          {video.kind === "file" ? (
            <video src={asset(video.src)} autoPlay controls playsInline onEnded={onStop} className="h-full w-full object-cover" />
          ) : (
            // Fill the portrait card: a 16:9 player as tall as the card, centred and cropped at the sides
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={video.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute top-0 left-1/2 h-full aspect-video -translate-x-1/2 border-0"
            />
          )}
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onExpand();
              }}
              aria-label="Play full size"
              title="Play full size"
              className="flex size-9 items-center justify-center rounded-full bg-forest-950/70 text-ivory backdrop-blur-sm hover:bg-forest-950 hover:text-gold-300"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4" aria-hidden="true">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onStop();
              }}
              aria-label="Close video"
              title="Close"
              className="flex size-9 items-center justify-center rounded-full bg-forest-950/70 text-lg leading-none text-ivory backdrop-blur-sm hover:bg-forest-950 hover:text-gold-300"
            >
              ×
            </button>
          </div>
        </div>
      )}
      <Image
        src={card.image.src}
        alt=""
        fill
        loading={eager ? "eager" : "lazy"}
        sizes="(min-width: 1024px) 330px, 66vw"
        className={`object-cover transition-transform duration-[1.6s] ease-out-soft ${active ? "scale-100" : "scale-110"}`}
        style={{ objectPosition: card.imagePosition }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(11_26_19/0)_40%,rgb(11_26_19/0.55)_65%,rgb(11_26_19/0.92)_100%)]" />

      {active && (
        <span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 scale-90 items-center gap-2.5 rounded-full border border-ivory/70 bg-forest-950/35 py-2.5 pr-5 pl-3 text-[0.7rem] font-semibold tracking-[0.18em] text-ivory uppercase opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100 max-lg:scale-100 max-lg:opacity-100"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-ivory text-forest-950">
            <PlayIcon className="ml-0.5 size-3" />
          </span>
          Play
        </span>
      )}

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="flex items-center gap-3 text-sm">
          {card.number}
          <span className={`h-px bg-ivory/70 transition-[width] duration-700 ${active ? "w-14" : "w-8"}`} />
        </p>
        <h2 className="mt-2 text-[0.95rem] leading-snug font-semibold tracking-[0.08em] uppercase">
          <Link href={card.href} tabIndex={active ? 0 : -1} onClick={(e) => e.stopPropagation()} className="hover:text-gold-300">
            {card.title}
          </Link>
        </h2>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ivory/80">{card.subtitle}</p>
      </div>
    </>
  );
}
