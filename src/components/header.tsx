"use client";

import { useLanguage } from "@/lib/i18n/language-provider";
import { APP_URLS } from "@/lib/config";
import { Logo } from "@/components/ui/logo";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  const { t } = useLanguage();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-cream/50 px-6 py-5 backdrop-blur-md md:px-10">
      <div className="w-[140px] shrink-0 md:w-[220px]" />
      <Logo />
      <div className="flex w-[140px] shrink-0 items-center justify-end gap-3 md:w-[220px] md:gap-4">
        <LanguageToggle />
        <a
          href={APP_URLS.login}
          className="hidden text-sm text-ink transition-colors duration-150 hover:text-terracotta sm:inline"
        >
          {t.header.login}
        </a>
        <Button href="/registre" variant="primary" className="px-4 py-2 text-sm">
          {t.header.register}
        </Button>
      </div>
    </header>
  );
}
