"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/language-provider";
import { FichaColumn, STAGE_MAX } from "@/components/sections/scrollytelling-report";

/**
 * Dev-only scrubber: drag through every stageFloat value without scrolling,
 * so exact frames can be screenshotted and compared side by side.
 * Not linked from anywhere in the site nav.
 */
export default function ScrollyPreviewPage() {
  const { t } = useLanguage();
  const [stageFloat, setStageFloat] = useState(0);
  const activeStage = Math.round(Math.min(Math.max(stageFloat, 0), STAGE_MAX));
  const stage = t.scrolly.stages[activeStage];

  return (
    <main className="flex min-h-screen flex-col items-center gap-8 bg-cream px-6 py-16">
      <div className="w-full max-w-xl">
        <div className="mb-2 flex items-center justify-between text-sm text-ink-soft">
          <span>
            stageFloat: <strong className="text-ink">{stageFloat.toFixed(2)}</strong>
          </span>
          <span>{stage?.eyebrow}</span>
        </div>
        <input
          type="range"
          min={0}
          max={STAGE_MAX}
          step={0.01}
          value={stageFloat}
          onChange={(e) => setStageFloat(Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-1 flex justify-between text-[0.65rem] uppercase tracking-wide text-ink-soft/60">
          {t.scrolly.stages.map((s, i) => (
            <button
              key={i}
              onClick={() => setStageFloat(i)}
              className="hover:text-terracotta"
            >
              {i}
            </button>
          ))}
        </div>
      </div>

      <FichaColumn t={t.scrolly.card} stageFloat={stageFloat} activeStage={activeStage} />
    </main>
  );
}
