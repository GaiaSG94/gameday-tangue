import './index.css';

import { useCallback, useEffect, useRef, useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { isUpright, nextTilt, seaTiltAt } from '../shared/puzzle';
import type { Sea } from '../shared/puzzle';

type Init = {
  day: string;
  username: string;
  streak: number;
  solvedToday: boolean;
  startedAt: number;
  sea: Sea;
};

type Result = { won: boolean; streak: number; survivedMs: number; targetMs: number };

const App = () => {
  const [init, setInit] = useState<Init | null>(null);
  const [phase, setPhase] = useState<'ready' | 'run' | 'lost' | 'won'>('ready');
  const [tilt, setTilt] = useState(0);
  const [time, setTime] = useState(0);
  const [correction, setCorrection] = useState(0);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const startedAt = useRef(0);
  const tiltRef = useRef(0);

  const submit = useCallback(async (won: boolean, survived: number) => {
    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ won, survivedMs: Math.round(survived) }),
      });
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'submit failed');
    }
  }, []);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/init');
      const data = await res.json();
      if (data.status === 'error') throw new Error(data.message);
      setInit(data);
      setPhase('ready');
      setTilt(0);
      setTime(0);
      setResult(null);
      tiltRef.current = 0;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'load failed');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (phase !== 'run' || !init) return;
    let raf = 0;
    const step = (): void => {
      const elapsed = performance.now() - startedAt.current;
      const tiltNow = nextTilt(init.sea, elapsed, tiltRef.current, correction);
      tiltRef.current = tiltNow;
      setTilt(tiltNow);
      setTime(elapsed);
      if (!isUpright(tiltNow)) {
        setPhase('lost');
        void submit(false, elapsed);
        return;
      }
      if (elapsed >= init.sea.targetMs) {
        setPhase('won');
        void submit(true, elapsed);
        return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [phase, init, correction, submit]);

  const push = (dir: number) => setCorrection(dir * 0.5);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#dceaf2] text-[#1f3a4d]">
        <p>{error}</p>
      </div>
    );
  }
  if (!init) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#dceaf2] text-[#6b90a6]">
        <p className="animate-pulse">Reading the swell…</p>
      </div>
    );
  }

  const seconds = Math.floor(time / 1000);
  const clock = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const degrees = Math.max(-40, Math.min(40, tilt * 14));
  const horizon = seaTiltAt(init.sea, time) * 8;

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 bg-[#dceaf2] px-4 py-6 text-[#1f3a4d]">
      <header className="flex w-full max-w-md items-center justify-between">
        <h1 className="text-xl font-black tracking-[0.3em] text-[#0f5d8a]">TANGUE</h1>
        <div className="text-sm font-semibold text-[#6b90a6]">
          <span className="mr-3">{clock}</span>
          <span>🔥 {result ? result.streak : init.streak}</span>
        </div>
      </header>
      <p className="max-w-md text-center text-[13px] leading-snug text-[#6b90a6]">
        The deck slides with the swell. Counter the tilt with the ballast buttons and stay
        upright until the crossing is done.
      </p>
      <div className="relative h-56 w-full max-w-md overflow-hidden rounded-2xl border-2 border-[#9dc0d4] bg-[#bcd9e8]">
        <span
          className="absolute left-0 h-1 w-full bg-[#3d7fa3]"
          style={{ top: '50%', transform: `translateY(${horizon}px) rotate(${degrees / 3}deg)` }}
        />
        <span
          className="absolute left-1/2 h-4 w-24 -translate-x-1/2 rounded bg-[#0f5d8a]"
          style={{ bottom: '32%', transform: `rotate(${degrees}deg)` }}
        />
        <span className="absolute bottom-3 left-3 text-[11px] font-bold text-[#0f5d8a]">
          deck tilt {degrees.toFixed(0)}°
        </span>
      </div>
      <div className="flex w-full max-w-md gap-3">
        <button
          onClick={() => push(-1)}
          disabled={phase !== 'run'}
          className="flex-1 rounded-full border-2 border-[#0f5d8a] py-4 text-lg font-black uppercase tracking-widest text-[#0f5d8a] disabled:opacity-40"
        >
          ◀ Port
        </button>
        <button
          onClick={() => push(1)}
          disabled={phase !== 'run'}
          className="flex-1 rounded-full border-2 border-[#0f5d8a] py-4 text-lg font-black uppercase tracking-widest text-[#0f5d8a] disabled:opacity-40"
        >
          Starboard ▶
        </button>
      </div>
      {phase === 'ready' && (
        <button
          onClick={() => {
            startedAt.current = performance.now();
            tiltRef.current = 0;
            setPhase('run');
          }}
          className="w-full max-w-md rounded-full bg-[#0f5d8a] py-3 text-base font-black uppercase tracking-widest text-white"
        >
          Cast off
        </button>
      )}
      {(phase === 'lost' || phase === 'won') && result && (
        <div className="flex w-full max-w-md flex-col items-center gap-3 rounded-xl border-2 border-[#9dc0d4] bg-white p-5 text-center">
          <p className="text-2xl font-black tracking-widest">
            {result.won ? 'CROSSING MADE' : 'CAPSIZED'}
          </p>
          <p className="text-sm text-[#6b90a6]">
            {result.won
              ? `${Math.round(result.survivedMs / 1000)}s upright — streak 🔥 ${result.streak}.`
              : `Came off after ${Math.round(result.survivedMs / 1000)}s. The swell tomorrow will differ.`}
          </p>
          <button
            onClick={() => setPhase('ready')}
            className="rounded-full border-2 border-[#0f5d8a] px-6 py-2 text-sm font-bold uppercase tracking-widest text-[#0f5d8a]"
          >
            Back to the deck
          </button>
        </div>
      )}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
