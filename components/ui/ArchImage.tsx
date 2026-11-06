import Image from "next/image";
import Reveal from "../Reveal";
import type { SiteImage } from "@/content/site";

type ArchImageProps = {
  image: SiteImage;
  alt: string;
  sizes: string;
  className?: string;
  /** offset gold outline behind the photo */
  outline?: "left" | "right" | false;
  position?: string;
  priority?: boolean;
  reveal?: boolean;
};

/** Photo in the site's signature arched frame. */
export default function ArchImage({
  image,
  alt,
  sizes,
  className = "",
  outline = false,
  position = "50% 50%",
  priority = false,
  reveal = true,
}: ArchImageProps) {
  const photo = (
    <Image
      src={image.src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
      style={{ objectPosition: position }}
    />
  );
  return (
    <div className={`relative ${className}`}>
      {outline && (
        <span
          aria-hidden="true"
          className={`arch absolute inset-0 border border-gold-500/70 ${outline === "left" ? "-translate-x-4 -translate-y-4" : "translate-x-4 -translate-y-4"}`}
        />
      )}
      {reveal ? (
        <Reveal variant="wipe" className="arch relative h-full w-full overflow-hidden bg-sand">
          {photo}
        </Reveal>
      ) : (
        <div className="arch relative h-full w-full overflow-hidden bg-sand">{photo}</div>
      )}
    </div>
  );
}
