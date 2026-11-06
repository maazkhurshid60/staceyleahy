import Image from "next/image";
import Reveal from "../Reveal";
import ButtonLink from "../ui/ButtonLink";
import { images } from "@/content/site";

const PILLARS = [
  ["Compass", "Based in the Studio City office, serving Los Angeles County."],
  ["Pricing Strategy Advisor", "Certified to price for the market you're actually in."],
  ["In person, every week", "Stacey tours new listings herself. Photos tell only part of the story."],
];

/** The point of view: a short statement beside a framed interior, with three supporting points. */
export default function Statement() {
  return (
    <section className="bg-ivory py-24 sm:py-32">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <Reveal as="p" variant="fade" className="eyebrow flex items-center gap-4 text-gold-600">
              <span className="block h-px w-10 bg-gold-500" />A point of view
            </Reveal>
            <Reveal as="h2" delay={100} className="mt-6 font-display text-4xl leading-[1.08] text-forest-900 sm:text-5xl">
              Real estate is <em className="text-gold-600">personal.</em>
            </Reveal>
            <Reveal as="p" delay={200} className="mt-6 max-w-md text-lg leading-relaxed text-ink-soft">
              Stacey treats every home as if it were her own, from the first walkthrough to the final signature. You get
              straight answers, a plan built on real numbers and someone who picks up the phone.
            </Reveal>
            <Reveal delay={300} className="mt-9">
              <ButtonLink href="/about" variant="ghost">
                Meet Stacey
              </ButtonLink>
            </Reveal>
          </div>

          <Reveal variant="fade" className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[24px]">
              <Image
                src={images.interiorLiving.src}
                alt="A bright living room in a home Stacey sold"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="ken-burns object-cover"
              />
            </div>
            <Reveal
              delay={350}
              className="absolute -bottom-8 left-4 flex max-w-[19rem] items-center gap-4 rounded-2xl bg-forest-900 p-3 pr-6 text-ivory shadow-[0_24px_50px_-24px_rgb(11_26_19/0.7)] sm:left-8"
            >
              <div className="relative size-16 shrink-0 overflow-hidden rounded-xl">
                <Image src={images.staceyCard.src} alt="" fill sizes="64px" className="object-cover object-[50%_18%]" />
              </div>
              <div>
                <p className="font-display text-xl leading-tight">Stacey Leahy</p>
                <p className="mt-1 text-xs text-ivory/70">REALTOR® · Compass, Studio City</p>
              </div>
            </Reveal>
          </Reveal>
        </div>

        <ol className="mt-24 grid gap-4 sm:grid-cols-3">
          {PILLARS.map(([title, body], i) => (
            <Reveal
              as="li"
              key={title}
              delay={i * 120}
              className="group rounded-2xl border border-forest-900/10 bg-sand/60 p-7 transition-colors duration-500 hover:border-gold-500/60 hover:bg-sand"
            >
              <span className="font-display text-sm text-gold-600">0{i + 1}</span>
              <p className="mt-6 font-display text-2xl text-forest-900">{title}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
