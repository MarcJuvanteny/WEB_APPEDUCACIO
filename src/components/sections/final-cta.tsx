"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { APP_URLS } from "@/lib/config";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";

export function FinalCta() {
  const { t } = useLanguage();

  return (
    <section className="bg-terracotta px-6 py-24 text-center md:py-28">
      <RevealGroup className="mx-auto max-w-2xl">
        <RevealItem>
          <h2 className="font-display text-3xl leading-tight text-cream md:text-4xl">
            {t.finalCta.title}
          </h2>
        </RevealItem>
        <RevealItem>
          <a
            href={APP_URLS.register}
            className="mt-9 inline-flex items-center justify-center rounded-sm bg-cream px-9 py-4 text-[0.95rem] font-bold text-terracotta transition-transform duration-150 ease-[var(--ease-out-strong)] active:scale-[0.97]"
          >
            {t.finalCta.cta}
          </a>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
