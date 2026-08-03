"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import { APP_URLS } from "@/lib/config";

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
          <RevealItem className="rounded-card border border-ink/8 bg-surface p-10">
            <h3 className="font-display text-xl text-ink">{t.pricing.individual.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{t.pricing.individual.description}</p>
            <div className="mt-6 font-display text-4xl text-ink">
              {t.pricing.individual.price}{" "}
              <span className="font-sans text-base text-ink-soft/70">
                {t.pricing.individual.period}
              </span>
            </div>
            <Button href={APP_URLS.register} variant="primary" className="mt-6">
              {t.pricing.individual.cta}
            </Button>
          </RevealItem>

          <RevealItem className="rounded-card bg-ink p-10 text-white">
            <h3 className="font-display text-xl">{t.pricing.centre.title}</h3>
            <p className="mt-2 text-sm text-white/65">{t.pricing.centre.description}</p>
            <div className="mt-6 font-display text-3xl">{t.pricing.centre.price}</div>
            <a
              href="#"
              className="mt-6 inline-flex items-center justify-center rounded-sm bg-white px-5 py-2.5 text-[0.95rem] font-medium text-ink transition-transform duration-150 ease-[var(--ease-out-strong)] active:scale-[0.97]"
            >
              {t.pricing.centre.cta}
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
