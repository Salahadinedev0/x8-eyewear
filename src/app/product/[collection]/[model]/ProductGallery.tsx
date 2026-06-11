'use client';

import Image from 'next/image';
import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils/helpers';
import { ChevronLeft, ChevronRight, Minimize, Maximize } from 'lucide-react';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (!isZoomed) return;
    e.preventDefault();
    setTransform(prev => {
      const newScale = Math.min(Math.max(prev.scale * (1 - e.deltaY * 0.001), 1), 5);
      return { ...prev, scale: newScale };
    });
  }, [isZoomed]);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || transform.scale === 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - transform.x, y: e.clientY - transform.y };
    mainImageRef.current?.style.setProperty('cursor', 'grabbing');
  }, [isZoomed, transform.scale, transform.x, transform.y]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging.current) return;
    setTransform(prev => ({
      ...prev,
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    }));
  }, []);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    isDragging.current = false;
    mainImageRef.current?.style.removeProperty('cursor');
  }, []);

  useEffect(() => {
    if (isZoomed) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isZoomed, handleMouseMove, handleMouseUp]);

  const handleDoubleClick = useCallback(() => {
    if (isZoomed) {
      setIsZoomed(false);
      setTransform({ x: 0, y: 0, scale: 1 });
    } else {
      setIsZoomed(true);
    }
  }, [isZoomed]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
      setIsZoomed(false);
      setTransform({ x: 0, y: 0, scale: 1 });
    } else if (e.key === 'ArrowRight') {
      setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
      setIsZoomed(false);
      setTransform({ x: 0, y: 0, scale: 1 });
    } else if (e.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
      setTransform({ x: 0, y: 0, scale: 1 });
    }
  }, [images.length, isZoomed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="relative">
      <div
        ref={mainImageRef}
        className="relative aspect-[3/4] overflow-hidden bg-bg-elevated rounded-lg border border-card-border"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onDoubleClick={handleDoubleClick}
        role="img"
        aria-label={`${alt} - view ${selectedIndex + 1} of ${images.length}`}
      >
        <Image
          src={images[selectedIndex]}
          alt={`${alt} - angle ${selectedIndex + 1}`}
          fill
          priority
          className={cn(
            'object-cover transition-transform duration-fast ease-out-expo',
            isZoomed
              ? `will-change-transform transform ${transform.scale > 1 ? 'cursor-grabbing' : 'cursor-zoom-in'}`
              : 'cursor-zoom-in hover:scale-105',
            transform.scale > 1 && `scale-[${transform.scale}] translate-x-[${transform.x}px] translate-y-[${transform.y}px]`
          )}
          style={{
            transformOrigin: 'center center',
            ...(transform.scale > 1 && {
              transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
            }),
          }}
        />

        {isZoomed && (
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => {
                setIsZoomed(false);
                setTransform({ x: 0, y: 0, scale: 1 });
              }}
              className="p-2 bg-bg/80 backdrop-blur-sm rounded-full text-muted hover:text-fg transition-colors"
              aria-label="Exit zoom"
            >
              <Minimize className="w-5 h-5" />
            </button>
          </div>
        )}

        {!isZoomed && images.length > 1 && (
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              onClick={() => {
                setSelectedIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
                setIsZoomed(false);
                setTransform({ x: 0, y: 0, scale: 1 });
              }}
              className="p-2 bg-bg/80 backdrop-blur-sm rounded-full text-muted hover:text-fg transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                setSelectedIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
                setIsZoomed(false);
                setTransform({ x: 0, y: 0, scale: 1 });
              }}
              className="p-2 bg-bg/80 backdrop-blur-sm rounded-full text-muted hover:text-fg transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedIndex(index);
                setIsZoomed(false);
                setTransform({ x: 0, y: 0, scale: 1 });
              }}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-fast',
                index === selectedIndex
                  ? 'bg-fg w-6'
                  : 'bg-fg/30 hover:bg-fg/60'
              )}
              aria-label={`View image ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-2 scrollbar-hide" role="list" aria-label="Image thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedIndex(index);
              setIsZoomed(false);
              setTransform({ x: 0, y: 0, scale: 1 });
            }}
            className={cn(
                'relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-fast',
                index === selectedIndex
                  ? 'border-accent ring-2 ring-accent/20'
                  : 'border-card-border hover:border-accent/50'
              )}
            aria-label={`View image ${index + 1}`}
            aria-current={index === selectedIndex ? 'true' : 'false'}
          >
            <Image
              src={image}
              alt={`${alt} - thumbnail ${index + 1}`}
              fill
              className="object-cover"
              sizes="80px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}