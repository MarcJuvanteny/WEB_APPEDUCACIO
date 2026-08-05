"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, motion, AnimatePresence, type Variants } from "framer-motion";
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
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

const cardVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.08 } },
};
const blockVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};
const rowVariants: Variants = {
  hidden: { opacity: 0, y: 9, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.42, ease: EASE_OUT } },
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
    <section id="scrollytelling" ref={sceneRef} className="relative mx-auto max-w-[1600px]" style={{ height: `${STAGE_COUNT * 140}vh` }}>
      <div className="flex h-full">
        <div className="order-2 flex w-[46%] items-center justify-center p-6" style={{ position: "sticky", top: 0, height: "100vh" }}>
          <FichaStage t={t.scrolly.card} stageIndex={activeStage} />
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

type CardDict = Dictionary["scrolly"]["card"];

/**
 * Renders ONE fully-formed illustration per narrative stage (0-6). Stages
 * never show a partially-faded or mid-construction state once settled:
 * whatever is visible for a given stageIndex ends up at full opacity,
 * complete. Movement (elements drawing/growing/stacking in) only happens
 * while scrolling between stages — never while a stage is centered and
 * being read, since the entrance choreography finishes well within the
 * generous scroll dwell time of each stage.
 */
function FichaStage({ t, stageIndex }: { t: CardDict; stageIndex: number }) {
  const phase =
    stageIndex <= 2
      ? "ficha"
      : stageIndex === 3
        ? "progress"
        : stageIndex === 4
          ? "devices"
          : stageIndex === 5
            ? "thumbnail"
            : "archive";

  const cardExit = { opacity: 0, y: -10, transition: { duration: 0.3, ease: EASE_OUT } };
  const bareExit = { opacity: 0, scale: 0.94, transition: { duration: 0.3, ease: EASE_OUT } };

  return (
    <div className="relative w-full max-w-[420px]">
      <AnimatePresence mode="wait">
        {phase === "ficha" && (
          <motion.div
            key={`ficha-${stageIndex}`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit={cardExit}
            className={CARD_CLASS}
            style={{ maxHeight: "calc(100vh - 56px)" }}
          >
            <FichaContent t={t} stageIndex={stageIndex} />
          </motion.div>
        )}

        {phase === "progress" && (
          <motion.div
            key="progress"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit={cardExit}
            className={CARD_CLASS}
            style={{ maxHeight: "calc(100vh - 56px)" }}
          >
            <ProgressChart t={t} />
          </motion.div>
        )}

        {phase === "devices" && (
          <motion.div
            key="devices"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit={cardExit}
            className={CARD_CLASS}
            style={{ maxHeight: "calc(100vh - 56px)" }}
          >
            <DeviceStack t={t} />
          </motion.div>
        )}

        {phase === "thumbnail" && (
          <motion.div
            key="thumbnail"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit={bareExit}
            className="flex flex-col items-center"
          >
            <DocumentStackReveal t={t} />
          </motion.div>
        )}

        {phase === "archive" && (
          <motion.div
            key="archive"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit={cardExit}
            className="flex flex-col items-center"
          >
            <motion.span
              variants={blockVariants}
              className="mb-6 text-[0.68rem] uppercase tracking-wide text-terracotta"
            >
              {t.climaxLabel}
            </motion.span>
            <motion.svg viewBox="0 0 200 200" className="h-[170px] w-[170px]" variants={listVariants}>
              <motion.ellipse variants={rowVariants} cx={100} cy={158} rx={78} ry={26} fill="#C9C2B4" />
              <motion.ellipse variants={rowVariants} cx={100} cy={122} rx={78} ry={26} fill="#8FA07C" />
              <motion.ellipse
                variants={rowVariants}
                cx={100}
                cy={86}
                rx={78}
                ry={26}
                fill="var(--color-sage)"
              />
              <motion.ellipse
                variants={rowVariants}
                cx={100}
                cy={50}
                rx={78}
                ry={26}
                fill="var(--color-cream)"
                stroke="var(--color-terracotta)"
                strokeWidth={3}
                strokeDasharray="7 6"
              />
            </motion.svg>
            <motion.div
              variants={blockVariants}
              className="mt-3.5 text-center text-[0.8rem] text-ink-soft/70"
            >
              {t.archiveCaption}
            </motion.div>
            <motion.div
              variants={blockVariants}
              className="mt-5 max-w-[300px] text-center text-[0.8rem] text-ink-soft/70"
            >
              {t.returnNote}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FichaContent({ t, stageIndex }: { t: CardDict; stageIndex: number }) {
  const infos = CRITERIA_HISTORIES.map((history) => criterionInfo(history, stageIndex));
  const visibleInfos = infos.filter((info) => info.visible);
  const showChart = stageIndex >= 1;
  const showComment = stageIndex >= 2;

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
      <div className="mb-1 text-xs uppercase tracking-normal text-ink-soft/70">{t.fichaLabel}</div>
      <div className="mb-4 font-display text-2xl text-ink">{t.name}</div>

      {stageIndex === 0 && (
        <motion.div
          variants={blockVariants}
          className="border-t border-dashed border-ink/12 py-7 text-sm text-ink-soft/70"
        >
          {t.emptyState}
        </motion.div>
      )}

      {visibleInfos.length > 0 && (
        <motion.div variants={listVariants} className="mb-4 flex flex-col gap-1.5">
          {infos.map(
            (info, i) =>
              info.visible && (
                <motion.div
                  key={i}
                  variants={rowVariants}
                  className="flex items-center justify-between rounded-sm bg-cream px-3 py-1.5"
                >
                  <span className="text-[0.78rem] text-ink">{t.criteria[i]}</span>
                  <span
                    className="font-display text-[0.78rem] font-semibold text-sage"
                    title={info.level ? t.levelFull[info.level] : undefined}
                  >
                    {info.level}
                  </span>
                </motion.div>
              ),
          )}
        </motion.div>
      )}

      {showChart && (
        <svg viewBox="0 0 220 200" className="mb-1 w-full" style={{ height: 140 }}>
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
          <motion.polygon
            points={radarPoints}
            fill="var(--color-terracotta)"
            fillOpacity={0.35}
            stroke="var(--color-terracotta)"
            strokeWidth={2}
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: { duration: 1.2, ease: EASE_OUT, delay: 0.25 },
              opacity: { duration: 0.35, delay: 0.25 },
            }}
          />
        </svg>
      )}

      {showComment && (
        <motion.div
          variants={blockVariants}
          className="mb-3 rounded-sm bg-cream p-3 text-[0.78rem] leading-relaxed text-ink-soft"
        >
          <span className="mb-1 block text-[0.65rem] uppercase tracking-wide text-terracotta">
            {t.commentLabel}
          </span>
          {t.commentText}
        </motion.div>
      )}
    </>
  );
}

/** Stage "Progrés visible" — evolution across the three trimesters, not a single snapshot. */
const TREND_LINES = [
  { color: "var(--color-terracotta)", values: [42, 61, 74], criterionIndex: 0 },
  { color: "var(--color-sage)", values: [58, 77, 90], criterionIndex: 3 },
];
const CHART_X = [46, 168, 290];
function trendY(v: number) {
  return 158 - (v / 100) * 128;
}

function ProgressChart({ t }: { t: CardDict }) {
  return (
    <>
      <div className="mb-1 text-xs uppercase tracking-normal text-ink-soft/70">{t.fichaLabel}</div>
      <div className="mb-1 font-display text-2xl text-ink">{t.name}</div>
      <div className="mb-4 text-[0.68rem] uppercase tracking-wide text-terracotta">{t.evolutionLabel}</div>

      <svg viewBox="0 0 320 190" className="w-full" style={{ height: 190 }}>
        <line x1={30} y1={158} x2={310} y2={158} stroke="rgba(43,36,32,0.12)" />
        {TREND_LINES.map((line, li) => {
          const d = line.values
            .map((v, i) => `${i === 0 ? "M" : "L"} ${CHART_X[i]} ${trendY(v)}`)
            .join(" ");
          return (
            <g key={li}>
              <motion.path
                d={d}
                fill="none"
                stroke={line.color}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  pathLength: { duration: 1.3, ease: EASE_OUT, delay: 0.2 + li * 0.4 },
                  opacity: { duration: 0.3, delay: 0.2 + li * 0.4 },
                }}
              />
              {line.values.map((v, i) => (
                <motion.circle
                  key={i}
                  cx={CHART_X[i]}
                  cy={trendY(v)}
                  r={4.5}
                  fill={line.color}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    ease: EASE_OUT,
                    delay: 0.2 + li * 0.4 + i * 0.42,
                  }}
                />
              ))}
            </g>
          );
        })}
        {t.trimesterLabels.map((label, i) => (
          <text key={i} x={CHART_X[i]} y={178} textAnchor="middle" fontSize={11} fill="rgba(43,36,32,0.5)">
            {label}
          </text>
        ))}
      </svg>

      <motion.div
        variants={listVariants}
        initial="hidden"
        animate="visible"
        className="mt-3 flex flex-col gap-2"
      >
        {TREND_LINES.map((line, i) => (
          <motion.div key={i} variants={rowVariants} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: line.color }} />
            <span className="text-[0.78rem] text-ink-soft">{t.criteria[line.criterionIndex]}</span>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

/** Stage "Curs en una fitxa" — the same report, reachable from any device. */
function DeviceStack({ t }: { t: CardDict }) {
  return (
    <>
      <div className="mb-1 text-xs uppercase tracking-normal text-ink-soft/70">{t.fichaLabel}</div>
      <div className="mb-1 font-display text-2xl text-ink">{t.name}</div>
      <div className="mb-6 text-[0.68rem] uppercase tracking-wide text-terracotta">{t.devicesLabel}</div>

      <div className="relative mx-auto" style={{ width: 280, height: 210 }}>
        <motion.div
          className="absolute rounded-lg border border-ink/10 bg-cream shadow-[0_10px_24px_rgba(43,36,32,0.1)]"
          style={{ width: 210, height: 130, left: 10, top: 62, rotate: -3 }}
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
        >
          <MiniScreen />
        </motion.div>

        <motion.div
          className="absolute rounded-xl border border-ink/10 bg-surface shadow-[0_10px_24px_rgba(43,36,32,0.12)]"
          style={{ width: 106, height: 148, left: 96, top: 16, rotate: 4 }}
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.65 }}
        >
          <MiniScreen compact />
        </motion.div>

        <motion.div
          className="absolute rounded-2xl border border-ink/10 bg-surface shadow-[0_10px_24px_rgba(43,36,32,0.14)]"
          style={{ width: 58, height: 126, left: 160, top: 48, rotate: -6 }}
          initial={{ opacity: 0, y: 16, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 1.1 }}
        >
          <MiniScreen compact />
        </motion.div>
      </div>
    </>
  );
}

function MiniScreen({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "p-2.5" : "p-3.5"}>
      <div className="mb-1.5 h-1.5 w-1/2 rounded-full bg-terracotta" />
      <div className="mb-2.5 h-1 w-1/3 rounded-full bg-ink/12" />
      <div className="flex items-end gap-1" style={{ height: compact ? 26 : 34 }}>
        <div className="h-[55%] w-full rounded-sm bg-terracotta/70" />
        <div className="h-[85%] w-full rounded-sm bg-terracotta/70" />
        <div className="h-[40%] w-full rounded-sm bg-terracotta/30" />
        <div className="h-[70%] w-full rounded-sm bg-sage/70" />
      </div>
    </div>
  );
}

/** Stage "Informe final" — loose documents pile up, then settle into the finished report. */
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
        variants={blockVariants}
        className="mb-6 block text-center text-[0.68rem] uppercase tracking-wide text-terracotta"
      >
        {t.climaxLabel}
      </motion.span>

      <div className="relative mx-auto" style={{ width: 260, height: 320 }}>
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
      style={{ width: 260, height: 320 }}
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
              transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.25 + i * 0.09 }}
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
            <span className="font-display text-lg text-terracotta/50">{stage.eyebrow.slice(0, 2)}</span>
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
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
