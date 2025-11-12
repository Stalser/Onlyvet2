// components/PullToRefresh.tsx
'use client';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

export default function PullToRefresh({ onRefresh, children }: PropsWithChildren<{ onRefresh: () => Promise<void> | void }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const startY = useRef<number | null>(null);
  const [pull, setPull] = useState(0);
  const THRESH = 72;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (el.scrollTop === 0) startY.current = e.touches[0].clientY;
      else startY.current = null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (startY.current == null) return;
      const dy = e.touches[0].clientY - startY.current;
      if (dy > 0) {
        e.preventDefault();
        setPull(Math.min(dy, 120));
      }
    };
    const onTouchEnd = async () => {
      if (pull >= THRESH) {
        setPull(56);
        await onRefresh();
      }
      setPull(0);
      startY.current = null;
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart as any);
      el.removeEventListener('touchmove', onTouchMove as any);
      el.removeEventListener('touchend', onTouchEnd as any);
    };
  }, [onRefresh, pull]);

  return (
    <div ref={ref} className="overflow-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
      <div
        className="text-center text-xs text-gray-500 transition-all duration-150"
        style={{ height: pull ? pull : 0 }}
      >
        {pull >= 72 ? 'Отпустите, чтобы обновить' : pull > 0 ? 'Потяните вниз…' : null}
      </div>
      {children}
    </div>
  );
}
