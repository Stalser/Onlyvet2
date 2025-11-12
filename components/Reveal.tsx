// components/Reveal.tsx
'use client';
import React, { PropsWithChildren, useEffect, useRef } from 'react';

export default function Reveal({ children, y=20 }: PropsWithChildren<{ y?: number }>) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    el.style.opacity = '0'; el.style.transform = `translateY(${y}px)`;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          el.style.transition = 'opacity .4s ease, transform .4s ease';
          el.style.opacity = '1'; el.style.transform = 'translateY(0)';
          io.unobserve(el);
        }
      });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [y]);
  return <div ref={ref}>{children}</div>;
}
