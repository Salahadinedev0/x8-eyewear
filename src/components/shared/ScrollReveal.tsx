'use client';

import { useEffect, useRef } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  trigger?: string | Element;
  y?: number;
  opacity?: number;
  stagger?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  once?: boolean;
  as?: 'div' | 'section' | 'article' | 'span';
}

export function ScrollReveal({
  children,
  className,
  trigger,
  y = 60,
  opacity = 0,
  stagger = 0.08,
  duration = 0.8,
  delay = 0,
  ease = 'expo.out',
  start = 'top 85%',
  once = true,
  as: Component = 'div',
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const { createScrollReveal, gsap } = useGSAP();

  useEffect(() => {
    if (!elementRef.current) return;

    const timer = setTimeout(() => {
      const triggerElement = trigger || elementRef.current;
      if (!triggerElement) return;
      
      createScrollReveal(triggerElement, {
        y,
        opacity,
        stagger,
        duration,
        ease,
        trigger: triggerElement,
        start,
        once,
      });
    }, delay);

    return () => {
      clearTimeout(timer);
      gsap.killTweensOf(elementRef.current);
    };
  }, [createScrollReveal, gsap, trigger, y, opacity, stagger, duration, delay, ease, start, once]);

  return (
    <Component ref={elementRef} className={className}>
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  index: number;
  className?: string;
  as?: 'div' | 'span' | 'article';
}

export function StaggerItem({
  children,
  index,
  className,
  as: Component = 'div',
}: StaggerItemProps) {
  return (
    <Component className={className} style={{ '--stagger-index': index } as React.CSSProperties}>
      {children}
    </Component>
  );
}