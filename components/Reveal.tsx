"use client";

import { useEffect, useRef } from "react";

type RevealProps = {
  children?: React.ReactNode;
  as?: "div" | "li" | "span" | "p" | "article" | "figure" | "h2" | "h3" | "blockquote";
  /** up: rise and fade · fade: fade only · wipe: photo wipes open · line: gold rule draws across */
  variant?: "up" | "fade" | "wipe" | "line";
  delay?: number;
  className?: string;
};

/** Plays its reveal transition the first time it scrolls into view (styles live in globals.css). */
export default function Reveal({ children, as: Tag = "div", variant = "up", delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.setAttribute("data-shown", "");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={variant}
      className={className}
      style={delay ? ({ "--d": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
