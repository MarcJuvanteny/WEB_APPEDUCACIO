"use client";

import Link from "next/link";
import { CheckIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";
import { APP_URLS } from "@/lib/config";

type Stage = "infantil" | "primaria" | "eso";

const STAGES: { key: Stage; color: string; href: string }[] = [
  { key: "infantil", color: "var(--color-sky)", href: "/#contacte" },
  { key: "primaria", color: "var(--color-terracotta)", href: APP_URLS.register },
  { key: "eso", color: "var(--color-ink-soft)", href: "/#contacte" },
];

export function PlansPage() {
  const { t } = useLanguage();
  const { individual, centre, stage: stageText } = t.plansPage;

  const stageLabels: Record<Stage, string> = {
    infantil: stageText.infantil,
    primaria: stageText.primaria,
    eso: stageText.eso,
  };

  return (
    <section className="px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-4xl">
        <RevealGroup className="mx-auto mb-14 max-w-xl text-center">
          <RevealItem>
            <span className="text-sm font-medium uppercase tracking-wide text-terracotta">
              {t.plansPage.eyebrow}
            </span>
          </RevealItem>
          <RevealItem>
            <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
              {t.plansPage.title}
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t.plansPage.subtitle}</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="grid grid-cols-1 gap-7 sm:grid-cols-2">
          <RevealItem className="flex flex-col rounded-card border border-ink/8 bg-surface p-10">
            <h2 className="font-display text-xl text-ink">{individual.title}</h2>
            <p className="mt-2 text-sm text-ink-soft">{individual.description}</p>
            <div className="mt-6 font-display text-4xl text-ink">
              {individual.price}{" "}
              <span className="font-sans text-base text-ink-soft/70">{individual.period}</span>
            </div>

            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-ink-soft/70">
              {stageText.prompt}
            </p>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {STAGES.map((s) => {
                const isPrimaria = s.key === "primaria";
                return (
                  <Link
                    key={s.key}
                    href={s.href}
                    className="flex flex-col items-center gap-1 rounded-sm px-2 py-2.5 text-center transition-transform duration-150 ease-[var(--ease-out-strong)] active:scale-[0.97]"
                    style={{
                      backgroundColor: isPrimaria ? "var(--color-terracotta)" : "var(--color-cream)",
                      border: isPrimaria ? "none" : `1.5px solid ${s.color}`,
                    }}
                  >
                    <span
                      className="text-[0.8rem] font-semibold"
                      style={{ color: isPrimaria ? "var(--color-cream)" : "var(--color-ink)" }}
                    >
                      {stageLabels[s.key]}
                    </span>
                    <span
                      className="text-[0.62rem] font-medium uppercase tracking-wide"
                      style={{ color: isPrimaria ? "var(--color-cream)" : s.color }}
                    >
                      {isPrimaria ? stageText.available : stageText.soon}
                    </span>
                  </Link>
                );
              })}
            </div>

            <ul className="mt-9 flex flex-col gap-3.5 border-t border-ink/10 pt-8">
              {individual.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <CheckIcon size={18} weight="bold" className="mt-0.5 shrink-0 text-sage" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </RevealItem>

          <RevealItem className="flex flex-col rounded-card bg-ink p-10 text-white">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl">{centre.title}</h2>
              <span className="rounded-full bg-white/10 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white">
                {centre.badge}
              </span>
            </div>
            <p className="mt-2 text-sm text-white/65">{centre.description}</p>
            <p className="mt-6 text-sm text-white/50">{centre.note}</p>
            <ul className="mt-9 flex flex-col gap-3.5 border-t border-white/15 pt-8">
              {centre.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-white/70">
                  <CheckIcon size={18} weight="bold" className="mt-0.5 shrink-0 text-white/50" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
