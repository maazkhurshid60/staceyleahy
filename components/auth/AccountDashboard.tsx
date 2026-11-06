"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SaveHomeButton from "../SaveHomeButton";
import { agent, images, listings, neighborhoods, posts } from "@/content/site";
import { initials, signIn, signOut, useAccount } from "@/lib/demo-account";

const TABS = ["Saved homes", "Neighborhoods", "Profile"] as const;

/** Client dashboard (design only, backed by the browser demo account). */
export default function AccountDashboard() {
  const account = useAccount();
  const router = useRouter();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Saved homes");

  if (!account) {
    return (
      <section className="flex min-h-svh items-center justify-center bg-ivory px-5 pt-32 pb-20 text-center">
        <div className="enter max-w-md">
          <p className="eyebrow text-gold-600">Your account</p>
          <h1 className="mt-4 font-display text-5xl text-forest-900">Sign in to see your saved homes.</h1>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/login" className="btn-gold shimmer px-8 py-4 text-sm font-semibold tracking-[0.16em] uppercase">
              Sign in
            </Link>
            <Link href="/signup" className="border border-forest-900 px-8 py-4 text-sm font-semibold tracking-[0.16em] text-forest-900 uppercase hover:bg-forest-900 hover:text-ivory">
              Create account
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const saved = listings.filter((l) => account.saved.includes(l.address));
  const firstName = account.name.split(" ")[0];
  const since = new Date(account.joined).toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return (
    <>
      <section className="bg-forest-900 text-ivory">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-end justify-between gap-8 px-5 pt-36 pb-14 sm:px-8 lg:px-14 lg:pt-44">
          <div className="flex items-center gap-6">
            <span className="enter flex size-20 items-center justify-center rounded-full bg-gold-400 font-display text-3xl text-forest-950">{initials(account.name)}</span>
            <div>
              <p className="eyebrow enter text-gold-300 [--d:100ms]">Member since {since}</p>
              <h1 className="enter mt-2 font-display text-5xl sm:text-7xl [--d:200ms]">
                Welcome, <em className="text-gold-300">{firstName}.</em>
              </h1>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              signOut();
              router.push("/");
            }}
            className="enter border border-gold-500 px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase transition-colors hover:bg-gold-500 hover:text-forest-950 [--d:300ms]"
          >
            Sign out
          </button>
        </div>
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div role="tablist" aria-label="Account sections" className="flex gap-8 border-b border-ivory/15">
            {TABS.map((t) => (
              <button
                key={t}
                type="button"
                role="tab"
                aria-selected={tab === t}
                onClick={() => setTab(t)}
                className={`relative pb-4 text-sm tracking-[0.14em] uppercase transition-colors after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:bg-gold-400 after:transition-transform ${
                  tab === t ? "text-ivory after:scale-x-100" : "text-ivory/55 after:scale-x-0 hover:text-ivory"
                }`}
              >
                {t}
                {t === "Saved homes" && <span className="ml-2 text-gold-300">{saved.length}</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_22rem] lg:px-14">
          <div key={tab} className="enter">
            {tab === "Saved homes" &&
              (saved.length ? (
                <ul className="grid gap-px bg-forest-900/15 sm:grid-cols-2">
                  {saved.map((l) => (
                    <li key={l.address} className="flex flex-col justify-between gap-6 bg-ivory p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-display text-4xl text-forest-900">{l.price}</p>
                          <p className="mt-2 font-display text-2xl text-forest-900">{l.name}</p>
                          <p className="text-sm text-ink-soft">{l.address}</p>
                        </div>
                        <SaveHomeButton id={l.address} label={l.name} className="text-forest-900" />
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-forest-900/10 pt-4 text-sm">
                        <span className="tracking-[0.12em] text-ink-soft uppercase">
                          {l.beds} bd · {l.baths} ba
                        </span>
                        <Link href={`/contact?home=${encodeURIComponent(l.address)}`} className="font-semibold tracking-[0.12em] text-forest-900 uppercase hover:text-gold-600">
                          Ask about a tour →
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState
                  title="No saved homes yet."
                  body="Tap the heart on any home to keep it here, ready to compare and share with Stacey."
                  href="/buy#on-the-market"
                  cta="Browse homes"
                />
              ))}

            {tab === "Neighborhoods" && (
              <ul className="grid gap-6 sm:grid-cols-2">
                {neighborhoods.map((n) => (
                  <li key={n.slug}>
                    <Link href={`/neighborhoods/${n.slug}`} className="group flex items-center gap-5 border border-forest-900/10 p-4 transition-colors hover:border-gold-500">
                      <span className="arch-sm relative h-20 w-16 shrink-0 overflow-hidden">
                        <Image src={n.image.src} alt="" fill sizes="64px" className="object-cover" />
                      </span>
                      <span>
                        <span className="block font-display text-2xl text-forest-900 group-hover:text-gold-600">{n.name}</span>
                        <span className="text-sm text-ink-soft">{n.listings.length} homes on the market</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {tab === "Profile" && (
              <form
                className="grid max-w-xl gap-8"
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData(e.currentTarget);
                  signIn(account.email, String(data.get("name")));
                }}
              >
                <label>
                  <span className="eyebrow text-gold-600">Name</span>
                  <input name="name" defaultValue={account.name} className="field text-ink" />
                </label>
                <label>
                  <span className="eyebrow text-gold-600">Email</span>
                  <input value={account.email} readOnly className="field text-ink-soft" />
                </label>
                <fieldset>
                  <legend className="eyebrow text-gold-600">Email me</legend>
                  <div className="mt-4 space-y-3 text-ink-soft">
                    {["New homes matching my saved searches", "The Neighborhood Edit, monthly", "Price changes on my saved homes"].map((o) => (
                      <label key={o} className="flex items-center gap-3">
                        <input type="checkbox" defaultChecked className="size-4 accent-forest-900" />
                        {o}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <button type="submit" className="btn-gold shimmer justify-self-start px-8 py-4 text-sm font-semibold tracking-[0.16em] uppercase">
                  Save changes
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-8">
            <div className="bg-forest-900 p-8 text-ivory">
              <p className="eyebrow text-gold-300">Your agent</p>
              <div className="mt-6 flex items-center gap-4">
                <span className="arch relative h-20 w-16 shrink-0 overflow-hidden">
                  <Image src={images.staceyCard.src} alt="Stacey Leahy" fill sizes="64px" className="object-cover object-[50%_15%]" />
                </span>
                <div>
                  <p className="font-display text-2xl">Stacey Leahy</p>
                  <p className="text-sm text-ivory/60">Compass · Studio City</p>
                </div>
              </div>
              <div className="mt-6 space-y-2 text-sm">
                <a href={agent.phoneHref} className="block hover:text-gold-300">{agent.phone}</a>
                <a href={`mailto:${agent.email}`} className="block hover:text-gold-300">{agent.email}</a>
              </div>
              <Link href="/contact" className="btn-gold shimmer mt-8 block px-6 py-3 text-center text-xs font-semibold tracking-[0.16em] uppercase">
                Message Stacey
              </Link>
            </div>
            <div>
              <p className="eyebrow text-gold-600">Latest from Stacey Asks</p>
              <Link href={`/stacey-asks/${posts[0].slug}`} className="group mt-3 block font-display text-2xl leading-snug text-forest-900 hover:text-gold-600">
                {posts[0].title} →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function EmptyState({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <div className="flex flex-col items-start border border-dashed border-forest-900/25 p-10 sm:p-14">
      <span className="flex size-16 items-center justify-center rounded-full border border-gold-500 text-gold-600">
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M12 20.5s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6c0 5.7-7.5 10.3-7.5 10.3Z" />
        </svg>
      </span>
      <p className="mt-6 font-display text-4xl text-forest-900">{title}</p>
      <p className="mt-3 max-w-md text-lg text-ink-soft">{body}</p>
      <Link href={href} className="btn-gold shimmer mt-8 px-8 py-4 text-sm font-semibold tracking-[0.16em] uppercase">
        {cta} →
      </Link>
    </div>
  );
}
