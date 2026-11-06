import Link from "next/link";
import ButtonLink from "@/components/ui/ButtonLink";
import { nav } from "@/content/site";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden bg-forest-900 text-ivory">
      <p
        aria-hidden="true"
        className="text-outline absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 font-display text-[45vw] leading-none [--stroke:rgb(201_164_92/0.25)]"
      >
        404
      </p>
      <div className="mx-auto w-full max-w-[1440px] px-5 pt-32 pb-20 sm:px-8 lg:px-14">
        <p className="eyebrow enter text-gold-300">Page not found</p>
        <h1 className="enter mt-6 max-w-3xl font-display text-6xl leading-[0.95] sm:text-8xl [--d:120ms]">
          This address <em className="text-gold-300">isn&apos;t on the market.</em>
        </h1>
        <p className="enter mt-8 max-w-lg text-lg text-ivory/70 [--d:240ms]">
          The page may have moved. Try one of these instead, or head home.
        </p>
        <div className="enter mt-10 flex flex-wrap gap-x-8 gap-y-3 [--d:360ms]">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="font-display text-2xl hover:text-gold-300">
              {n.label}
            </Link>
          ))}
        </div>
        <div className="enter mt-12 [--d:480ms]">
          <ButtonLink href="/">Back home</ButtonLink>
        </div>
      </div>
    </section>
  );
}
