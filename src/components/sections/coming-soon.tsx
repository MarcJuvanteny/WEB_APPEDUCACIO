"use client";

import { CloudCheckIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";

export function ComingSoon() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
      <RevealGroup className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-card border border-dashed border-sage/30 bg-sage-tint/40 px-8 py-14 text-center">
        <RevealItem>
          <CloudCheckIcon size={30} weight="regular" className="text-sage" aria-hidden="true" />
        </RevealItem>
        <RevealItem>
          <span className="text-sm font-medium uppercase tracking-wide text-sage">
            {t.comingSoon.eyebrow}
          </span>
        </RevealItem>
        <RevealItem>
          <h2 className="max-w-[26ch] font-display text-2xl leading-tight tracking-tight text-ink md:text-3xl">
            {t.comingSoon.title}
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="max-w-[52ch] leading-relaxed text-ink-soft">{t.comingSoon.description}</p>
        </RevealItem>
        <RevealItem>
          <p className="text-sm text-ink-soft/70">{t.comingSoon.note}</p>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
