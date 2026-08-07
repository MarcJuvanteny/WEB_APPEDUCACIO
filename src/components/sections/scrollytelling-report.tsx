"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence, type Variants } from "framer-motion";
import { FolderIcon, CloudIcon } from "@phosphor-icons/react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { useScrollytellingEnabled } from "@/lib/use-scrollytelling-enabled";
import { RevealGroup, RevealItem } from "@/components/scroll-reveal";
import type { Dictionary } from "@/lib/i18n/translations";
import {
  AXES,
  CENTER,
  RADIUS,
  CRITERIA_HISTORIES,
  clamp,
  smoothstep,
  polygonPoints,
  criterionInfo,
} from "@/lib/scrollytelling-report-math";

const STAGE_COUNT = 7;
const STAGE_MAX = STAGE_COUNT - 1;
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: EASE_OUT } },
};

const CARD_CLASS =
  "box-border w-full overflow-hidden rounded-card border border-ink/8 bg-surface p-7 shadow-[0_1px_3px_rgba(43,36,32,0.05)]";

export function ScrollytellingReport() {
  const { t } = useLanguage();
  const enabled = useScrollytellingEnabled();

  if (!enabled) {
    return <StaticReport t={t} />;
  }

  return <ScrollytellingReportScene t={t} />;
}

