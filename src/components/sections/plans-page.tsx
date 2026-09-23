"use client";

import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";
import { APP_URLS } from "@/lib/config";

type Stage = "infantil" | "primaria" | "eso";

const STAGES: { key: Stage; color: string; href: string; available: boolean }[] = [
  { key: "infantil", color: "var(--color-sky)", href: APP_URLS.registerInfantil, available: true },
  { key: "primaria", color: "var(--color-terracotta)", href: APP_URLS.register, available: true },
  { key: "eso", color: "var(--color-ink-soft)", href: "/#contacte", available: false },
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
            <div className="flex items-center gap-3">
              <h2 className="font-display text-xl text-ink">{individual.title}</h2>
              <span className="rounded-full bg-sage-tint px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-sage">
                {individual.badge}
              </span>
            </div>
            <p className="mt-2 text-sm text-ink-soft">{individual.description}</p>

            <p className="mt-6 text-xs font-medium uppercase tracking-wide text-ink-soft/70">
              {stageText.prompt}
            </p>
            <div className="mt-2.5 grid grid-cols-3 gap-2">
              {STAGES.map((s) => (
                <Link
                  key={s.key}
                  href={s.href}
                  className="group flex cursor-pointer flex-col items-center gap-1 rounded-sm px-2 py-3 text-center transition-[transform,box-shadow,filter] duration-150 ease-[var(--ease-out-strong)] hover:-translate-y-0.5 hover:brightness-110 active:translate-y-0 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
                  style={{
                    backgroundColor: s.available ? s.color : "var(--color-cream)",
                    border: s.available ? "none" : `1.5px solid ${s.color}`,
                    boxShadow: s.available
                      ? `0 10px 20px -12px color-mix(in srgb, ${s.color} 90%, transparent)`
                      : "none",
                  }}
                >
                  <span
                    className="flex items-center gap-1 text-[0.85rem] font-semibold"
                    style={{ color: s.available ? "var(--color-cream)" : "var(--color-ink)" }}
                  >
                    {stageLabels[s.key]}
                    <ArrowRightIcon
                      size={13}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-150 ease-[var(--ease-out-strong)] group-hover:translate-x-0.5"
                    />
                  </span>
                  <span
                    className="text-[0.62rem] font-medium uppercase tracking-wide"
                    style={{
                      color: s.available ? "var(--color-cream)" : s.color,
                      opacity: s.available ? 0.8 : 1,
                    }}
                  >
                    {s.available ? stageText.available : stageText.soon}
                  </span>
                </Link>
              ))}
            </div>

            <ul className="mt-9 flex flex-col gap-3.5 border-t border-ink/10 pt-8">
              {individual.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <CheckIcon size={18} weight="bold" className="mt-0.5 shrink-0 text-sage" aria-hidden="true" />
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
                  <CheckIcon size={18} weight="bold" className="mt-0.5 shrink-0 text-white/50" aria-hidden="true" />
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
