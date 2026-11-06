"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { signIn } from "@/lib/demo-account";

function useNext() {
  const next = useSearchParams().get("next");
  return next && next.startsWith("/") ? next : "/account";
}

function GoogleButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 border border-forest-900/20 px-6 py-4 text-sm font-medium text-forest-900 transition-colors hover:border-gold-500 hover:bg-sand"
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.3H12v4.3h5.9a5 5 0 0 1-2.2 3.3v2.8h3.6c2-1.9 3.2-4.7 3.2-8.1Z" />
        <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.8c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.1v2.9A11 11 0 0 0 12 23Z" />
        <path fill="#FBBC05" d="M5.8 14.1a6.6 6.6 0 0 1 0-4.2V7H2.1a11 11 0 0 0 0 10l3.7-2.9Z" />
        <path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.2-3.2A11 11 0 0 0 2.1 7l3.7 2.9C6.7 7.3 9.1 5.4 12 5.4Z" />
      </svg>
      Continue with Google
    </button>
  );
}

function Divider() {
  return (
    <p className="my-8 flex items-center gap-4 text-xs tracking-[0.2em] text-ink-soft uppercase">
      <span className="h-px flex-1 bg-forest-900/15" />
      or with email
      <span className="h-px flex-1 bg-forest-900/15" />
    </p>
  );
}

function PasswordField({ label, autoComplete, onChange }: { label: string; autoComplete: string; onChange?: (v: string) => void }) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="block">
      <span className="eyebrow text-gold-600">{label}</span>
      <span className="relative block">
        <input
          type={visible ? "text" : "password"}
          required
          minLength={8}
          autoComplete={autoComplete}
          onChange={(e) => onChange?.(e.target.value)}
          className="field pr-16 text-ink"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-0 -translate-y-1/2 text-xs tracking-[0.14em] text-ink-soft uppercase hover:text-gold-600"
        >
          {visible ? "Hide" : "Show"}
        </button>
      </span>
    </label>
  );
}

function Submit({ children, busy }: { children: React.ReactNode; busy: boolean }) {
  return (
    <button type="submit" disabled={busy} className="btn-gold shimmer flex w-full items-center justify-center gap-3 px-8 py-4 text-sm font-semibold tracking-[0.16em] uppercase disabled:opacity-70">
      {busy ? <span className="size-4 animate-spin rounded-full border-2 border-forest-950/30 border-t-forest-950" /> : null}
      {children}
    </button>
  );
}

/** Simulated network delay so the demo feels like the real thing. */
const pause = () => new Promise((r) => setTimeout(r, 700));

export function LoginForm() {
  const router = useRouter();
  const next = useNext();
  const [busy, setBusy] = useState(false);

  return (
    <>
      <GoogleButton
        onClick={() => {
          signIn("guest@gmail.com", "Guest");
          router.push(next);
        }}
      />
      <Divider />
      <form
        className="space-y-7"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          await pause();
          signIn(String(new FormData(e.currentTarget).get("email")));
          router.push(next);
        }}
      >
        <label className="block">
          <span className="eyebrow text-gold-600">Email</span>
          <input name="email" type="email" required autoComplete="email" className="field text-ink" />
        </label>
        <PasswordField label="Password" autoComplete="current-password" />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-ink-soft">
            <input type="checkbox" defaultChecked className="size-4 accent-forest-900" />
            Keep me signed in
          </label>
          <Link href="/forgot-password" className="text-forest-900 underline decoration-gold-500 underline-offset-4 hover:text-gold-600">
            Forgot password?
          </Link>
        </div>
        <Submit busy={busy}>Sign in</Submit>
      </form>
      <p className="mt-8 text-center text-ink-soft">
        New here?{" "}
        <Link href="/signup" className="font-medium text-forest-900 underline decoration-gold-500 underline-offset-4 hover:text-gold-600">
          Create an account
        </Link>
      </p>
    </>
  );
}

function strength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) || /[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

export function SignupForm() {
  const router = useRouter();
  const next = useNext();
  const [busy, setBusy] = useState(false);
  const [pw, setPw] = useState("");
  const [goal, setGoal] = useState("Buying");
  const s = strength(pw);

  return (
    <>
      <GoogleButton
        onClick={() => {
          signIn("guest@gmail.com", "Guest");
          router.push(next);
        }}
      />
      <Divider />
      <form
        className="space-y-7"
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          await pause();
          const data = new FormData(e.currentTarget);
          signIn(String(data.get("email")), String(data.get("name")));
          router.push(next);
        }}
      >
        <label className="block">
          <span className="eyebrow text-gold-600">Full name</span>
          <input name="name" required autoComplete="name" className="field text-ink" />
        </label>
        <label className="block">
          <span className="eyebrow text-gold-600">Email</span>
          <input name="email" type="email" required autoComplete="email" className="field text-ink" />
        </label>
        <div>
          <PasswordField label="Password" autoComplete="new-password" onChange={setPw} />
          <div className="mt-3 flex gap-1.5" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`h-1 flex-1 transition-colors duration-300 ${i < s ? (s < 3 ? "bg-gold-400" : "bg-forest-700") : "bg-forest-900/10"}`} />
            ))}
          </div>
          <p className="mt-2 text-xs text-ink-soft" aria-live="polite">
            {pw ? ["Too short", "Weak", "Fair", "Good", "Strong"][s] : "At least 8 characters"}
          </p>
        </div>
        <fieldset>
          <legend className="eyebrow text-gold-600">I&apos;m mostly</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Buying", "Selling", "Both", "Just browsing"].map((g) => (
              <label key={g} className={`cursor-pointer px-4 py-2 text-sm transition-colors ${goal === g ? "bg-forest-900 text-ivory" : "border border-forest-900/20 text-forest-800 hover:border-gold-500"}`}>
                <input type="radio" name="goal" value={g} checked={goal === g} onChange={() => setGoal(g)} className="sr-only" />
                {g}
              </label>
            ))}
          </div>
        </fieldset>
        <label className="flex items-start gap-3 text-sm text-ink-soft">
          <input type="checkbox" required className="mt-0.5 size-4 accent-forest-900" />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-forest-900 underline decoration-gold-500 underline-offset-4">
              terms &amp; privacy policy
            </Link>
            .
          </span>
        </label>
        <Submit busy={busy}>Create account</Submit>
      </form>
      <p className="mt-8 text-center text-ink-soft">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-forest-900 underline decoration-gold-500 underline-offset-4 hover:text-gold-600">
          Sign in
        </Link>
      </p>
    </>
  );
}

export function ForgotForm() {
  const [busy, setBusy] = useState(false);
  const [sentTo, setSentTo] = useState<string | null>(null);

  if (sentTo) {
    return (
      <div role="status" className="enter">
        <p className="font-display text-3xl text-forest-900">Check your inbox.</p>
        <p className="mt-3 text-ink-soft">
          If an account exists for <span className="text-forest-900">{sentTo}</span>, a reset link is on its way.
        </p>
        <Link href="/login" className="mt-8 inline-block text-sm tracking-[0.16em] text-forest-900 uppercase underline decoration-gold-500 underline-offset-8">
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form
      className="space-y-7"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        await pause();
        setSentTo(String(new FormData(e.currentTarget).get("email")));
      }}
    >
      <label className="block">
        <span className="eyebrow text-gold-600">Email</span>
        <input name="email" type="email" required autoComplete="email" className="field text-ink" />
      </label>
      <Submit busy={busy}>Send reset link</Submit>
      <p className="text-center text-ink-soft">
        <Link href="/login" className="text-forest-900 underline decoration-gold-500 underline-offset-4 hover:text-gold-600">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
