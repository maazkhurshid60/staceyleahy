import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { posts } from "@/content/site";

export const metadata: Metadata = {
  title: "Stacey Asks",
  description: "Local reporting from Stacey Leahy on what's opening, what's changing and what it means for homeowners across the Valley and the Westside.",
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default function StaceyAsksPage() {
  const [lead, second, third, ...rest] = posts;

  return (
    <>
      {/* Masthead */}
      <section className="bg-forest-900 text-ivory">
        <div className="mx-auto max-w-[1440px] px-5 pt-36 pb-14 sm:px-8 lg:px-14 lg:pt-44">
          <nav aria-label="Breadcrumb" className="enter text-xs tracking-[0.18em] text-ivory/55 uppercase" style={d(100)}>
            <Link href="/" className="hover:text-gold-300">Home</Link>
            <span className="mx-2 text-gold-400">/</span>
            <span className="text-ivory/85">Stacey Asks</span>
          </nav>
          <div className="mt-10 flex flex-wrap items-end justify-between gap-8 border-b-2 border-gold-400 pb-8">
            <h1 className="enter font-display text-[3.6rem] leading-[0.85] sm:text-[6.5rem] xl:text-[8rem]" style={d(200)}>
              Stacey <em className="text-gold-300">Asks</em>
            </h1>
            <p className="enter max-w-sm text-lg leading-relaxed text-ivory/70" style={d(350)}>
              Local reporting on what&apos;s opening, what&apos;s changing and what it means for your home.
            </p>
          </div>
          <div className="enter flex justify-between py-4 text-xs tracking-[0.2em] text-ivory/55 uppercase" style={d(450)}>
            <span>{posts.length} stories</span>
            <span>The Valley · The Westside · Santa Clarita</span>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 sm:py-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          {/* Lead story */}
          <Reveal as="article" className="group">
            <Link href={`/stacey-asks/${lead.slug}`} className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
              {lead.image && (
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image src={lead.image.src} alt="" fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-[scale] duration-1000 ease-out-soft group-hover:scale-[1.04]" />
                </div>
              )}
              <div>
                <p className="eyebrow text-gold-600">
                  Latest · <time dateTime={lead.iso}>{lead.date}</time> · {lead.minutes} min read
                </p>
                <h2 className="mt-5 font-display text-5xl leading-[1.02] text-forest-900 transition-colors group-hover:text-gold-600 sm:text-6xl">
                  {lead.title}
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-ink-soft">{lead.description}</p>
                <span className="mt-8 inline-flex items-center gap-4 text-sm font-semibold tracking-[0.16em] text-forest-900 uppercase">
                  Read the story
                  <span className="flex size-11 items-center justify-center rounded-full border border-gold-500 transition-all group-hover:bg-gold-500">→</span>
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Two features */}
          <div className="mt-24 grid gap-14 border-t border-forest-900/15 pt-16 md:grid-cols-2">
            {[second, third].map((p, i) => (
              <Reveal as="article" key={p.slug} delay={i * 150} className="group">
                <Link href={`/stacey-asks/${p.slug}`} className="block">
                  {p.image && (
                    <div className="arch-sm relative aspect-[4/3] overflow-hidden">
                      <Image src={p.image.src} alt="" fill sizes="(min-width: 768px) 45vw, 100vw" className="object-cover transition-[scale] duration-1000 ease-out-soft group-hover:scale-[1.04]" />
                    </div>
                  )}
                  <p className="eyebrow mt-6 text-gold-600">
                    <time dateTime={p.iso}>{p.date}</time> · {p.minutes} min read
                  </p>
                  <h2 className="mt-3 font-display text-4xl leading-[1.08] text-forest-900 transition-colors group-hover:text-gold-600">{p.title}</h2>
                  <p className="mt-3 leading-relaxed text-ink-soft">{p.description}</p>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* The archive */}
          <h2 className="mt-28 border-b-2 border-forest-900 pb-4 font-display text-4xl text-forest-900">The archive</h2>
          <ol>
            {rest.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={(i % 4) * 70} className="border-b border-forest-900/15">
                <Link href={`/stacey-asks/${p.slug}`} className="group grid items-center gap-6 py-8 md:grid-cols-[5rem_1fr_14rem_10rem]">
                  <span className="text-outline font-display text-5xl leading-none [--stroke:var(--color-gold-500)]">{String(i + 4).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-3xl leading-snug text-forest-900 transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold-600">
                      {p.title}
                    </span>
                    <span className="mt-2 line-clamp-1 block text-ink-soft">{p.description}</span>
                  </span>
                  <span className="eyebrow text-gold-600">
                    <time dateTime={p.iso}>{p.date}</time>
                  </span>
                  {p.image && (
                    <span className="relative hidden aspect-[4/3] overflow-hidden opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:block">
                      <Image src={p.image.src} alt="" fill sizes="160px" className="object-cover" />
                    </span>
                  )}
                </Link>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand title={<>Have a question <em className="text-gold-300">for Stacey?</em></>} />
    </>
  );
}
