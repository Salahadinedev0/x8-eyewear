'use client';

import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@/hooks/useGSAP';

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  pauseOnHover?: boolean;
  direction?: 'left' | 'right';
}

export function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = true,
  direction = 'left',
}: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { createMarquee, gsap } = useGSAP();
  const [width, setWidth] = useState(0);
  const [cloned, setCloned] = useState(false);

  useEffect(() => {
    if (!marqueeRef.current || !innerRef.current) return;

    const inner = innerRef.current;
    const childrenWidth = inner.scrollWidth;

    if (!cloned && childrenWidth > 0) {
      setCloned(true);
      // Clone content for seamless loop
      inner.innerHTML += inner.innerHTML;
    }
  }, [cloned]);

  useEffect(() => {
    if (!marqueeRef.current || !innerRef.current || width === 0) return;

    createMarquee(innerRef.current, duration);

    return () => {
      gsap.killTweensOf(innerRef.current);
    };
  }, [createMarquee, gsap, duration, width]);

  const handleResize = () => {
    if (innerRef.current) {
      setWidth(innerRef.current.scrollWidth);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      ref={marqueeRef}
      className={`overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        ref={innerRef}
        className="flex whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function MarqueeItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={`flex-shrink-0 px-8 md:px-12 ${className}`}>
      {children}
    </span>
  );
}