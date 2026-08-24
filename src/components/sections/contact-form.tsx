"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/i18n/language-provider";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const FIELD_CLASS =
  "w-full rounded-sm border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-soft/50 outline-none transition-colors duration-150 focus:border-terracotta/60";

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

export function ContactForm() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!FORMSPREE_ENDPOINT) {
      console.error("NEXT_PUBLIC_FORMSPREE_ENDPOINT is not set");
      setError(true);
      return;
    }

    setSending(true);
    setError(false);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error("send_failed");
      setSubmitted(true);
    } catch {
      setError(true);
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="contacte" className="bg-cream px-6 py-24 md:py-28">
      <RevealGroup className="mx-auto max-w-xl text-center">
        <RevealItem>
          <span className="text-sm font-semibold uppercase tracking-wide text-sage">
            {t.contact.eyebrow}
          </span>
        </RevealItem>
        <RevealItem>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
            {t.contact.title}
          </h2>
        </RevealItem>
        <RevealItem>
          <p className="mt-3 text-base leading-relaxed text-ink-soft">{t.contact.subtitle}</p>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="mx-auto mt-10 max-w-xl">
        <RevealItem className="rounded-card border border-ink/8 bg-surface p-7 shadow-[0_1px_3px_rgba(43,36,32,0.05)] md:p-9">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                className="py-8 text-center"
              >
                <div className="font-display text-2xl text-ink">{t.contact.successTitle}</div>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {t.contact.successMessage}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.25, ease: EASE_OUT } }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-left text-sm text-ink">
                    {t.contact.nameLabel}
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={t.contact.namePlaceholder}
                      className={FIELD_CLASS}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-left text-sm text-ink">
                    {t.contact.emailLabel}
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder={t.contact.emailPlaceholder}
                      className={FIELD_CLASS}
                    />
                  </label>
                </div>
                <label className="flex flex-col gap-1.5 text-left text-sm text-ink">
                  {t.contact.schoolLabel}
                  <input
                    type="text"
                    name="school"
                    placeholder={t.contact.schoolPlaceholder}
                    className={FIELD_CLASS}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-left text-sm text-ink">
                  {t.contact.messageLabel}
                  <textarea
                    name="message"
                    required
                    rows={4}
                    placeholder={t.contact.messagePlaceholder}
                    className={`${FIELD_CLASS} resize-none`}
                  />
                </label>
                {error && (
                  <p className="text-sm text-terracotta" role="alert">
                    {t.contact.errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 inline-flex items-center justify-center rounded-sm bg-terracotta px-6 py-3 text-[0.95rem] font-medium text-cream shadow-[0_10px_24px_-14px_rgba(181,86,47,0.7)] transition-[transform,background-color] duration-150 ease-[var(--ease-out-strong)] hover:bg-terracotta-hover active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? t.contact.sendingCta : t.contact.submitCta}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
