import { neighborhoods } from "@/content/site";

const AREAS = [...neighborhoods.map((n) => n.name), "Sherman Oaks", "Encino", "Hancock Park", "North Hollywood"];

/** Slow ticker of the areas Stacey serves, between the hero and the first section. */
export default function AreaMarquee() {
  const row = (
    <ul className="flex shrink-0 items-center">
      {AREAS.map((area) => (
        <li key={area} className="flex items-center whitespace-nowrap">
          <span className="px-8 font-display text-3xl text-forest-900 italic sm:text-4xl">{area}</span>
          <span className="size-1.5 rotate-45 bg-gold-500" />
        </li>
      ))}
    </ul>
  );

  return (
    <div aria-hidden="true" className="group overflow-hidden border-y border-gold-500/30 bg-ivory py-6">
      <div className="flex w-max animate-[marquee_45s_linear_infinite] group-hover:[animation-play-state:paused]">
        {row}
        {row}
      </div>
    </div>
  );
}
