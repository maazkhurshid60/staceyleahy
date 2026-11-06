import Reveal from "./Reveal";

type SectionHeadingProps = {
  number?: string;
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
};

export default function SectionHeading({
  number,
  eyebrow,
  title,
  intro,
  tone = "light",
  align = "left",
}: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal
        as="p"
        variant="fade"
        className={`eyebrow flex items-center gap-4 ${align === "center" ? "justify-center" : ""} ${dark ? "text-gold-300" : "text-gold-600"}`}
      >
        {number && <span className="font-display text-xl tracking-normal">{number}</span>}
        {number && (
          <Reveal as="span" variant="line" delay={150} className={`block h-px w-10 ${dark ? "bg-gold-400" : "bg-gold-500"}`} />
        )}
        {eyebrow}
      </Reveal>
      <Reveal delay={120}>
        <h2 className={`mt-5 font-display text-5xl leading-[1.02] font-medium sm:text-6xl ${dark ? "text-ivory" : "text-forest-900"}`}>
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal as="p" delay={240} className={`mt-6 text-lg leading-relaxed ${dark ? "text-ivory/75" : "text-ink-soft"}`}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}
