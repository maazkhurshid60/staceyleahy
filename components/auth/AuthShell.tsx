import Image from "next/image";
import { images } from "@/content/site";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Split-screen frame for sign in / create account / reset password. */
export default function AuthShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <section className="grid min-h-svh bg-ivory lg:grid-cols-[0.9fr_1.1fr]">
      {/* Image panel */}
      <div className="relative isolate hidden overflow-hidden bg-forest-900 text-ivory lg:flex lg:flex-col lg:justify-end">
        <div aria-hidden="true" className="absolute -top-40 -left-40 -z-10 size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(201_164_92/0.16),transparent_65%)]" />
        <div className="enter-card absolute top-36 right-14 bottom-48 left-14 -z-10" style={d(200)}>
          <span aria-hidden="true" className="arch absolute inset-0 translate-x-4 -translate-y-4 border border-gold-500/50" />
          <div className="arch relative h-full w-full overflow-hidden">
            <Image src={images.auth.src} alt="" fill priority sizes="40vw" className="ken-burns object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-forest-950/60 to-transparent" />
          </div>
        </div>
        <blockquote className="enter relative px-14 pb-14 font-display text-3xl leading-snug italic" style={d(500)}>
          &ldquo;She has also treated us as if we were family.&rdquo;
          <footer className="mt-3 font-sans text-xs tracking-[0.2em] text-gold-300 not-italic uppercase">M. Miller, client</footer>
        </blockquote>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center px-5 pt-32 pb-20 sm:px-10 lg:pt-36">
        <div className="w-full max-w-md">
          <p className="eyebrow enter text-gold-600" style={d(150)}>
            {eyebrow}
          </p>
          <h1 className="enter mt-4 font-display text-5xl leading-[1.02] text-forest-900 sm:text-6xl" style={d(250)}>
            {title}
          </h1>
          <p className="enter mt-4 text-lg text-ink-soft" style={d(350)}>
            {intro}
          </p>
          <div className="enter mt-10" style={d(450)}>
            {children}
          </div>
          <p className="mt-12 border-t border-forest-900/10 pt-6 text-xs leading-relaxed text-ink-soft/80">
            Design preview: accounts are stored only in this browser. No information is sent anywhere.
          </p>
        </div>
      </div>
    </section>
  );
}
