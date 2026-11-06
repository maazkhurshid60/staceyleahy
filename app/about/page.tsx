import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import ArchImage from "@/components/ui/ArchImage";
import Testimonials from "@/components/home/Testimonials";
import { agent, images } from "@/content/site";

export const metadata: Metadata = {
  title: "About Stacey",
  description:
    "Stacey Leahy is a Compass agent in Studio City known for white-glove service, privacy and a full-time client relationship.",
};

const PATH = [
  { when: "Education", what: "University of Houston", detail: "Degree in accounting." },
  { when: "Finance", what: "Banking & accounting", detail: "Honed at boutique and international companies." },
  { when: "Leadership", what: "Sales manager", detail: "For a national medical services corporation, where her solutions-first approach took shape." },
  { when: "Certified", what: "Pricing Strategy Advisor", detail: "PSA certification, paired with a creative eye, gives her clients an edge on price." },
  { when: "Today", what: "Compass, Studio City", detail: "Local knowledge of the many neighborhoods of Los Angeles County." },
];

const HOME_EVERYTHING = ["Moving & storage", "Painting", "Landscaping", "Remodeling", "Staging", "Deep-cleaning", "Estate sales", "Next-chapter search"];

const LIFE = [
  ["27+ years", "Happily married to a fine art dealer."],
  ["Tennis & triathlons", "An avid tennis player who has run half marathons and sprint triathlons."],
  ["Five years", "Leading her daughter's Girl Scout troop."],
  ["Community", "Created a “Dress for Success” uniform drive for underprivileged children; a longtime St. Jude contributor."],
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Stacey"
        crumbs={[{ label: "About" }]}
        title={
          <>
            A full-time
            <br />
            client <em className="text-gold-300">relationship.</em>
          </>
        }
        intro="Professionalism, privacy and dedication, from the first conversation to long after the keys change hands."
        image={images.staceyCard}
        imageAlt="Stacey Leahy"
      />

      {/* Story with sticky portrait */}
      <section className="bg-ivory py-28 sm:py-36">
        <div className="mx-auto grid max-w-[1440px] gap-16 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24 lg:px-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ArchImage image={images.stacey} alt="Stacey Leahy" sizes="(min-width: 1024px) 34vw, 90vw" outline="left" position="50% 30%" className="aspect-[3/4] w-full" />
            <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
              <div>
                <dt className="eyebrow text-gold-600">Phone</dt>
                <dd className="mt-1">
                  <a href={agent.phoneHref} className="font-display text-xl text-forest-900 hover:text-gold-600">{agent.phone}</a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-gold-600">License</dt>
                <dd className="mt-1 font-display text-xl text-forest-900">CA DRE# {agent.dre}</dd>
              </div>
              <div className="col-span-2">
                <dt className="eyebrow text-gold-600">Office</dt>
                <dd className="mt-1 text-ink-soft">Compass · {agent.office.join(", ")}</dd>
              </div>
            </dl>
          </div>

          <div>
            <Reveal as="p" className="font-display text-4xl leading-[1.2] text-forest-900 sm:text-5xl">
              Those looking to be treated with the utmost professionalism, privacy and dedication need look no further
              than <em className="text-gold-600">Stacey Leahy.</em>
            </Reveal>
            <div className="mt-12 space-y-6 text-lg leading-[1.85] text-ink-soft">
              <Reveal as="p">
                Striving for excellence and surpassing expectations are just two of the tenets that drive this tenacious
                and accomplished agent. Hardworking, quick-thinking and always focused on her clients, Stacey&apos;s
                white-glove strategies have built a loyal following with clientele drawn to her unparalleled attention to
                detail and personalized service. Those who have worked with Stacey rave about her integrity and her
                commitment to a &ldquo;full-time client relationship&rdquo; during every step of their real estate journey.
              </Reveal>
              <Reveal as="p">
                Stacey credits her many years of living in Burbank and working within the entertainment industry with
                her discretion and stellar business practices. She is the mother of a professional young actor who
                lights up Broadway and the television and film world, and together they have traveled on worldwide
                performance tours.
              </Reveal>
              <Reveal as="p">
                Based out of the Compass Studio City office, Stacey makes it a practice to personally tour new listings
                every week, knowing that online photos tell only part of the story. A confident networker, she believes
                that open communication, kindness and integrity are the foundation of any negotiation, and discerning
                buyers and sellers are drawn to her honesty as well as her aptitude for competitive bidding and for
                marketing a new listing.
              </Reveal>
            </div>

            {/* Career path */}
            <Reveal as="h2" className="mt-20 font-display text-4xl text-forest-900">
              The path here
            </Reveal>
            <ol className="relative mt-10 border-l border-gold-500/50">
              {PATH.map((p, i) => (
                <Reveal as="li" key={p.what} delay={i * 90} className="relative pb-10 pl-10 last:pb-0">
                  <span className="absolute top-1.5 -left-[5px] size-2.5 rotate-45 bg-gold-500" aria-hidden="true" />
                  <p className="eyebrow text-gold-600">{p.when}</p>
                  <p className="mt-1 font-display text-3xl text-forest-900">{p.what}</p>
                  <p className="mt-1 text-ink-soft">{p.detail}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Home Everything */}
      <section className="relative overflow-hidden bg-forest-900 py-28 text-ivory sm:py-36">
        <div className="mx-auto grid max-w-[1440px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:px-14">
          <div>
            <Reveal as="p" variant="fade" className="eyebrow flex items-center gap-4 text-gold-300">
              <span className="block h-px w-12 bg-gold-400" />
              Her mantra
            </Reveal>
            <Reveal as="h2" delay={100} className="mt-6 font-display text-6xl leading-none sm:text-8xl">
              Home <em className="text-gold-300">Everything.</em>
            </Reveal>
            <Reveal as="p" delay={200} className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/75">
              Her strong support team crafts a detailed plan for every client, from moving and storage to painting,
              landscaping, remodeling and staging, with Stacey hands-on and always available.
            </Reveal>
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {HOME_EVERYTHING.map((s, i) => (
                <Reveal
                  as="li"
                  variant="fade"
                  key={s}
                  delay={i * 60}
                  className="border border-ivory/15 px-4 py-4 text-center text-sm text-ivory/85 transition-colors hover:border-gold-400 hover:text-gold-300"
                >
                  {s}
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <Reveal variant="wipe" className="arch-sm relative aspect-[4/5] overflow-hidden">
              <Image src={images.interiorKitchen.src} alt="Open kitchen and living room, staged" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </Reveal>
            <Reveal
              variant="fade"
              delay={400}
              className="absolute -bottom-8 -left-6 max-w-[16rem] bg-gold-400 p-6 text-forest-950 sm:-left-12"
            >
              <p className="font-display text-2xl leading-snug italic">&ldquo;Sold in just 27 days.&rdquo;</p>
              <p className="mt-2 text-xs tracking-[0.18em] uppercase">B. Grant, selling a family home of 62 years</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Outside of work */}
      <section className="bg-ivory py-28 sm:py-36">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <Reveal as="h2" className="max-w-2xl font-display text-5xl leading-[1.05] text-forest-900 sm:text-6xl">
            Beyond the <em className="text-gold-600">closing table.</em>
          </Reveal>
          <ul className="mt-14 grid gap-px bg-forest-900/15 sm:grid-cols-2 lg:grid-cols-4">
            {LIFE.map(([title, body], i) => (
              <Reveal as="li" key={title} delay={i * 100} className="bg-ivory p-8 transition-colors hover:bg-sand">
                <span className="text-outline font-display text-5xl [--stroke:var(--color-gold-500)]">0{i + 1}</span>
                <p className="mt-6 font-display text-2xl text-forest-900">{title}</p>
                <p className="mt-2 leading-relaxed text-ink-soft">{body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Testimonials />
      <CtaBand title={<>Ready when <em className="text-gold-300">you are.</em></>} />
    </>
  );
}
