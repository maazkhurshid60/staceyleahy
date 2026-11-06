// Design-only account: lives in this browser's localStorage, no server.
// Swap these functions for a real auth provider later; the UI only uses the exports below.
import { useSyncExternalStore } from "react";

export type DemoAccount = {
  name: string;
  email: string;
  joined: string;
  saved: string[]; // listing addresses
};

const KEY = "sl-demo-account";
const EVENT = "sl-demo-account-change";

let cachedRaw: string | null = null;
let cachedValue: DemoAccount | null = null;

function read(): DemoAccount | null {
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    return null;
  }
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedValue = raw ? (JSON.parse(raw) as DemoAccount) : null;
    } catch {
      cachedValue = null;
    }
  }
  return cachedValue;
}

function write(value: DemoAccount | null) {
  try {
    if (value) localStorage.setItem(KEY, JSON.stringify(value));
    else localStorage.removeItem(KEY);
  } catch {
    // storage unavailable (private mode): the demo simply won't remember
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Current demo account, or null when signed out (always null during prerender). */
export function useAccount() {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function signIn(email: string, name?: string) {
  const existing = read();
  const fallback = email.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  write({
    name: name?.trim() || (existing?.email === email ? existing.name : fallback),
    email,
    joined: existing?.email === email ? existing.joined : new Date().toISOString(),
    saved: existing?.email === email ? existing.saved : [],
  });
}

export function signOut() {
  write(null);
}

export function toggleSaved(id: string) {
  const account = read();
  if (!account) return false;
  const saved = account.saved.includes(id) ? account.saved.filter((s) => s !== id) : [...account.saved, id];
  write({ ...account, saved });
  return true;
}

export function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}
