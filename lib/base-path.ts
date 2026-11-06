/**
 * Path prefix the site is served under. Empty locally and on Vercel; "/staceyleahy" on GitHub Pages
 * (set by the deploy workflow). Links get it automatically; raw asset URLs go through `asset()`.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return path.startsWith("/") && !path.startsWith(`${basePath}/`) ? `${basePath}${path}` : path;
}
