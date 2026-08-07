"use client";

import { motion, type Variants } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-provider";
import { Button } from "@/components/ui/button";

const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto flex min-h-[94vh] max-w-6xl flex-wrap items-center gap-16 px-6 pb-20 pt-28 md:px-10 md:pt-32">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={group}
        className="min-w-[320px] flex-1 basis-[460px]"
      >
        <motion.span
          variants={item}
          className="inline-flex items-center rounded-full border border-sage/25 bg-sage-tint px-3.5 py-1 text-sm font-medium text-sage"
        >
          {t.hero.eyebrow}
        </motion.span>

        <motion.h1
          variants={item}
          className="mt-6 max-w-xl font-display text-4xl leading-[1.15] tracking-tight text-ink md:text-5xl"
        >
          {t.hero.title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-6">
          <Button href="/preus" variant="primary">
            {t.hero.ctaPrimary}
          </Button>
          <a
            href="#scrollytelling"
            className="inline-flex items-center gap-1.5 border-b border-ink/30 pb-0.5 text-[0.95rem] font-medium text-ink transition-colors duration-150 hover:border-terracotta hover:text-terracotta"
          >
            {t.hero.ctaSecondary}
            <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
          {t.hero.badges.map((badge) => (
            <span
              key={badge}
              className="rounded-sm border border-ink/8 bg-surface px-3.5 py-2 text-[0.8rem] font-semibold text-sage"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT }}
        className="flex min-w-[300px] flex-1 basis-[380px] flex-col items-center gap-4"
      >
        <div className="w-full max-w-[420px] rounded-card border border-ink/8 bg-surface p-11 shadow-[0_1px_3px_rgba(43,36,32,0.05)]">
          <div className="mb-4 text-[0.7rem] uppercase tracking-wide text-ink-soft/70">
            {t.hero.card.eyebrow}
          </div>
          <div className="mb-2 text-xs uppercase tracking-normal text-ink-soft/80">
            {t.hero.card.nameLabel}
          </div>
          <div className="mb-6 font-display text-4xl font-medium text-ink">
            {t.hero.card.name}
          </div>
          <div className="mb-6 flex gap-9">
            <div>
              <div className="mb-1.5 text-xs uppercase tracking-wide text-ink-soft/80">
                {t.hero.card.cursLabel}
              </div>
              <div className="font-display text-lg text-ink">{t.hero.card.curs}</div>
            </div>
            <div>
              <div className="mb-1.5 text-xs uppercase tracking-wide text-ink-soft/80">
                {t.hero.card.classeLabel}
              </div>
              <div className="font-display text-lg text-ink">{t.hero.card.classe}</div>
            </div>
          </div>
          <div className="border-t border-dashed border-ink/15 pt-4 text-sm text-ink-soft/70">
            {t.hero.card.footerLine}
          </div>
        </div>
        <p className="font-display text-lg italic text-terracotta">{t.hero.caption}</p>
      </motion.div>
    </section>
  );
}
