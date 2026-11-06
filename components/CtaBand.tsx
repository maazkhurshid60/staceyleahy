import Image from "next/image";
import ButtonLink from "./ui/ButtonLink";
import Reveal from "./Reveal";
import { agent, images } from "@/content/site";

/** Closing invitation used at the foot of most pages. */
export default function CtaBand({
  title = (
    <>
      Your next move <em className="text-gold-300">starts with a conversation.</em>
    </>
  ),
}: {
  title?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-ivory">
      {/* Oversized outlined words drifting behind */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-10 -z-10 overflow-hidden opacity-60">
        <div className="flex w-max animate-[marquee_60s_linear_infinite] font-display text-[6rem] leading-none whitespace-nowrap italic [--stroke:rgb(201_164_92/0.35)] sm:text-[9rem]">
          <span className="text-outline pr-16">Let&apos;s talk · Let&apos;s talk · Let&apos;s talk ·</span>
          <span className="text-outline pr-16">Let&apos;s talk · Let&apos;s talk · Let&apos;s talk ·</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-5 py-28 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-14 lg:py-36">
        <Reveal>
          <h2 className="max-w-3xl font-display text-5xl leading-[1.02] sm:text-7xl">{title}</h2>
          <p className="mt-6 max-w-xl text-lg text-ivory/70">
            Buying, selling, or just curious what your home is worth today? Stacey answers personally.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/contact">Let&apos;s talk</ButtonLink>
            <ButtonLink href={agent.phoneHref} variant="outline" arrow={false}>
              {agent.phone}
            </ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={200} className="relative mx-auto hidden aspect-[3/4] w-64 lg:block xl:w-72">
          <span aria-hidden="true" className="arch absolute inset-0 -translate-x-4 -translate-y-4 border border-gold-500/60" />
          <div className="arch relative h-full w-full overflow-hidden">
            <Image src={images.staceyCard.src} alt="Stacey Leahy" fill sizes="300px" className="object-cover object-[50%_20%]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
