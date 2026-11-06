import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { agent, images, socials } from "@/content/site";

export const metadata: Metadata = {
  title: "Let's Talk",
  description: "Contact Stacey Leahy, Compass real estate agent in Studio City: (424) 522-8484, stacey.leahy@compass.com.",
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-forest-900 text-ivory">
        <Image src={images.contactWide.src} alt="" fill priority sizes="100vw" className="ken-burns -z-20 object-cover opacity-30" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-forest-900/60 to-forest-900" />
        <div className="mx-auto max-w-[1440px] px-5 pt-36 pb-20 sm:px-8 lg:px-14 lg:pt-44 lg:pb-28">
          <nav aria-label="Breadcrumb" className="enter text-xs tracking-[0.18em] text-ivory/55 uppercase" style={d(100)}>
            <Link href="/" className="hover:text-gold-300">Home</Link>
            <span className="mx-2 text-gold-400">/</span>
            <span className="text-ivory/85">Let&apos;s Talk</span>
          </nav>
          <h1 className="enter mt-10 font-display text-[3.6rem] leading-[0.88] sm:text-[8rem] xl:text-[10.5rem]" style={d(250)}>
            Let&apos;s <em className="text-gold-300">talk.</em>
          </h1>
          <p className="enter mt-8 max-w-xl text-xl leading-relaxed text-ivory/75" style={d(400)}>
            Buying, selling, or just curious what your home is worth today? Call, text, or send a note below.
          </p>
        </div>
      </section>

      <section className="bg-ivory py-24 sm:py-32">
        <div className="mx-auto grid max-w-[1440px] gap-20 px-5 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:px-14">
          <Reveal>
            <ContactForm />
          </Reveal>

          <aside className="space-y-10">
            <Reveal delay={150} className="relative">
              <div className="arch-sm relative aspect-[4/5] overflow-hidden">
                <Image src={images.staceyCard.src} alt="Stacey Leahy" fill sizes="(min-width: 1024px) 28vw, 90vw" className="object-cover object-[50%_20%]" />
              </div>
              <p className="absolute -bottom-5 left-6 bg-gold-400 px-5 py-3 font-display text-xl text-forest-950 italic">Stacey Leahy</p>
            </Reveal>
            <Reveal delay={250}>
              <dl className="space-y-6 pt-4">
                <div>
                  <dt className="eyebrow text-gold-600">Call or text</dt>
                  <dd>
                    <a href={agent.phoneHref} className="font-display text-4xl text-forest-900 hover:text-gold-600">{agent.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-gold-600">Email</dt>
                  <dd>
                    <a href={`mailto:${agent.email}`} className="text-lg text-forest-900 hover:text-gold-600">{agent.email}</a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-gold-600">Office</dt>
                  <dd className="text-lg text-forest-900">
                    Compass
                    <br />
                    {agent.office[0]}
                    <br />
                    {agent.office[1]}
                  </dd>
                  <dd className="mt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(agent.office.join(", "))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm tracking-[0.14em] text-forest-900 uppercase underline decoration-gold-500 underline-offset-4 hover:text-gold-600"
                    >
                      Get directions ↗
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-gold-600">Follow</dt>
                  <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-2">
                    {socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-forest-900 hover:text-gold-600">
                        {s.label}
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
