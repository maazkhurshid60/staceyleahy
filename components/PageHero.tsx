import Image from "next/image";
import Link from "next/link";
import type { SiteImage } from "@/content/site";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: SiteImage;
  imageAlt?: string;
  crumbs?: { label: string; href?: string }[];
  children?: React.ReactNode;
};

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Deep-emerald opening for inner pages: big serif title on the left, arched photo on the right. */
export default function PageHero({ eyebrow, title, intro, image, imageAlt = "", crumbs, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-900 text-ivory">
      <div
        aria-hidden="true"
        className="absolute -top-40 -right-40 -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgb(201_164_92/0.16),transparent_65%)]"
      />
      <div className="mx-auto grid max-w-[1440px] items-end gap-12 px-5 pt-36 pb-20 sm:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20 lg:px-14 lg:pt-44 lg:pb-28">
        <div>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="enter mb-10 text-xs tracking-[0.18em] text-ivory/55 uppercase" style={d(100)}>
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link href="/" className="hover:text-gold-300">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <span className="text-gold-500" aria-hidden="true">/</span>
                    {c.href ? (
                      <Link href={c.href} className="hover:text-gold-300">
                        {c.label}
                      </Link>
                    ) : (
                      <span aria-current="page" className="text-ivory/85">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}
          <p className="eyebrow enter flex items-center gap-4 text-gold-300" style={d(200)}>
            <span className="enter-line block h-px w-12 bg-gold-400" style={d(300)} />
            {eyebrow}
          </p>
          <h1 className="enter mt-6 font-display text-[2.7rem] leading-[0.95] font-medium tracking-[-0.01em] sm:text-7xl xl:text-[4.6rem]" style={d(320)}>
            {title}
          </h1>
          {intro && (
            <p className="enter mt-8 max-w-2xl text-lg leading-relaxed text-ivory/75 sm:text-xl" style={d(480)}>
              {intro}
            </p>
          )}
          {children && (
            <div className="enter mt-10" style={d(600)}>
              {children}
            </div>
          )}
        </div>

        {image && (
          <div className="enter-card relative mx-auto hidden aspect-[3/4] w-full max-w-sm lg:block" style={d(400)}>
            <span aria-hidden="true" className="arch absolute inset-0 translate-x-5 -translate-y-5 border border-gold-500/60" />
            <div className="arch relative h-full w-full overflow-hidden">
              <Image src={image.src} alt={imageAlt} fill priority sizes="(min-width: 1024px) 28vw, 0px" className="ken-burns object-cover" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
