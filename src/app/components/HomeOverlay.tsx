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
        height: '100vh', // iOS-safe
      }}
    >
      {/* Centered wrapper */}
      <div className="flex flex-col items-center justify-start min-h-full w-full px-4 py-20">
        <Hero />
        <About />
      </div>
    </div>
  );
};
