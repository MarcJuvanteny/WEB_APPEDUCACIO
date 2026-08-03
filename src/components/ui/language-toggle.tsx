"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-provider";
import type { Locale } from "@/lib/i18n/translations";

const OPTIONS: { locale: Locale; label: string }[] = [
  { locale: "ca", label: "CA" },
  { locale: "es", label: "ES" },
];

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="relative flex items-center rounded-sm border border-ink/12 bg-surface p-0.5 text-sm"
    >
      {OPTIONS.map((option) => {
        const active = option.locale === locale;
        return (
          <button
            key={option.locale}
            type="button"
            onClick={() => setLocale(option.locale)}
            aria-pressed={active}
            className="relative z-10 px-2.5 py-1 font-medium transition-colors duration-150"
            style={{ color: active ? "var(--color-cream)" : "var(--color-ink-soft)" }}
          >
            {active && (
              <motion.span
                layoutId="language-toggle-pill"
                className="absolute inset-0 -z-10 rounded-[6px] bg-terracotta"
                transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
