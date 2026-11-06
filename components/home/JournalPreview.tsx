import Image from "next/image";
import Link from "next/link";
import Reveal from "../Reveal";
import { posts } from "@/content/site";

/** Stacey Asks, set like the front of a magazine. */
export default function JournalPreview() {
  const [lead, ...rest] = posts.slice(0, 4);

  return (
    <section id="stacey-asks" className="bg-sand py-28 sm:py-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        {/* Masthead */}
        <Reveal className="flex flex-wrap items-end justify-between gap-6 border-b-2 border-forest-900 pb-6">
          <div>
            <p className="eyebrow flex items-center gap-4 text-gold-600">
              <span className="font-display text-xl tracking-normal">03</span>
              <span className="block h-px w-10 bg-gold-500" />
              The journal
            </p>
            <h2 className="mt-4 font-display text-7xl leading-none text-forest-900 sm:text-8xl lg:text-[6rem]">
              Stacey <em className="text-gold-600">Asks</em>
            </h2>
          </div>
          <p className="max-w-xs text-ink-soft">
            Local reporting on what&apos;s opening, what&apos;s changing and what it means for your home.
          </p>
        </Reveal>
        <div className="flex justify-between border-b border-forest-900/20 py-3 text-xs tracking-[0.2em] text-ink-soft uppercase">
          <span>{posts.length} stories</span>
          <span>The Valley · The Westside · Santa Clarita</span>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal as="article" className="group">
            <Link href={`/stacey-asks/${lead.slug}`} className="block">
              {lead.image && (
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={lead.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 56vw, 100vw"
                    className="object-cover transition-[scale] duration-1000 ease-out-soft group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-5 left-5 bg-gold-400 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.18em] text-forest-950 uppercase">
                    Latest
                  </span>
                </div>
              )}
              <p className="eyebrow mt-7 text-gold-600">
                <time dateTime={lead.iso}>{lead.date}</time> · {lead.minutes} min read
              </p>
              <h3 className="mt-3 font-display text-4xl leading-[1.08] text-forest-900 transition-colors group-hover:text-gold-600 sm:text-5xl">
                {lead.title}
              </h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{lead.description}</p>
            </Link>
          </Reveal>

          <ol>
            {rest.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={150 + i * 120} className="border-b border-forest-900/15 first:border-t lg:first:border-t-0">
                <Link href={`/stacey-asks/${post.slug}`} className="group grid grid-cols-[auto_1fr] gap-6 py-8">
                  <span className="text-outline font-display text-6xl leading-none [--stroke:var(--color-gold-500)]">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="eyebrow block text-gold-600">
                      <time dateTime={post.iso}>{post.date}</time>
                    </span>
                    <span className="mt-2 block font-display text-2xl leading-snug text-forest-900 transition-colors group-hover:text-gold-600 sm:text-[1.7rem]">
                      {post.title}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.14em] text-forest-900 uppercase opacity-70 transition-all group-hover:gap-4 group-hover:opacity-100">
                      Read <span aria-hidden="true">→</span>
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal as="li" delay={500} className="pt-8">
              <Link href="/stacey-asks" className="group inline-flex items-center gap-4 text-sm font-semibold tracking-[0.16em] text-forest-900 uppercase">
                All stories
                <span className="flex size-11 items-center justify-center rounded-full border border-gold-500 transition-all group-hover:bg-gold-500">→</span>
              </Link>
            </Reveal>
          </ol>
        </div>
      </div>
    </section>
  );
}
