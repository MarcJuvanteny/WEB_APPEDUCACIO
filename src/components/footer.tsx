"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/language-provider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-ink px-6 py-14 text-white/60">
      <div className="mx-auto flex max-w-6xl flex-wrap items-start justify-between gap-10">
        <div>
          <span className="font-display text-xl text-white">SeJus</span>
          <p className="mt-2 font-display text-base italic text-white/50">{t.footer.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-x-16 gap-y-8">
          <div className="flex flex-col gap-2 text-sm">
            {t.footer.primaryLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-white/60 transition-colors duration-150 hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2 text-sm">
            {t.footer.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/40 transition-colors duration-150 hover:text-white/70"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-6 text-sm">
        {t.footer.rights}
      </div>
    </footer>
  );
}
