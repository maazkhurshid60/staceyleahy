"use client";

import { useRouter } from "next/navigation";
import { toggleSaved, useAccount } from "@/lib/demo-account";

/** Heart toggle on listing cards; signed-out visitors are sent to sign in first. */
export default function SaveHomeButton({ id, label, className = "" }: { id: string; label: string; className?: string }) {
  const account = useAccount();
  const router = useRouter();
  const saved = account?.saved.includes(id) ?? false;

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved homes` : `Save ${label}`}
      title={account ? (saved ? "Saved to your account" : "Save to your account") : "Sign in to save homes"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!toggleSaved(id)) router.push("/login?next=/buy");
      }}
      className={`flex size-11 items-center justify-center rounded-full border transition-all duration-300 hover:scale-110 ${
        saved ? "border-gold-500 bg-gold-500 text-forest-950" : "border-current/30 text-current hover:border-gold-500 hover:text-gold-600"
      } ${className}`}
    >
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6">
        <path d="M12 20.5s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7.5 2.6c0 5.7-7.5 10.3-7.5 10.3Z" />
      </svg>
    </button>
  );
}
