export type Level = "NA" | "AS" | "AN" | "AE";
export type CriterionHistory = Record<number, Level>;

export const LEVEL_VALUE: Record<Level, number> = { NA: 0.3, AS: 0.55, AN: 0.78, AE: 1.0 };

export const AXES = [
  { dx: 0, dy: -1 },
  { dx: 0.951, dy: -0.309 },
  { dx: 0.588, dy: 0.809 },
  { dx: -0.588, dy: 0.809 },
  { dx: -0.951, dy: -0.309 },
];

export const CENTER = { x: 110, y: 110 };
export const RADIUS = 90;

export const CRITERIA_HISTORIES: CriterionHistory[] = [
  { 1: "AS", 4: "AN" },
  { 1: "AS" },
  { 2: "AN" },
  { 2: "AS", 4: "AE" },
  { 3: "AS" },
];

export function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function smoothstep(x: number) {
  const t = clamp(x, 0, 1);
  return t * t * (3 - 2 * t);
}

export function fadeIn(stageFloat: number, threshold: number, span: number) {
  return smoothstep((stageFloat - threshold) / span + 1);
}

export function polygonPoints(radiusFraction: number) {
  return AXES.map((axis) => {
    const x = CENTER.x + axis.dx * RADIUS * radiusFraction;
    const y = CENTER.y + axis.dy * RADIUS * radiusFraction;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

export type CriterionInfo = { visible: boolean; level: Level | null; value: number; opacity: number };

export function criterionInfo(history: CriterionHistory, stageFloat: number): CriterionInfo {
  const keys = Object.keys(history)
    .map(Number)
    .sort((a, b) => a - b);
  const firstKey = keys[0];
  const mountOpacity = fadeIn(stageFloat, firstKey, 0.6);
  if (mountOpacity <= 0.001) return { visible: false, level: null, value: 0, opacity: 0 };

  let value = LEVEL_VALUE[history[firstKey]];
  let currentLevel = history[firstKey];
  for (let i = 1; i < keys.length; i++) {
    const k = keys[i];
    const t = fadeIn(stageFloat, k, 0.6);
    value = lerp(LEVEL_VALUE[history[keys[i - 1]]], LEVEL_VALUE[history[k]], t);
    currentLevel = t > 0.5 ? history[k] : history[keys[i - 1]];
  }
  return { visible: true, level: currentLevel, value: value * mountOpacity, opacity: mountOpacity };
}
