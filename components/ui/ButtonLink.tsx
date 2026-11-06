import Link from "next/link";

const VARIANTS = {
  gold: "btn-gold shimmer",
  dark: "shimmer bg-forest-900 text-ivory hover:bg-forest-700",
  outline: "border border-gold-500 text-current hover:bg-gold-500 hover:text-forest-950",
  ghost: "text-current underline decoration-gold-500 underline-offset-8 hover:text-gold-600 !px-0",
};

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof VARIANTS;
  arrow?: boolean;
  className?: string;
};

export default function ButtonLink({ href, children, variant = "gold", arrow = true, className = "" }: ButtonLinkProps) {
  const external = /^(https?:|mailto:|tel:)/.test(href);
  const classes = `group inline-flex items-center gap-4 px-8 py-4 text-sm font-semibold tracking-[0.16em] uppercase transition-colors duration-300 ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {arrow && (
        <span aria-hidden="true" className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );
  return external ? (
    <a href={href} className={classes}>
      {content}
    </a>
  ) : (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
