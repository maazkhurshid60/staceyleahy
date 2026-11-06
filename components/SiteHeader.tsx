"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { nav } from "@/content/site";
import { initials, useAccount } from "@/lib/demo-account";

export default function SiteHeader() {
  const pathname = usePathname();
  const account = useAccount();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // Close the mobile menu whenever the route changes
  if (openedAt !== pathname) {
    setOpenedAt(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  // Sign-in pages open on a light panel, so the header can't start transparent there
  const solid = scrolled || menuOpen || ["/login", "/signup", "/forgot-password"].includes(pathname);
  const accountHref = account ? "/account" : "/login";

  return (
    <header
      className={`enter-down fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,padding] duration-500 ease-out-soft ${
        solid
          ? "bg-forest-900/95 py-3 shadow-[0_10px_30px_-20px_rgb(0_0_0/0.8)] backdrop-blur"
          : "bg-transparent py-5 lg:py-7"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-14">
        <Link href="/" aria-label="Stacey Leahy Homes, home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`relative text-[0.95rem] font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:bg-gold-400 after:transition-transform hover:text-ivory hover:after:scale-x-100 ${
                isActive(item.href) ? "text-ivory after:scale-x-100" : "text-ivory/80 after:scale-x-0"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={accountHref}
            aria-label={account ? `Your account, ${account.name}` : "Sign in"}
            className="flex items-center gap-2 text-[0.95rem] font-medium text-ivory/80 transition-colors hover:text-gold-300"
          >
            {account ? (
              <span className="flex size-9 items-center justify-center rounded-full bg-gold-400 text-xs font-semibold text-forest-950">
                {initials(account.name)}
              </span>
            ) : (
              <>
                <UserIcon />
                Sign in
              </>
            )}
          </Link>
          <Link
            href="/contact"
            className="shimmer border border-gold-500 px-7 py-3 text-[0.95rem] font-medium text-ivory transition-colors duration-300 hover:bg-gold-500 hover:text-forest-950"
          >
            Let&apos;s Talk
          </Link>
        </nav>

        <div className="flex items-center gap-3 xl:hidden">
          <Link href={accountHref} aria-label={account ? "Your account" : "Sign in"} className="flex size-11 items-center justify-center text-ivory">
            {account ? (
              <span className="flex size-9 items-center justify-center rounded-full bg-gold-400 text-xs font-semibold text-forest-950">
                {initials(account.name)}
              </span>
            ) : (
              <UserIcon />
            )}
          </Link>
          <button
            type="button"
            className="flex size-11 flex-col items-center justify-center gap-1.5 border border-gold-500/70"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`h-px w-5 bg-ivory transition-transform ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-ivory transition-transform ${menuOpen ? "translate-y-[-3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="h-[calc(100dvh-4.5rem)] overflow-y-auto bg-forest-900 px-5 pt-8 pb-12 sm:px-8 xl:hidden"
      >
        <ul className="flex flex-col">
          {nav.map((item, i) => (
            <li key={item.href} className="enter border-b border-ivory/10" style={{ "--d": `${i * 50}ms` } as React.CSSProperties}>
              <Link
                href={item.href}
                className={`flex items-center justify-between py-4 font-display text-3xl hover:text-gold-300 ${isActive(item.href) ? "text-gold-300" : "text-ivory"}`}
              >
                {item.label}
                <span aria-hidden="true" className="text-xl text-gold-400">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/contact" className="btn-gold px-8 py-4 text-sm font-semibold tracking-[0.16em] uppercase">
            Let&apos;s Talk
          </Link>
          <Link href={accountHref} className="border border-gold-500 px-8 py-4 text-sm font-semibold tracking-[0.16em] text-ivory uppercase">
            {account ? "Your account" : "Sign in"}
          </Link>
        </div>
      </nav>
    </header>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 20c1.2-3.6 4-5.5 7-5.5s5.8 1.9 7 5.5" />
    </svg>
  );
}
