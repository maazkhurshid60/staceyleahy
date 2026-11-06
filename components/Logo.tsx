type LogoProps = { compass?: boolean; className?: string };

/** "STACEY LEAHY / HOMES" wordmark, optionally followed by the Compass brokerage mark. */
export default function Logo({ compass = true, className = "" }: LogoProps) {
  return (
    <span className={`flex items-center gap-4 text-ivory sm:gap-5 ${className}`}>
      <span className="flex flex-col items-center leading-none">
        <span className="font-display text-[1.45rem] font-medium tracking-[0.12em] sm:text-[1.9rem]">
          STACEY LEAHY
        </span>
        <span className="mt-1.5 flex w-full items-center gap-3">
          <span className="h-px flex-1 bg-ivory/70" />
          <span className="text-[0.62rem] font-medium tracking-[0.42em] sm:text-[0.78rem]">HOMES</span>
          <span className="h-px flex-1 bg-ivory/70" />
        </span>
      </span>
      {compass && (
        <>
          <span className="hidden h-9 w-px bg-gold-500/70 sm:block" aria-hidden="true" />
          <span className="hidden text-[0.8rem] font-medium tracking-[0.28em] sm:block">COMPASS</span>
        </>
      )}
    </span>
  );
}
