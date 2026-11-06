"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { HeroVideo } from "@/content/site";

const VideoContext = createContext<(video: HeroVideo) => void>(() => {});

export function useVideo() {
  return useContext(VideoContext);
}

/** Provides one shared lightbox for every play button on the page. */
export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [video, setVideo] = useState<HeroVideo | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback((v: HeroVideo) => setVideo(v), []);
  const close = useCallback(() => setVideo(null), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (video && !dialog.open) dialog.showModal();
    if (!video && dialog.open) dialog.close();
  }, [video]);

  return (
    <VideoContext.Provider value={open}>
      {children}
      <dialog
        ref={dialogRef}
        onClose={close}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label={video?.title ?? "Video"}
        className="m-auto w-[min(92vw,1100px)] max-w-none bg-transparent p-0 backdrop:bg-forest-950/85 backdrop:backdrop-blur-sm"
      >
        {video && (
          <div>
            <div className="mb-3 flex justify-end">
              <button
                type="button"
                onClick={close}
                className="flex items-center gap-2 text-sm tracking-[0.18em] text-ivory/90 uppercase hover:text-gold-300"
              >
                Close <span aria-hidden="true" className="text-xl leading-none">×</span>
              </button>
            </div>
            <div className="gold-frame aspect-video w-full overflow-hidden bg-black">
              {video.kind === "file" ? (
                <video
                  src={video.src}
                  poster={video.poster}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                  title={video.title}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              )}
            </div>
            <p className="mt-4 font-display text-xl text-ivory italic">{video.title}</p>
          </div>
        )}
      </dialog>
    </VideoContext.Provider>
  );
}

export function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M8 5.5v13a.5.5 0 0 0 .77.42l10.2-6.5a.5.5 0 0 0 0-.84L8.77 5.08A.5.5 0 0 0 8 5.5Z" />
    </svg>
  );
}

/** Small "▶ Watch the film" style trigger. */
export function WatchButton({ video, label }: { video: HeroVideo; label: string }) {
  const open = useVideo();
  return (
    <button
      type="button"
      onClick={() => open(video)}
      className="group flex items-center gap-4 text-ivory"
    >
      <span className="flex size-12 items-center justify-center rounded-full border border-gold-400/80 transition-colors group-hover:bg-gold-400 group-hover:text-forest-950">
        <PlayIcon className="ml-0.5 size-4" />
      </span>
      <span className="text-sm font-medium tracking-[0.16em] uppercase">{label}</span>
    </button>
  );
}
