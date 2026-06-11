'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useReducedMotion';
import Lenis from 'lenis';

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Lenis v1 options
      lerp: 0.1,
    });

    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current?.destroy();
    };
  }, [prefersReducedMotion]);

  return lenisRef;
}

export function useScrollTo() {
  const lenis = useLenis();

  const scrollTo = (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => {
    if (typeof target === 'string') {
      const element = document.querySelector(target);
      if (element) lenis.current?.scrollTo(element as HTMLElement, options);
    } else if (target instanceof HTMLElement) {
      lenis.current?.scrollTo(target, options);
    } else {
      lenis.current?.scrollTo(target, options);
    }
  };

  return scrollTo;
}