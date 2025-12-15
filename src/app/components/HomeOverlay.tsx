'use client';

import { Hero } from './Hero';
import { About } from './About';
import { useUIView } from '@/stores/useUIViewStore';

export const HomeOverlay = () => {
  const { currentView } = useUIView();

  if (currentView !== 'home') return null;

  return (
    <div
      className="fixed inset-0 z-10 pointer-events-auto overscroll-contain"
      style={{
        WebkitOverflowScrolling: 'touch',
        overflowY: 'auto',
        height: '100vh', // <- critical for iOS
      }}
    >
      <div className="w-full max-w-4xl px-4 pt-40 pb-40 flex flex-col gap-10 items-center">
        <Hero />
        <About />
      </div>
    </div>
  );
};
