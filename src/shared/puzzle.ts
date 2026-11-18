export type Sea = {
  day: string;
  swellAmp: number;
  swellFreq: number;
  gustAmp: number;
  gustFreq: number;
  targetMs: number;
  limit: number;
};

export const dayKeyUTC = (now: Date = new Date()): string => now.toISOString().slice(0, 10);

export const dailySeed = (day: string): number => {
  let hash = 2166136261;
  const input = 'tangue:' + day;
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

export const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export const generateSea = (day: string): Sea => {
  const rand = mulberry32(dailySeed(day));
  return {
    day,
    swellAmp: 0.5 + rand() * 0.6,
    swellFreq: 0.6 + rand() * 0.8,
    gustAmp: 0.2 + rand() * 0.5,
    gustFreq: 1.4 + rand() * 1.4,
    targetMs: 45000,
    limit: 28,
  };
};

export const seaTiltAt = (sea: Sea, timeMs: number): number => {
  const t = timeMs / 1000;
  const swell = Math.sin(t * sea.swellFreq) * sea.swellAmp;
  const gust = Math.sin(t * sea.gustFreq + 1.3) * sea.gustAmp;
  return swell + gust;
};

export const nextTilt = (sea: Sea, timeMs: number, tilt: number, correction: number): number => {
  const target = seaTiltAt(sea, timeMs + 16);
  const pull = (target - tilt) * 0.12;
  return tilt + pull + correction * 0.42;
};

export const isUpright = (tilt: number): boolean => Math.abs(tilt) <= 1;
