import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { marked } from "marked";
import CtaBand from "@/components/CtaBand";
import ReadingProgress from "@/components/ReadingProgress";
import Reveal from "@/components/Reveal";
import { getPost, images, posts } from "@/content/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/stacey-asks/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  return p ? { title: p.title, description: p.description } : {};
}

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

export default async function ArticlePage({ params }: PageProps<"/stacey-asks/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  // Our own captured articles: trusted content, rendered at build time. External links open in a new tab.
  const html = (marked.parse(post.body, { async: false }) as string).replace(/<a href="http/g, '<a target="_blank" rel="noopener noreferrer" href="http');
  const index = posts.indexOf(post);
  const more = [posts[(index + 1) % posts.length], posts[(index + 2) % posts.length]];

  return (
    <>
      <ReadingProgress targetId="article" />
      <article id="article">
        <header className="bg-forest-900 text-ivory">
          <div className="mx-auto max-w-5xl px-5 pt-36 pb-16 text-center sm:px-8 lg:pt-44">
            <nav aria-label="Breadcrumb" className="enter text-xs tracking-[0.18em] text-ivory/55 uppercase" style={d(100)}>
              <Link href="/" className="hover:text-gold-300">Home</Link>
              <span className="mx-2 text-gold-400">/</span>
              <Link href="/stacey-asks" className="hover:text-gold-300">Stacey Asks</Link>
            </nav>
            <p className="eyebrow enter mt-10 text-gold-300" style={d(200)}>
              <time dateTime={post.iso}>{post.date}</time> · {post.minutes} min read
            </p>
            <h1 className="enter mt-6 font-display text-5xl leading-[1.02] sm:text-7xl" style={d(300)}>
              {post.title}
            </h1>
            <p className="enter mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-ivory/75" style={d(400)}>
              {post.description}
            </p>
            <div className="enter mt-10 flex items-center justify-center gap-4" style={d(500)}>
              <span className="relative size-12 overflow-hidden rounded-full">
                <Image src={images.staceyCard.src} alt="" fill sizes="48px" className="object-cover object-[50%_15%]" />
              </span>
              <span className="text-left text-sm">
                <span className="block text-ivory">Stacey Leahy</span>
                <span className="block text-ivory/55">Compass · Studio City</span>
              </span>
            </div>
          </div>
        </header>

        {post.image && (
          <div className="bg-[linear-gradient(180deg,var(--color-forest-900)_50%,var(--color-ivory)_50%)]">
            <div className="enter-card relative mx-auto aspect-[16/8] max-w-6xl overflow-hidden" style={d(400)}>
              <Image src={post.image.src} alt="" fill priority sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
            </div>
          </div>
        )}

        <div className="bg-ivory py-20 sm:py-24">
          <div
            className="prose-article mx-auto max-w-3xl px-5 first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[5.2rem] first-letter:leading-[0.82] first-letter:text-gold-600 sm:px-8"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {post.sources.length > 0 && (
            <aside className="mx-auto mt-20 max-w-3xl px-5 sm:px-8">
              <h2 className="eyebrow border-b border-forest-900 pb-3 text-forest-900">Sources cited</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {post.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="block border border-forest-900/20 px-3 py-1.5 text-sm text-forest-800 transition-colors hover:border-gold-500 hover:text-gold-600">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <aside className="mx-auto mt-16 flex max-w-3xl items-center gap-6 border-y border-forest-900/15 px-5 py-8 sm:px-8">
            <span className="arch relative h-24 w-20 shrink-0 overflow-hidden">
              <Image src={images.staceyCard.src} alt="Stacey Leahy" fill sizes="80px" className="object-cover object-[50%_15%]" />
            </span>
            <p className="text-ink-soft">
              <span className="block font-display text-2xl text-forest-900">Published by Stacey Leahy</span>
              Compass agent in Studio City, sharing what&apos;s changing in the neighborhoods she knows best.{" "}
              <Link href="/about" className="text-forest-900 underline decoration-gold-500 underline-offset-4 hover:text-gold-600">
                More about Stacey
              </Link>
            </p>
          </aside>
        </div>
      </article>

      <section className="bg-sand py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <h2 className="font-display text-4xl text-forest-900 sm:text-5xl">
            Keep <em className="text-gold-600">reading.</em>
          </h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            {more.map((p, i) => (
              <Reveal as="article" key={p.slug} delay={i * 120} className="group">
                <Link href={`/stacey-asks/${p.slug}`} className="grid grid-cols-[9rem_1fr] gap-6 sm:grid-cols-[12rem_1fr]">
                  {p.image && (
                    <span className="arch-sm relative aspect-[3/4] overflow-hidden">
                      <Image src={p.image.src} alt="" fill sizes="200px" className="object-cover transition-[scale] duration-700 group-hover:scale-105" />
                    </span>
                  )}
                  <span className="self-center">
                    <span className="eyebrow block text-gold-600">{p.date}</span>
                    <span className="mt-2 block font-display text-3xl leading-snug text-forest-900 group-hover:text-gold-600">{p.title}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={<>What does this mean <em className="text-gold-300">for your home?</em></>} />
    </>
  );
}
