import { asset } from "./base-path";

/** Static hosting has no image optimizer: serve the pre-sized files from /public as they are. */
export default function staticImageLoader({ src, width }: { src: string; width: number }) {
  if (/^https?:\/\//.test(src)) return src;
  return `${asset(src)}?w=${width}`;
}
