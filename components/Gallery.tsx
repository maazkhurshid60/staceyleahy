"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { SiteImage } from "@/content/site";

/** Photo mosaic that opens a full-screen viewer with keyboard and swipe navigation. */
export default function Gallery({ photos, name }: { photos: SiteImage[]; name: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback((step: number) => setOpen((o) => (o === null ? o : (o + step + photos.length) % photos.length)), [photos.length]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  return (
    <>
      <ul className="grid auto-rows-[14rem] grid-cols-2 gap-3 sm:auto-rows-[18rem] lg:grid-cols-4">
        {photos.map((p, i) => (
          <li
            key={p.src}
            className={`enter ${i === 0 ? "col-span-2 row-span-2" : ""} ${i === 5 ? "lg:col-span-2" : ""}`}
            style={{ "--d": `${Math.min(i, 8) * 60}ms` } as React.CSSProperties}
          >
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open photo ${i + 1} of ${photos.length}`}
              className="group relative block h-full w-full overflow-hidden bg-sand"
            >
              <Image
                src={p.src}
                alt={`${name}, photo ${i + 1}`}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover transition-[scale] duration-700 ease-out-soft group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-forest-950/0 transition-colors group-hover:bg-forest-950/20" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        aria-label={`${name} photos`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-forest-950/95 p-0 text-ivory backdrop:bg-forest-950/80"
        onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
          touchX.current = null;
        }}
      >
        {open !== null && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between px-5 py-4 sm:px-8">
              <p className="text-sm tracking-[0.16em] uppercase">
                {name} <span className="ml-3 text-gold-300">{open + 1} / {photos.length}</span>
              </p>
              <button type="button" onClick={() => setOpen(null)} className="text-sm tracking-[0.18em] uppercase hover:text-gold-300">
                Close ×
              </button>
            </div>
            <div className="relative flex-1">
              <Image key={open} src={photos[open].src} alt={`${name}, photo ${open + 1}`} fill sizes="100vw" className="enter object-contain [--d:0ms]" />
              <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="absolute top-1/2 left-4 flex size-14 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 bg-forest-950/40 text-2xl hover:border-gold-300 hover:text-gold-300">
                ←
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next photo" className="absolute top-1/2 right-4 flex size-14 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/40 bg-forest-950/40 text-2xl hover:border-gold-300 hover:text-gold-300">
                →
              </button>
            </div>
            <ul className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-4 sm:justify-center sm:px-8">
              {photos.map((p, i) => (
                <li key={p.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`Photo ${i + 1}`}
                    aria-current={i === open}
                    className={`relative block h-14 w-20 overflow-hidden transition-opacity ${i === open ? "opacity-100 ring-1 ring-gold-400" : "opacity-45 hover:opacity-80"}`}
                  >
                    <Image src={p.src} alt="" fill sizes="80px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </dialog>
    </>
  );
}
