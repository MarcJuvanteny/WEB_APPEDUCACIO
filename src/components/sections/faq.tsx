"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";

export function Faq() {
  const { t } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="border-t border-ink/10 bg-surface px-6 py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <RevealGroup className="mb-12 text-center">
          <RevealItem>
            <span className="text-sm font-medium uppercase tracking-wide text-terracotta">
              {t.faq.eyebrow}
            </span>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
              {t.faq.title}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="flex flex-col gap-3">
          {t.faq.items.map((item) => (
            <RevealItem key={item.question}>
              <details className="group rounded-card border border-ink/8 bg-cream px-6 py-5 open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink marker:content-none">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xl text-ink-soft transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 max-w-[62ch] leading-relaxed text-ink-soft">{item.answer}</p>
              </details>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
