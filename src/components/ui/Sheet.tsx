'use client';

import { createContext, useContext, useState, useEffect, type ReactNode, type ReactElement } from 'react';
import { cn } from '@/lib/utils/helpers';
import { X } from 'lucide-react';

interface SheetContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const SheetContext = createContext<SheetContextType | null>(null);

export function SheetProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return (
    <SheetContext.Provider value={{ isOpen, open, close, toggle }}>
      {children}
    </SheetContext.Provider>
  );
}

export function useSheet() {
  const context = useContext(SheetContext);
  if (!context) {
    throw new Error('useSheet must be used within a SheetProvider');
  }
  return context;
}

interface SheetProps {
  children: ReactNode;
  side?: 'left' | 'right';
  className?: string;
}

export function Sheet({ children, side = 'right', className }: SheetProps) {
  const { isOpen, close } = useSheet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-base ease-out-expo"
          aria-hidden="true"
          onClick={close}
        />
      )}
      <div
        className={cn(
          'fixed z-50 flex flex-col max-h-full bg-bg-elevated border-l border-card-border',
          'transition-transform duration-base ease-out-expo',
          side === 'right'
            ? 'right-0 top-0 h-full w-full max-w-sm md:max-w-md lg:max-w-lg'
            : 'left-0 top-0 h-full w-full max-w-sm md:max-w-md lg:max-w-lg',
          isOpen ? 'translate-x-0' : side === 'right' ? 'translate-x-full' : '-translate-x-full',
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-card-border">
          <h2 className="text-lg md:text-xl font-display font-semibold text-fg">Shopping Cart</h2>
          <button
            onClick={close}
            className="p-2 rounded-full hover:bg-accent/10 text-muted hover:text-fg transition-colors duration-fast"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </div>
      </div>
    </>
  );
}

interface SheetTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

export function SheetTrigger({ children, asChild = false }: SheetTriggerProps) {
  const { toggle } = useSheet();
  
  if (asChild && typeof children === 'object' && children !== null && 'props' in children) {
    return children as ReactElement;
  }

  return (
    <button onClick={toggle} className="inline-flex items-center">
      {children}
    </button>
  );
}