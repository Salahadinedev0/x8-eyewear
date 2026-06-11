'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from './useReducedMotion';
import { useLenis } from './useLenis';

gsap.registerPlugin(ScrollTrigger);

export function useGSAP() {
  const prefersReducedMotion = useReducedMotion();
  const lenis = useLenis();

  useEffect(() => {
    if (prefersReducedMotion) return;

    ScrollTrigger.refresh();
    lenis.current?.on('scroll', ScrollTrigger.update);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [prefersReducedMotion, lenis]);

  const createScrollReveal = (
    elements: string | Element | Element[],
    options?: {
      y?: number;
      opacity?: number;
      stagger?: number;
      duration?: number;
      ease?: string;
      trigger?: string | Element;
      start?: string;
      end?: string;
      once?: boolean;
    }
  ) => {
    if (prefersReducedMotion) return;

    const defaults = {
      y: 60,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: 'expo.out',
      start: 'top 85%',
      once: true,
    };

    const config = { ...defaults, ...options };

    gsap.from(elements, {
      y: config.y,
      opacity: config.opacity,
      stagger: config.stagger,
      duration: config.duration,
      ease: config.ease,
      scrollTrigger: {
        trigger: config.trigger || elements,
        start: config.start,
        end: config.end,
        once: config.once,
      },
    });
  };

  const createMarquee = (element: string | Element, duration: number = 20) => {
    if (prefersReducedMotion) return;

    gsap.to(element, {
      xPercent: -50,
      duration,
      ease: 'none',
      repeat: -1,
    });
  };

  const createTextReveal = (elements: string | Element, options?: { stagger?: number; duration?: number }) => {
    if (prefersReducedMotion) return;

    gsap.from(elements, {
      y: '100%',
      opacity: 0,
      stagger: options?.stagger || 0.03,
      duration: options?.duration || 1.2,
      ease: 'expo.out',
    });
  };

  const createHoverAnimation = (
    element: string | Element,
    target: string | Element,
    properties: gsap.TweenVars
  ) => {
    if (prefersReducedMotion) return;

    const el = typeof element === 'string' ? document.querySelector(element) : element;
    const tgt = typeof target === 'string' ? document.querySelector(target) : target;

    if (!el || !tgt) return;

    let tween: gsap.core.Tween | null = null;

    el.addEventListener('mouseenter', () => {
      tween = gsap.to(tgt, { ...properties, duration: 0.3, ease: 'expo.out' });
    });

    el.addEventListener('mouseleave', () => {
      tween?.kill();
      gsap.to(tgt, { ...Object.fromEntries(
        Object.entries(properties).map(([key]) => [key, 0])
      ), duration: 0.3, ease: 'expo.out' });
    });

    return () => {
      el.removeEventListener('mouseenter', () => {});
      el.removeEventListener('mouseleave', () => {});
      tween?.kill();
    };
  };

  return {
    createScrollReveal,
    createMarquee,
    createTextReveal,
    createHoverAnimation,
    gsap,
    ScrollTrigger,
  };
}