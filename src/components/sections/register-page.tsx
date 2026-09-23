"use client";

import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";
import { APP_URLS } from "@/lib/config";

type Stage = "infantil" | "primaria" | "eso";

const STAGES: { key: Stage; color: string; href: string; available: boolean }[] = [
  { key: "infantil", color: "var(--color-sky)", href: APP_URLS.registerInfantil, available: true },
  { key: "primaria", color: "var(--color-terracotta)", href: APP_URLS.register, available: true },
  { key: "eso", color: "var(--color-ink-soft)", href: "/#contacte", available: false },
];

export function RegisterPage() {
  const { t } = useLanguage();
  const r = t.registerPage;

  return (
    <section className="px-6 pb-24 pt-36 md:px-10 md:pb-32 md:pt-44">
      <div className="mx-auto max-w-5xl">
        <RevealGroup className="mx-auto mb-14 max-w-xl text-center">
          <RevealItem>
            <span className="text-sm font-medium uppercase tracking-wide text-terracotta">
              {r.eyebrow}
            </span>
          </RevealItem>
          <RevealItem>
            <h1 className="mt-3 font-display text-3xl leading-tight tracking-tight text-ink md:text-4xl">
              {r.title}
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{r.subtitle}</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {STAGES.map((s) => {
            const stage = r.stages[s.key];
            const fg = s.available ? "var(--color-cream)" : "var(--color-ink)";
            return (
              <RevealItem key={s.key} className="flex">
                <Link
                  href={s.href}
                  className="group flex w-full flex-col rounded-card p-9 transition-transform duration-150 ease-[var(--ease-out-strong)] active:scale-[0.98]"
                  style={{
                    backgroundColor: s.available ? s.color : "var(--color-cream)",
                    border: s.available ? "none" : `1.5px dashed ${s.color}`,
                    color: fg,
                  }}
                >
                  <span
                    className="self-start rounded-full px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-wide"
                    style={{
                      backgroundColor: s.available ? "rgba(246, 242, 234, 0.18)" : "transparent",
                      border: s.available ? "none" : `1px solid ${s.color}`,
                      color: s.available ? "var(--color-cream)" : s.color,
                    }}
                  >
                    {s.available ? r.available : r.soon}
                  </span>

                  <h2 className="mt-8 font-display text-4xl tracking-tight">{stage.name}</h2>
                  <p
                    className="mt-4 text-sm leading-relaxed"
                    style={{ opacity: s.available ? 0.85 : 1, color: s.available ? undefined : "var(--color-ink-soft)" }}
                  >
                    {stage.description}
                  </p>

                  <span
                    className="mt-auto flex items-center gap-2 pt-10 text-[0.95rem] font-semibold"
                    style={{ color: s.available ? "var(--color-cream)" : s.color }}
                  >
                    {s.available ? r.ctaAvailable : r.ctaSoon}
                    <ArrowRightIcon
                      size={18}
                      weight="bold"
                      aria-hidden="true"
                      className="transition-transform duration-150 ease-[var(--ease-out-strong)] group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

      </div>
    </section>
  );
}
