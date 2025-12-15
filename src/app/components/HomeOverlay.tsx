'use client';

import { Hero } from './Hero';
import { About } from './About';
import { useUIView } from '@/stores/useUIViewStore';

export const HomeOverlay = () => {
  const { currentView } = useUIView();

  if (currentView !== 'home') return null;

  return (
    <div
      className="
        fixed inset-0 z-10
        overflow-y-auto
        flex justify-center
        pointer-events-none
        overscroll-contain
      "
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <div className="w-full max-w-4xl px-4 pt-40 pb-40 pointer-events-auto">
        <Hero />
        <About />
      </div>
    </div>
  );
};
