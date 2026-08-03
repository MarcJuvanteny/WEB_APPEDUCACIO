"use client";

import { useLanguage } from "@/lib/i18n/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink px-6 py-14 text-white/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
        <span className="font-display text-xl text-white">SeJus</span>
        <div className="flex flex-wrap gap-8 text-sm">
          {t.footer.links.map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/60 transition-colors duration-150 hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>
        <span className="text-sm">{t.footer.rights}</span>
      </div>
    </footer>
  );
}
