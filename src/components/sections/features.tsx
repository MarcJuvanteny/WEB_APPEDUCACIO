"use client";

import { UsersThreeIcon, TargetIcon, CalendarBlankIcon, SparkleIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";

const ICONS = [UsersThreeIcon, TargetIcon, CalendarBlankIcon, SparkleIcon];
const SPANS = ["md:col-span-2", "md:col-span-1", "md:col-span-1", "md:col-span-2"];

export function Features() {
  const { t } = useLanguage();

  return (
    <section className="border-t border-ink/10 bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
        <RevealGroup>
          <RevealItem>
            <span className="block text-center text-sm font-medium uppercase tracking-wide text-terracotta">
              {t.features.eyebrow}
            </span>
          </RevealItem>
          <RevealItem>
            <h2 className="mx-auto mt-3 max-w-[38ch] text-center font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
              {t.features.title}
            </h2>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
          {t.features.items.map((item, index) => {
            const Icon = ICONS[index];
            return (
              <RevealItem
                key={index}
                className={`${SPANS[index]} rounded-card border border-ink/10 bg-cream p-8 transition-[transform,border-color] duration-200 ease-[var(--ease-out-strong)] hover:-translate-y-1 hover:border-terracotta/25`}
              >
                <Icon size={26} weight="regular" className="text-sage" aria-hidden="true" />
                <h3 className="mt-5 font-display text-xl tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2.5 max-w-[42ch] leading-relaxed text-ink-soft">{item.description}</p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
