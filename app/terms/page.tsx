import type { Metadata } from "next";
import { marked } from "marked";
import PageHero from "@/components/PageHero";
import { termsMarkdown } from "@/content/site";

export const metadata: Metadata = { title: "Terms & privacy" };

export default function TermsPage() {
  // Text captured from Stacey's previous site; trusted and rendered at build time
  const html = marked.parse(termsMarkdown, { async: false }) as string;
  return (
    <>
      <PageHero
        eyebrow="Legal"
        crumbs={[{ label: "Terms & privacy" }]}
        title={
          <>
            Privacy policy
            <br />
            <em className="text-gold-300">&amp; terms of use.</em>
          </>
        }
      />
      <section className="bg-ivory py-20 sm:py-28">
        <div className="prose-article mx-auto max-w-3xl px-5 text-base sm:px-8" dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </>
  );
}
