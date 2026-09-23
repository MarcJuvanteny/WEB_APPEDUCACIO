"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";

export function Pricing() {
  const { t } = useLanguage();

  return (
    <section className="bg-cream-deep px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <RevealGroup className="mx-auto mb-14 max-w-xl text-center">
          <RevealItem>
            <span className="text-sm font-medium uppercase tracking-wide text-terracotta">
              {t.pricing.eyebrow}
            </span>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
              {t.pricing.title}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <RevealItem className="flex flex-col rounded-card border border-ink/8 bg-surface p-10">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-2xl text-ink">{t.pricing.individual.title}</h3>
              <span className="rounded-full bg-sage-tint px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-sage">
                {t.pricing.individual.badge}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              {t.pricing.individual.description}
            </p>
            <div className="mt-auto pt-10">
              <Button href="/registre" variant="primary">
                {t.pricing.individual.cta}
              </Button>
            </div>
          </RevealItem>

          <RevealItem className="flex flex-col rounded-card bg-ink p-10 text-white">
            <div className="flex items-center gap-3">
              <h3 className="font-display text-2xl">{t.pricing.centre.title}</h3>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white">
                {t.pricing.centre.badge}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-white/65">{t.pricing.centre.description}</p>
            <p className="mt-auto pt-10 text-sm text-white/50">{t.pricing.centre.note}</p>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
