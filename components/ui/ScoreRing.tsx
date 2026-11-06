"use client";

import { useEffect, useRef, useState } from "react";

const R = 52;
const C = 2 * Math.PI * R;

/** 0-100 score drawn as a gold ring that fills when it scrolls into view. */
export default function ScoreRing({ score, label, rating }: { score: number; label: string; rating: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setDrawn(true);
        observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="flex flex-col items-center text-center">
      <svg ref={ref} viewBox="0 0 120 120" className="size-36 -rotate-90" role="img" aria-label={`${label}: ${score} out of 100, ${rating}`}>
        <circle cx="60" cy="60" r={R} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="3" />
        <circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke="var(--color-gold-400)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={drawn ? C * (1 - score / 100) : C}
          className="transition-[stroke-dashoffset] duration-[1.8s] ease-out-soft"
        />
        <text x="60" y="60" textAnchor="middle" dominantBaseline="central" transform="rotate(90 60 60)" className="fill-current font-display text-[2.4rem]">
          {score}
        </text>
      </svg>
      <figcaption className="mt-4">
        <span className="eyebrow block text-gold-300">{label}</span>
        <span className="mt-1 block font-display text-xl">{rating}</span>
      </figcaption>
    </figure>
  );
}
