"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <RevealGroup>
        <RevealItem>
          <h2 className="block text-center text-sm font-medium uppercase tracking-wide text-terracotta">
            {t.testimonials.eyebrow}
          </h2>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {t.testimonials.items.map((item, index) => (
          <RevealItem
            key={index}
            className="rounded-card border border-ink/8 bg-surface p-8"
          >
            <p className="font-display text-lg italic leading-relaxed text-ink">
              “{item.quote}”
            </p>
            <p className="mt-5 text-[0.8rem] text-ink-soft/70">{item.author}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