function ScrollytellingReportScene({ t }: { t: Dictionary }) {
  const sceneRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sceneRef, offset: ["start start", "end end"] });
  const [stageFloat, setStageFloat] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStageFloat(clamp(p, 0, 1) * STAGE_MAX);
  });

  const activeStage = Math.round(clamp(stageFloat, 0, STAGE_MAX));
  const stageOp = (idx: number) => 0.15 + 0.85 * (1 - smoothstep(Math.abs(stageFloat - idx) / 0.85));
  const stageOffset = (idx: number) => -clamp((stageFloat - idx) / 0.85, -1, 1) * 34;

  return (
    <section
      id="scrollytelling"
      ref={sceneRef}
      className="relative bg-cream"
      style={{ height: `${STAGE_COUNT * 140}vh` }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-28 z-10 hidden justify-center md:flex"
        aria-hidden="true"
      >
        <span className="inline-flex items-center gap-2 text-sm italic text-ink-soft/45">
          <span aria-hidden="true">↓</span>
          {t.scrolly.startLabel}
        </span>
      </div>

      <div className="mx-auto flex h-full max-w-6xl">
        <div
          className="sticky top-0 hidden h-screen shrink-0 items-center md:flex md:w-6 lg:w-36"
          aria-hidden="true"
        >
          <TimelineRail
            months={t.scrolly.stages.map((s) => s.eyebrow)}
            stageFloat={stageFloat}
          />
        </div>

        <div className="flex flex-1">
          <div
            className="order-2 flex w-[46%] items-center justify-center p-6"
            style={{ position: "sticky", top: 0, height: "100vh" }}
          >
            <FichaColumn t={t.scrolly.card} stageFloat={stageFloat} activeStage={activeStage} />
          </div>

          <div className="order-1 flex w-[54%] flex-col">
            {t.scrolly.stages.map((stage, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-center px-8 md:px-16"
                style={{
                  height: "140vh",
                  opacity: stageOp(idx),
                  transform: `translateY(${stageOffset(idx)}px)`,
                }}
              >
                <div className="mb-3 text-[0.8rem] font-semibold uppercase tracking-wide text-sage">
                  {stage.eyebrow}
                </div>
                <h3 className="mb-3.5 max-w-[460px] font-display text-3xl leading-tight text-ink md:text-4xl">
                  {stage.title}
                </h3>
                <p className="max-w-[420px] text-base leading-relaxed text-ink-soft">
                  {stage.description}
                </p>
                {idx === STAGE_COUNT - 1 && (
                  <p className="mt-6 font-display text-lg italic text-terracotta">
                    {t.scrolly.closingTagline}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Persistent month rail. Dots stay visible from `md:` up (a simple, always
 * legible progress marker); the month text itself is an auxiliary label —
 * small, muted, never competing with the section title — sitting to the
 * LEFT of the dots, and only shows once there's enough room, from `lg:` up.
 */
function TimelineRail({ months, stageFloat }: { months: string[]; stageFloat: number }) {
  return (
    <div className="relative flex flex-col gap-5">
      <div className="absolute top-1 bottom-1 w-px bg-ink/10 left-[3px] lg:left-[125px]" />
      {months.map((month, i) => {
        const active = Math.abs(stageFloat - i) < 0.5;
        return (
          <div key={i} className="relative flex items-center gap-2.5">
            <span
              className="hidden w-28 shrink-0 whitespace-nowrap text-right text-[0.62rem] uppercase tracking-wide transition-all duration-300 lg:inline-block"
              style={{
                color: active ? "var(--color-terracotta)" : "rgba(43,36,32,0.32)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {month}
            </span>
            <span
              className="block h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300"
              style={{
                background: active ? "var(--color-terracotta)" : "rgba(43,36,32,0.22)",
                transform: active ? "scale(1.7)" : "scale(1)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

type CardDict = Dictionary["scrolly"]["card"];

/**
 * The "fitxa de seguiment" card is ONE persistent DOM element across
 * stages 0-4 (empty → radar → informe → evolution → devices) — it never
 * unmounts and remounts between those stages, only its inner content
 * morphs. Stages 5-6 (thumbnail reveal, folder) are conceptually distinct
 * moments and use a fade + small vertical shift when swapping in, per the
 * "never an instant cut" rule.
 */
function FichaColumn({
  t,
  stageFloat,
  activeStage,
}: {
  t: CardDict;
  stageFloat: number;
  activeStage: number;
}) {
  const phase =
    activeStage <= 2
      ? "core"
      : activeStage === 3
        ? "progress"
        : activeStage === 4
          ? "devices"
          : activeStage === 5
            ? "thumbnail"
            : "folder";
  const isCard = phase === "core" || phase === "progress" || phase === "devices";

  return (
    <div className="relative w-full max-w-[420px]">
      <AnimatePresence mode="wait">
        {isCard ? (
          <motion.div
            key="card-group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE_OUT } }}
            className={CARD_CLASS}
            style={{ maxHeight: "calc(100vh - 56px)" }}
          >
            <div className="mb-1 text-xs uppercase tracking-normal text-ink-soft/70">{t.fichaLabel}</div>
            <div className="mb-4 font-display text-2xl text-ink">{t.name}</div>

            <AnimatePresence mode="wait">
              {phase === "core" && (
                <motion.div
                  key="core"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <FichaCoreBody t={t} stageFloat={stageFloat} />
                </motion.div>
              )}
              {phase === "progress" && (
                <motion.div
                  key="progress"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <ProgressBody t={t} stageFloat={stageFloat} />
                </motion.div>
              )}
              {phase === "devices" && (
                <motion.div
                  key="devices"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <DevicesBody t={t} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="bare-group"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } }}
            exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.3, ease: EASE_OUT } }}
            className="flex flex-col items-center"
          >
            <AnimatePresence mode="wait">
              {phase === "thumbnail" && (
                <motion.div
                  key="thumbnail"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <DocumentStackReveal t={t} />
                </motion.div>
              )}
              {phase === "folder" && (
                <motion.div
                  key="folder"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                >
                  <FolderCloud t={t} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Stages "Setembre" → "Desembre" (0-2). One persistent radar whose vertices
 * are recomputed every render straight from the raw, continuous
 * `stageFloat` — no draw-in animation, no remount: the shape simply grows
 * as the user scrolls, exactly in step with their scroll speed, and is
 * already fully settled by the time a stage centers (criterionInfo's own
 * thresholds resolve to clean values at/after each checkpoint).
 */
function FichaCoreBody({ t, stageFloat }: { t: CardDict; stageFloat: number }) {
  const infos = CRITERIA_HISTORIES.map((history) => criterionInfo(history, stageFloat));
  const visibleInfos = infos.filter((info) => info.visible);
  const showEmpty = stageFloat < 0.6;
  const showRadar = stageFloat >= 0.35;
  const showComment = stageFloat >= 1.5;
  const compact = visibleInfos.length >= 3;

  const radarPoints = infos
    .map((info, i) => {
      const v = info.visible ? info.value : 0;
      const x = CENTER.x + AXES[i].dx * RADIUS * v;
      const y = CENTER.y + AXES[i].dy * RADIUS * v;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <>
      {showEmpty && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="border-t border-dashed border-ink/12 py-7 text-sm text-ink-soft/70"
        >
          {t.emptyState}
        </motion.div>
      )}

      {visibleInfos.length > 0 && (
        <motion.div
          layout
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className={compact ? "mb-3 grid grid-cols-2 gap-1.5" : "mb-4 flex flex-col gap-1.5"}
        >
          {infos.map(
            (info, i) =>
              info.visible && (
                <motion.div
                  key={i}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ layout: { duration: 0.45, ease: EASE_OUT }, duration: 0.32, ease: EASE_OUT }}
                  className="flex items-center justify-between rounded-sm bg-cream px-2.5 py-1.5"
                >
                  <span className="truncate text-[0.74rem] text-ink">{t.criteria[i]}</span>
                  <span
                    className="ml-1 shrink-0 font-display text-[0.76rem] font-semibold text-sage"
                    title={info.level ? t.levelFull[info.level] : undefined}
                  >
                    {info.level}
                  </span>
                </motion.div>
              ),
          )}
        </motion.div>
      )}

      {showRadar && (
        <motion.svg
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ layout: { duration: 0.45, ease: EASE_OUT }, opacity: { duration: 0.35, ease: EASE_OUT } }}
          viewBox="0 0 220 200"
          className="mb-1 w-full"
          style={{ height: compact ? 150 : 190 }}
        >
          <polygon points={polygonPoints(0.33)} fill="none" stroke="rgba(43,36,32,0.12)" strokeWidth={1} />
          <polygon points={polygonPoints(0.66)} fill="none" stroke="rgba(43,36,32,0.12)" strokeWidth={1} />
          <polygon points={polygonPoints(1)} fill="none" stroke="rgba(43,36,32,0.15)" strokeWidth={1} />
          {AXES.map((axis, i) => (
            <line
              key={i}
              x1={CENTER.x}
              y1={CENTER.y}
              x2={CENTER.x + axis.dx * RADIUS}
              y2={CENTER.y + axis.dy * RADIUS}
              stroke="rgba(43,36,32,0.1)"
            />
          ))}
          <polygon
            points={radarPoints}
            fill="var(--color-terracotta)"
            fillOpacity={0.35}
            stroke="var(--color-terracotta)"
            strokeWidth={2}
            strokeLinejoin="round"
          />
        </motion.svg>
      )}

      {showComment && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="mb-1 rounded-sm bg-cream p-2.5 text-[0.76rem] leading-snug text-ink-soft"
        >
          <span className="mb-1 block text-[0.62rem] uppercase tracking-wide text-terracotta">
            {t.commentLabel}
          </span>
          <span className="line-clamp-2">{t.commentText}</span>
        </motion.div>
      )}
    </>
  );
}

/** Stage "Gener – Març" — two trimesters overlaid on the same radar, growing from the centre as the section approaches. */
const RADAR_COMPARE = {
  early: [45, 40, 50, 42, 38],
  late: [74, 61, 78, 90, 65],
};

function ProgressBody({ t, stageFloat }: { t: CardDict; stageFloat: number }) {
  const growth = clamp((stageFloat - 2.5) / 0.5, 0, 1);

  const toPoints = (values: number[]) =>
    values
      .map((v, i) => {
        const r = (v / 100) * growth;
        const x = CENTER.x + AXES[i].dx * RADIUS * r;
        const y = CENTER.y + AXES[i].dy * RADIUS * r;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

  return (
    <>
      <div className="mb-3 text-[0.68rem] uppercase tracking-wide text-terracotta">{t.evolutionLabel}</div>

      <svg viewBox="0 0 220 200" className="w-full" style={{ height: 200 }}>
        <polygon points={polygonPoints(0.33)} fill="none" stroke="rgba(43,36,32,0.1)" strokeWidth={1} />
        <polygon points={polygonPoints(0.66)} fill="none" stroke="rgba(43,36,32,0.1)" strokeWidth={1} />
        <polygon points={polygonPoints(1)} fill="none" stroke="rgba(43,36,32,0.13)" strokeWidth={1} />
        {AXES.map((axis, i) => (
          <line
            key={i}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={CENTER.x + axis.dx * RADIUS}
            y2={CENTER.y + axis.dy * RADIUS}
            stroke="rgba(43,36,32,0.08)"
          />
        ))}
        <polygon
          points={toPoints(RADAR_COMPARE.early)}
          fill="none"
          stroke="var(--color-ink-soft)"
          strokeWidth={1.75}
          strokeDasharray="4 3"
          strokeLinejoin="round"
          opacity={0.7}
        />
        <polygon
          points={toPoints(RADAR_COMPARE.late)}
          fill="var(--color-terracotta)"
          fillOpacity={0.32}
          stroke="var(--color-terracotta)"
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      </svg>

      <div className="mt-3 flex items-center justify-center gap-5">
        <span className="flex items-center gap-1.5 text-[0.72rem] text-ink-soft">
          <span className="inline-block h-0 w-3 border-t-[1.75px] border-dashed border-ink-soft" />
          {t.trimesterLabels[0]}
        </span>
        <span className="flex items-center gap-1.5 text-[0.72rem] font-medium text-terracotta">
          <span className="inline-block h-0.5 w-3 rounded-full bg-terracotta" />
          {t.trimesterLabels[2]}
        </span>
      </div>
    </>
  );
}

/** Stage "Abril – Maig" — a phone and a tablet, recognisable at a glance. */
function DevicesBody({ t }: { t: CardDict }) {
  return (
    <>
      <div className="mb-7 text-[0.68rem] uppercase tracking-wide text-terracotta">{t.devicesLabel}</div>

      <div className="relative mx-auto" style={{ width: 260, height: 240 }}>
        <motion.div
          className="absolute rounded-[14px] border-2 border-ink/12 bg-cream/80"
          style={{ width: 168, height: 216, left: 4, top: 4, rotate: -4 }}
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 0.55, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.1 }}
        >
          <div className="p-4">
            <div className="mb-2 h-1.5 w-1/2 rounded-full bg-ink/15" />
            <div className="mb-4 h-1 w-1/3 rounded-full bg-ink/10" />
            <div className="h-16 w-full rounded-md bg-ink/8" />
            <div className="mt-3 h-1 w-full rounded-full bg-ink/10" />
            <div className="mt-1.5 h-1 w-2/3 rounded-full bg-ink/10" />
          </div>
        </motion.div>

        <motion.div
          className="absolute rounded-[22px] border-[2.5px] border-terracotta bg-surface shadow-[0_16px_32px_rgba(43,36,32,0.16)]"
          style={{ width: 118, height: 208, left: 118, top: 22, rotate: 4 }}
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
        >
          <div className="p-3">
            <div className="mb-2 font-display text-[0.8rem] text-ink">{t.name}</div>
            <svg viewBox="0 0 220 200" className="mx-auto h-[62px] w-[68px]">
              <polygon points={polygonPoints(1)} fill="none" stroke="rgba(43,36,32,0.15)" strokeWidth={2} />
              <polygon
                points="110,44 178,86 152,164 68,164 42,86"
                fill="var(--color-terracotta)"
                fillOpacity={0.35}
                stroke="var(--color-terracotta)"
                strokeWidth={2.5}
              />
            </svg>
            <div className="mt-2 flex h-6 items-end gap-1">
              <div className="h-[60%] w-full rounded-sm bg-terracotta" />
              <div className="h-[90%] w-full rounded-sm bg-terracotta" />
              <div className="h-[45%] w-full rounded-sm bg-sage" />
            </div>
          </div>
          <div className="absolute bottom-2.5 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-ink/15" />
        </motion.div>
      </div>
    </>
  );
}

/** Stage "Setembre següent" — minimal: a folder, a cloud, honestly labelled as not-yet-built. */
function FolderCloud({ t }: { t: CardDict }) {
  return (
    <>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="mb-6 inline-flex items-center rounded-full border border-sage/30 bg-sage-tint px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wide text-sage"
      >
        {t.comingSoonLabel}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 12, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.12 }}
        className="relative flex h-[320px] w-[320px] items-center justify-center"
      >
        <FolderIcon size={260} weight="regular" className="text-ink-soft/55" />
        <CloudIcon size={100} weight="regular" className="absolute -top-6 right-0 text-sage" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.25 }}
        className="mt-5 text-center text-[0.8rem] text-ink-soft/70"
      >
        {t.archiveCaption}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.35 }}
        className="mt-3 max-w-[280px] text-center text-[0.8rem] text-ink-soft/70"
      >
        {t.returnNote}
      </motion.div>
    </>
  );
}

/** Stage "Juny" — loose documents pile up, then settle into the finished report. */
const DOC_SCATTER = [
  { x: -90, y: -55, r: -13 },
  { x: 95, y: -70, r: 11 },
  { x: -85, y: 60, r: 8 },
  { x: 90, y: 55, r: -9 },
];
const DOC_STACK_OFFSETS = [
  { y: -6, r: -2 },
  { y: -2, r: 1 },
  { y: 2, r: -1 },
  { y: 6, r: 2 },
];
const DOC_STAGGER = 0.24;
const DOC_DURATION = 1.05;
const STACK_HOLD_MS = 550;
const REVEAL_DELAY_MS = Math.round((DOC_STAGGER * (DOC_SCATTER.length - 1) + DOC_DURATION) * 1000) + STACK_HOLD_MS;

function DocumentStackReveal({ t }: { t: CardDict }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), REVEAL_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.span
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        className="mb-6 block text-center text-[0.68rem] uppercase tracking-wide text-terracotta"
      >
        {t.climaxLabel}
      </motion.span>

      <div className="relative mx-auto" style={{ width: 280, height: 360 }}>
        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div
              key="stack"
              className="absolute inset-0"
              exit={{ opacity: 0, transition: { duration: 0.35, ease: EASE_OUT } }}
            >
              {DOC_SCATTER.map((doc, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl border border-ink/10 bg-surface p-5 shadow-[0_4px_14px_rgba(43,36,32,0.08)]"
                  initial={{ x: doc.x, y: doc.y, rotate: doc.r, opacity: 0 }}
                  animate={{
                    x: 0,
                    y: DOC_STACK_OFFSETS[i].y,
                    rotate: DOC_STACK_OFFSETS[i].r,
                    opacity: 1,
                  }}
                  transition={{ duration: DOC_DURATION, ease: EASE_OUT, delay: i * DOC_STAGGER }}
                >
                  <div className="h-2 w-1/2 rounded bg-ink/10" />
                  <div className="mt-2.5 h-1.5 w-1/3 rounded bg-ink/8" />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="thumb"
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <ReportThumbnail t={t} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
          className="mt-6 flex justify-center gap-3"
        >
          <Stat value="5" color="text-terracotta" label={t.stats.competencies} />
          <Stat value="3" color="text-sage" label={t.stats.trimestres} />
          <Stat value="1" color="text-ink" label={t.stats.cursComplet} />
        </motion.div>
      )}
    </>
  );
}

function Stat({ value, color, label }: { value: string; color: string; label: string }) {
  return (
    <div className="rounded-sm bg-cream px-3.5 py-2.5 text-center">
      <div className={`font-display text-lg ${color}`}>{value}</div>
      <div className="text-[0.62rem] text-ink-soft/70">{label}</div>
    </div>
  );
}

const THUMB_BARS = [
  { height: 31, color: "bg-terracotta" },
  { height: 48, color: "bg-terracotta" },
  { height: 22, color: "bg-terracotta/35" },
  { height: 39, color: "bg-terracotta" },
  { height: 53, color: "bg-sage" },
];

function ReportThumbnail({ t }: { t: CardDict }) {
  return (
    <div
      className="box-border overflow-hidden rounded-xl border border-ink/10 bg-surface p-[22px] shadow-[0_8px_24px_rgba(43,36,32,0.12)]"
      style={{ width: 280, height: 360 }}
    >
      <div className="text-[0.62rem] uppercase tracking-wide text-ink-soft/70">{t.piece1.eyebrow}</div>
      <div className="mt-1 font-display text-lg text-ink">{t.piece1.name}</div>
      <div className="mb-4 text-xs text-ink-soft/70">{t.piece1.meta}</div>
      <div className="mb-4 flex items-center gap-4">
        <svg viewBox="0 0 220 200" className="h-[76px] w-[84px] shrink-0">
          <polygon points={polygonPoints(1)} fill="none" stroke="rgba(43,36,32,0.15)" strokeWidth={2} />
          <motion.polygon
            points="110,44 178,86 152,164 68,164 42,86"
            fill="var(--color-sage)"
            fillOpacity={0.4}
            stroke="var(--color-sage)"
            strokeWidth={3}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 0.9, ease: EASE_OUT, delay: 0.2 },
              opacity: { duration: 0.3, delay: 0.2 },
            }}
          />
        </svg>
        <div className="flex h-14 flex-1 items-end gap-1.5">
          {THUMB_BARS.map((bar, i) => (
            <motion.div
              key={i}
              className={`w-full rounded-sm ${bar.color}`}
              initial={{ height: 0 }}
              animate={{ height: bar.height }}
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 + i * 0.07 }}
            />
          ))}
        </div>
      </div>
      <div className="mb-2 text-[0.68rem] uppercase tracking-wide text-ink-soft/70">
        {t.piece3.eyebrow}
      </div>
      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="text-[0.72rem] leading-[1.7] text-ink-soft"
      >
        {t.piece3.items.map((line) => (
          <motion.div key={line} variants={rowVariants}>
            {line}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function StaticReport({ t }: { t: Dictionary }) {
  const finalInfos = CRITERIA_HISTORIES.map((history) => criterionInfo(history, STAGE_MAX));
  const radarPoints = finalInfos
    .map((info, i) => {
      const x = CENTER.x + AXES[i].dx * RADIUS * info.value;
      const y = CENTER.y + AXES[i].dy * RADIUS * info.value;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <section id="scrollytelling" className="mx-auto max-w-6xl px-6 py-20">
      <RevealGroup className="mx-auto mb-14 max-w-2xl text-center">
        <RevealItem>
          <span className="text-sm font-semibold uppercase tracking-wide text-sage">
            {t.scrolly.stages[2].eyebrow}
          </span>
        </RevealItem>
        <RevealItem>
          <h2 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
            {t.scrolly.stages[2].title}
          </h2>
        </RevealItem>
      </RevealGroup>

      <RevealGroup className="mx-auto mb-16 grid max-w-3xl grid-cols-1 gap-5 sm:grid-cols-2">
        {t.scrolly.stages.map((stage, idx) => (
          <RevealItem
            key={idx}
            className="rounded-card border border-ink/10 bg-surface p-6"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-terracotta/70">
              {stage.eyebrow}
            </span>
            <h3 className="mt-2 font-display text-lg text-ink">{stage.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{stage.description}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <RevealGroup className="mx-auto max-w-[420px]">
        <RevealItem className="rounded-card border border-ink/8 bg-surface p-9 shadow-[0_1px_3px_rgba(43,36,32,0.05)]">
          <div className="mb-1 text-xs uppercase tracking-normal text-ink-soft/70">{t.scrolly.card.fichaLabel}</div>
          <div className="mb-5 font-display text-2xl text-ink">{t.scrolly.card.name}</div>

          <div className="mb-5 flex flex-col gap-2">
            {finalInfos.map((info, i) => (
              <div key={i} className="flex items-center justify-between rounded-sm bg-cream px-3 py-2">
                <span className="text-[0.8rem] text-ink">{t.scrolly.card.criteria[i]}</span>
                <span className="font-display text-[0.8rem] font-semibold text-sage">{info.level}</span>
              </div>
            ))}
          </div>

          <svg viewBox="0 0 220 200" className="mb-2 w-full" style={{ height: 200 }}>
            <polygon points={polygonPoints(0.33)} fill="none" stroke="rgba(43,36,32,0.12)" strokeWidth={1} />
            <polygon points={polygonPoints(0.66)} fill="none" stroke="rgba(43,36,32,0.12)" strokeWidth={1} />
            <polygon points={polygonPoints(1)} fill="none" stroke="rgba(43,36,32,0.15)" strokeWidth={1} />
            {AXES.map((axis, i) => (
              <line
                key={i}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={CENTER.x + axis.dx * RADIUS}
                y2={CENTER.y + axis.dy * RADIUS}
                stroke="rgba(43,36,32,0.1)"
              />
            ))}
            <polygon
              points={radarPoints}
              fill="var(--color-terracotta)"
              fillOpacity={0.35}
              stroke="var(--color-terracotta)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
          </svg>

          <div className="rounded-sm bg-cream p-3.5 text-[0.8rem] leading-relaxed text-ink-soft">
            <span className="mb-1.5 block text-[0.68rem] uppercase tracking-wide text-terracotta">
              {t.scrolly.card.commentLabel}
            </span>
            {t.scrolly.card.commentText}
          </div>

          <div className="mt-5 border-t border-dashed border-ink/12 pt-4 text-center font-display text-base italic text-terracotta">
            {t.scrolly.closingTagline}
          </div>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
