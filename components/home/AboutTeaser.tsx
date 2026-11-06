import Image from "next/image";
import Reveal from "../Reveal";
import ArchImage from "../ui/ArchImage";
import ButtonLink from "../ui/ButtonLink";
import { agent, images } from "@/content/site";

/** Overlapping collage: arched portrait, an offset interior and a pull quote. */
export default function AboutTeaser() {
  return (
    <section id="about" className="relative overflow-hidden bg-ivory py-28 sm:py-40">
      <div className="mx-auto grid max-w-[1440px] items-center gap-20 px-5 sm:px-8 lg:grid-cols-2 lg:px-14">
        <div className="relative mx-auto w-full max-w-lg pb-24 lg:pb-32">
          <ArchImage image={images.stacey} alt="Stacey Leahy" sizes="(min-width: 1024px) 34vw, 80vw" outline="left" position="50% 28%" className="aspect-[3/4] w-[78%]" />
          <Reveal variant="wipe" delay={300} className="absolute right-0 bottom-0 aspect-square w-[52%] overflow-hidden border-8 border-ivory shadow-[0_30px_60px_-30px_rgb(15_34_25/0.5)]">
            <Image src={images.interiorShelves.src} alt="" fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
          </Reveal>
          <Reveal
            variant="fade"
            delay={600}
            className="absolute top-10 -right-2 flex size-28 items-center justify-center rounded-full bg-forest-900 text-center text-[0.62rem] leading-tight font-semibold tracking-[0.18em] text-gold-300 uppercase sm:-right-6 sm:size-32"
          >
            Compass
            <br />
            Studio City
          </Reveal>
        </div>

        <div>
          <Reveal as="p" variant="fade" className="eyebrow flex items-center gap-4 text-gold-600">
            <span className="font-display text-xl tracking-normal">04</span>
            <span className="block h-px w-10 bg-gold-500" />
            About Stacey
          </Reveal>
          <Reveal as="blockquote" delay={100} className="mt-8 font-display text-4xl leading-[1.15] text-forest-900 sm:text-5xl">
            &ldquo;Open communication, kindness and integrity are the foundation of{" "}
            <em className="text-gold-600">any negotiation.</em>&rdquo;
          </Reveal>
          <Reveal as="p" delay={200} className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">
            Accountant, banker, sales leader and now one of the Valley&apos;s most hands-on agents. Stacey&apos;s
            &ldquo;Home Everything&rdquo; approach covers moving, painting, landscaping, staging and more, so her clients
            never manage it alone.
          </Reveal>
          <Reveal delay={300} className="mt-10 flex flex-wrap items-center gap-8">
            <ButtonLink href="/about" variant="dark">
              Her story
            </ButtonLink>
            <span className="font-display text-xl text-forest-900 italic">
              Stacey Leahy <span className="text-ink-soft not-italic">· CA DRE# {agent.dre}</span>
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
