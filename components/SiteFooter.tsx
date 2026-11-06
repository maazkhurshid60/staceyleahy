import Link from "next/link";
import Year from "./Year";
import NewsletterForm from "./NewsletterForm";
import { agent, nav, neighborhoods, socials } from "@/content/site";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-950 text-ivory/80">
      <div className="mx-auto max-w-[1440px] px-5 pt-24 pb-10 sm:px-8 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]">
          <div>
            <p className="font-display text-4xl leading-tight text-ivory sm:text-5xl">
              The Neighborhood Edit,
              <br />
              <em className="text-gold-300">in your inbox.</em>
            </p>
            <p className="mt-4 max-w-sm text-ivory/60">
              A short monthly note on what&apos;s opening, what&apos;s selling and what it means for your street.
            </p>
            <NewsletterForm />
          </div>

          <nav aria-label="Explore">
            <p className="eyebrow text-gold-300">Explore</p>
            <ul className="mt-6 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-gold-300">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="transition-colors hover:text-gold-300">
                  Let&apos;s Talk
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Neighborhoods">
            <p className="eyebrow text-gold-300">Neighborhoods</p>
            <ul className="mt-6 space-y-3">
              {neighborhoods.map((n) => (
                <li key={n.slug}>
                  <Link href={`/neighborhoods/${n.slug}`} className="transition-colors hover:text-gold-300">
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-gold-300">Stacey Leahy · Compass</p>
            <address className="mt-6 space-y-1 not-italic">
              <a href={agent.phoneHref} className="block font-display text-2xl text-ivory hover:text-gold-300">
                {agent.phone}
              </a>
              <a href={`mailto:${agent.email}`} className="block hover:text-gold-300">
                {agent.email}
              </a>
              <span className="block pt-3">{agent.office[0]}</span>
              <span className="block">{agent.office[1]}</span>
            </address>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-gold-300">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm">
              <Link href="/login" className="hover:text-gold-300">
                Client sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Oversized wordmark */}
        <p
          aria-hidden="true"
          className="mt-24 text-center font-display text-[12.5vw] leading-[0.8] tracking-[0.04em] whitespace-nowrap text-outline [--stroke:rgb(201_164_92/0.28)] xl:text-[11.5rem]"
        >
          STACEY LEAHY
        </p>

        <div className="mt-12 space-y-4 border-t border-ivory/10 pt-8 text-xs leading-relaxed text-ivory/50">
          <p>
            Stacey Leahy | CA DRE# {agent.dre} · Compass California, Inc. | CA DRE# {agent.brokerageDre}
          </p>
          <p>
            Stacey Leahy is a real estate associate broker licensed by the state of California affiliated with
            Compass. Compass is a real estate broker licensed by the state of California and abides by equal
            housing opportunity laws. All material presented herein is intended for informational purposes only.
            Information is compiled from sources deemed reliable but is subject to errors, omissions, changes in
            price, condition, sale, or withdrawal without notice. No statement is made as to accuracy of any
            description. All measurements and square footages are approximate. This is not intended to solicit
            property already listed. Nothing herein shall be construed as legal, accounting or other professional
            advice outside the realm of real estate brokerage.
          </p>
          <p className="flex flex-wrap justify-between gap-4">
            <span>
              © <Year /> Stacey Leahy Homes. All rights reserved.
            </span>
            <Link href="/terms" className="hover:text-gold-300">
              Terms &amp; privacy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
