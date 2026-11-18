import './index.css';

import { context, requestExpandedMode } from '@devvit/web/client';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

export const Splash = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#dceaf2] px-6 text-center text-[#1f3a4d]">
      <div className="text-3xl">🌊</div>
      <h1 className="text-3xl font-black tracking-[0.3em] text-[#0f5d8a]">TANGUE</h1>
      <p className="max-w-[240px] text-[13px] leading-snug text-[#6b90a6]">
        One deck, one swell, forty-five seconds. Hi {context.username ?? 'sailor'}.
      </p>
      <button
        onClick={(e) => requestExpandedMode(e.nativeEvent, 'game')}
        className="mt-2 rounded-full bg-[#0f5d8a] px-8 py-2.5 text-sm font-black uppercase tracking-widest text-white transition-transform active:scale-[0.98]"
      >
        Cast off
      </button>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Splash />
  </StrictMode>
);
