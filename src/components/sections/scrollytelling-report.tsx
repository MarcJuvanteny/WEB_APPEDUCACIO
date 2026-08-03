"use client";

import { useRef, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";
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
  lerp,
  smoothstep,
  fadeIn,
  polygonPoints,
  criterionInfo,
} from "@/lib/scrollytelling-report-math";

const STAGE_COUNT = 7;
const STAGE_MAX = STAGE_COUNT - 1;

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

  const stageOp = (idx: number) => 0.15 + 0.85 * (1 - smoothstep(Math.abs(stageFloat - idx) / 0.85));
  const stageOffset = (idx: number) => -clamp((stageFloat - idx) / 0.85, -1, 1) * 34;

  return (
    <section id="scrollytelling" ref={sceneRef} className="relative mx-auto max-w-[1600px]" style={{ height: `${STAGE_COUNT * 140}vh` }}>
      <div className="flex h-full">
        <div className="order-2 flex w-[46%] items-center justify-center p-6" style={{ position: "sticky", top: 0, height: "100vh" }}>
          <FichaCard t={t.scrolly.card} stageFloat={stageFloat} />
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

function FichaCard({ t, stageFloat }: { t: Dictionary["scrolly"]["card"]; stageFloat: number }) {
  const richOutro = 1 - fadeIn(stageFloat, 1.3, 0.4);
  const emptyOpacity = 1 - fadeIn(stageFloat, 0.3, 0.4);
  const criteriaOpacity = fadeIn(stageFloat, 0.3, 0.4) * richOutro;
  const radarOpacity = criteriaOpacity;
  const commentOpacity = fadeIn(stageFloat, 1.3, 0.4);
  const comparisonOpacity = fadeIn(stageFloat, 2.3, 0.4);
  const ficaOpacity = 1 - fadeIn(stageFloat, 4.3, 0.4);
  const climaxOpacity = smoothstep((stageFloat - 4.3) / 0.4);

  const infos = CRITERIA_HISTORIES.map((history) => criterionInfo(history, stageFloat));
  const radarDrawProgress = smoothstep(stageFloat / 1.1);
  const radarRevealRadius = radarDrawProgress * 130;
  const radarPoints = infos
    .map((info, i) => {
      const v = info.visible ? info.value : 0;
      const x = CENTER.x + AXES[i].dx * RADIUS * v;
      const y = CENTER.y + AXES[i].dy * RADIUS * v;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const commentProgress = clamp((stageFloat - 1.3) / 0.7, 0, 1);
  const commentLen = Math.floor(t.commentText.length * commentProgress);
  const commentVisibleText = t.commentText.slice(0, commentLen);
  const commentTyping = commentLen < t.commentText.length;

  const laiaPct = lerp(60, 82, clamp((stageFloat - 2.3) / 0.7, 0, 1));

  return (
    <div className="relative w-full max-w-[420px]">
      <div
        className="box-border w-full overflow-hidden rounded-card border border-ink/8 bg-surface p-9 shadow-[0_1px_3px_rgba(43,36,32,0.05)] transition-opacity duration-300"
        style={{ maxHeight: "calc(100vh - 56px)", opacity: ficaOpacity }}
      >
        <div className="mb-1 text-xs uppercase tracking-wide text-ink-soft/70">{t.fichaLabel}</div>
        <div className="mb-5 font-display text-2xl text-ink">{t.name}</div>

        {emptyOpacity > 0.02 && (
          <div
            className="border-t border-dashed border-ink/12 py-7 text-sm text-ink-soft/70 transition-opacity duration-300"
            style={{ opacity: emptyOpacity }}
          >
            {t.emptyState}
          </div>
        )}

        {criteriaOpacity > 0.02 && (
          <div className="mb-5 flex flex-col gap-2 transition-opacity duration-300" style={{ opacity: criteriaOpacity }}>
            {infos.map(
              (info, i) =>
                info.visible && (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-sm bg-cream px-3 py-2 transition-opacity duration-300"
                    style={{ opacity: info.opacity }}
                  >
                    <span className="text-[0.8rem] text-ink">{t.criteria[i]}</span>
                    <span
                      className="font-display text-[0.8rem] font-semibold text-sage"
                      title={info.level ? t.levelFull[info.level] : undefined}
                    >
                      {info.level}
                    </span>
                  </div>
                ),
            )}
          </div>
        )}

        {radarOpacity > 0.02 && (
          <svg viewBox="0 0 220 200" className="mb-2 w-full" style={{ height: 200, opacity: radarOpacity }}>
            <defs>
              <clipPath id="sj-radar-clip">
                <circle cx={CENTER.x} cy={CENTER.y} r={radarRevealRadius} />
              </clipPath>
            </defs>
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
              clipPath="url(#sj-radar-clip)"
            />
          </svg>
        )}

        {commentOpacity > 0.02 && (
          <div
            className="mb-4 min-h-16 rounded-sm bg-cream p-3.5 text-[0.8rem] leading-relaxed text-ink-soft transition-opacity duration-300"
            style={{ opacity: commentOpacity }}
          >
            <span className="mb-1.5 block text-[0.68rem] uppercase tracking-wide text-terracotta">
              {t.commentLabel}
            </span>
            {commentVisibleText}
            {commentTyping && <span className="sj-blink">▍</span>}
          </div>
        )}

        {comparisonOpacity > 0.02 && (
          <div
            className="border-t border-dashed border-ink/12 pt-4 transition-opacity duration-300"
            style={{ opacity: comparisonOpacity }}
          >
            <span className="text-[0.68rem] uppercase tracking-wide text-ink-soft/70">
              {t.comparisonLabel}
            </span>
            <div className="mt-3 flex h-[120px] items-end gap-5">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="w-9 rounded-t-md bg-terracotta"
                  style={{ height: `${Math.round(laiaPct)}px` }}
                />
                <span className="text-[0.68rem] text-ink-soft/70">{t.studentName}</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <div className="w-9 rounded-t-md bg-[#C9C2B4]" style={{ height: "66px" }} />
                <span className="text-[0.68rem] text-ink-soft/70">{t.averageName}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {climaxOpacity > 0.01 && (
        <ClimaxOverlay t={t} stageFloat={stageFloat} climaxOpacity={climaxOpacity} />
      )}
    </div>
  );
}

const SCATTERED = [
  { x: -230, y: -60, r: -10 },
  { x: 210, y: -100, r: 12 },
  { x: -170, y: 130, r: 7 },
  { x: 200, y: 110, r: -7 },
];
const STACKED = [
  { x: 0, y: -6, r: -2 },
  { x: 0, y: -2, r: 1 },
  { x: 0, y: 2, r: -1 },
  { x: 0, y: 6, r: 2 },
];

function ClimaxOverlay({
  t,
  stageFloat,
  climaxOpacity,
}: {
  t: Dictionary["scrolly"]["card"];
  stageFloat: number;
  climaxOpacity: number;
}) {
  const assembleT = smoothstep((stageFloat - 4.3) / 0.55);
  const foldT = smoothstep((stageFloat - 4.85) / 0.15);
  const docFadeOut = 1 - fadeIn(stageFloat, 5.3, 0.4);
  const archiveOpacity = smoothstep((stageFloat - 5.4) / 0.3);
  const returnNoteOpacity = smoothstep((stageFloat - 5.7) / 0.3);

  const pieceStyles = [0, 1, 2, 3].map((i) => {
    const from = SCATTERED[i];
    const to = STACKED[i];
    const x = lerp(from.x, to.x, assembleT);
    const y = lerp(from.y, to.y, assembleT);
    const r = lerp(from.r, to.r, assembleT);
    const opacity = smoothstep(assembleT * 1.4) * (1 - foldT);
    const scale = lerp(1, 0.85, foldT);
    return {
      transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${r.toFixed(1)}deg) scale(${scale.toFixed(2)})`,
      opacity,
    };
  });

  const thumbOpacity = foldT * docFadeOut;
  const thumbStyle = { transform: `scale(${lerp(0.85, 1, foldT).toFixed(2)})`, opacity: thumbOpacity };

  return (
    <div
      className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"
      style={{ opacity: climaxOpacity }}
    >
      <div className="mb-7 text-[0.68rem] uppercase tracking-wide text-terracotta">{t.climaxLabel}</div>
      <div className="relative" style={{ width: 260, height: 320 }}>
        <div
          className="absolute inset-0 rounded-[10px] border border-ink/10 bg-cream p-5 shadow-[0_4px_14px_rgba(43,36,32,0.08)]"
          style={pieceStyles[0]}
        >
          <div className="text-[0.62rem] uppercase tracking-wide text-ink-soft/70">{t.piece1.eyebrow}</div>
          <div className="mt-1.5 font-display text-lg text-ink">{t.piece1.name}</div>
          <div className="mt-1 text-xs text-ink-soft/70">{t.piece1.meta}</div>
        </div>

        <div
          className="absolute inset-0 rounded-[10px] border border-ink/10 bg-surface p-5 shadow-[0_4px_14px_rgba(43,36,32,0.08)]"
          style={pieceStyles[1]}
        >
          <div className="mb-2.5 text-[0.62rem] uppercase tracking-wide text-ink-soft/70">
            {t.piece2.eyebrow}
          </div>
          <svg viewBox="0 0 220 200" className="h-[130px] w-full">
            <polygon points={polygonPoints(1)} fill="none" stroke="rgba(43,36,32,0.15)" strokeWidth={1} />
            <polygon
              points="110,44 178,86 152,164 68,164 42,86"
              fill="var(--color-sage)"
              fillOpacity={0.4}
              stroke="var(--color-sage)"
              strokeWidth={2}
            />
          </svg>
        </div>

        <div
          className="absolute inset-0 rounded-[10px] border border-ink/10 bg-cream p-5 shadow-[0_4px_14px_rgba(43,36,32,0.08)]"
          style={pieceStyles[2]}
        >
          <div className="mb-2.5 text-[0.62rem] uppercase tracking-wide text-ink-soft/70">
            {t.piece3.eyebrow}
          </div>
          <div className="text-[0.8rem] leading-[2] text-ink-soft">
            {t.piece3.items.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 rounded-[10px] border border-ink/10 bg-surface p-5 shadow-[0_4px_14px_rgba(43,36,32,0.08)]"
          style={pieceStyles[3]}
        >
          <div className="mb-2.5 text-[0.62rem] uppercase tracking-wide text-ink-soft/70">
            {t.piece4.eyebrow}
          </div>
          <div className="text-[0.8rem] leading-relaxed text-ink-soft">{t.piece4.quote}</div>
        </div>

        <div
          className="absolute inset-0 m-auto box-border rounded-xl border border-ink/10 bg-surface p-[22px] shadow-[0_8px_24px_rgba(43,36,32,0.12)]"
          style={{ width: 230, height: 290, ...thumbStyle }}
        >
          <div className="mb-2 h-2 w-[55%] rounded bg-terracotta" />
          <div className="mb-[18px] h-[5px] w-[35%] rounded bg-ink/15" />
          <div className="mb-4 flex items-center gap-4">
            <svg viewBox="0 0 220 200" className="h-[70px] w-[76px] shrink-0">
              <polygon points={polygonPoints(1)} fill="none" stroke="rgba(43,36,32,0.15)" strokeWidth={2} />
              <polygon
                points="110,44 178,86 152,164 68,164 42,86"
                fill="var(--color-sage)"
                fillOpacity={0.4}
                stroke="var(--color-sage)"
                strokeWidth={3}
              />
            </svg>
            <div className="flex h-14 flex-1 items-end gap-1.5">
              <div className="h-[55%] w-full rounded-sm bg-terracotta" />
              <div className="h-[85%] w-full rounded-sm bg-terracotta" />
              <div className="h-[40%] w-full rounded-sm bg-terracotta/35" />
              <div className="h-[70%] w-full rounded-sm bg-terracotta" />
              <div className="h-[95%] w-full rounded-sm bg-sage" />
            </div>
          </div>
          <div className="mb-[7px] h-1 w-full rounded-full bg-ink/10" />
          <div className="mb-[7px] h-1 w-full rounded-full bg-ink/10" />
          <div className="h-1 w-[70%] rounded-full bg-ink/10" />
        </div>

        <div
          className="absolute inset-0 m-auto flex flex-col items-center justify-center"
          style={{ width: 220, height: 220, opacity: archiveOpacity }}
        >
          <svg viewBox="0 0 200 200" className="h-[150px] w-[150px]">
            <ellipse cx={100} cy={158} rx={78} ry={26} fill="#C9C2B4" />
            <ellipse cx={100} cy={122} rx={78} ry={26} fill="#8FA07C" />
            <ellipse cx={100} cy={86} rx={78} ry={26} fill="var(--color-sage)" />
            <ellipse
              cx={100}
              cy={50}
              rx={78}
              ry={26}
              fill="var(--color-cream)"
              stroke="var(--color-terracotta)"
              strokeWidth={3}
              strokeDasharray="7 6"
            />
          </svg>
          <div className="mt-3.5 text-center text-[0.68rem] text-ink-soft/70">{t.archiveCaption}</div>
        </div>
      </div>

      <div className="mt-6 flex gap-3" style={{ opacity: thumbOpacity }}>
        <div className="rounded-sm bg-cream px-3.5 py-2.5 text-center">
          <div className="font-display text-lg text-terracotta">5</div>
          <div className="text-[0.62rem] text-ink-soft/70">{t.stats.competencies}</div>
        </div>
        <div className="rounded-sm bg-cream px-3.5 py-2.5 text-center">
          <div className="font-display text-lg text-sage">3</div>
          <div className="text-[0.62rem] text-ink-soft/70">{t.stats.trimestres}</div>
        </div>
        <div className="rounded-sm bg-cream px-3.5 py-2.5 text-center">
          <div className="font-display text-lg text-ink">1</div>
          <div className="text-[0.62rem] text-ink-soft/70">{t.stats.cursComplet}</div>
        </div>
      </div>
      <div
        className="mt-5 max-w-[260px] text-center text-[0.8rem] text-ink-soft/70"
        style={{ opacity: returnNoteOpacity }}
      >
        {t.returnNote}
      </div>
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
          <div className="mb-1 text-xs uppercase tracking-wide text-ink-soft/70">{t.scrolly.card.fichaLabel}</div>
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
