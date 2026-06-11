'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/helpers';

type BadgeVariant = 'default' | 'outline' | 'success' | 'warning' | 'error' | 'ghost';

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-accent/10 text-accent border border-accent/20',
      outline: 'bg-transparent text-fg border border-card-border',
      success: 'bg-green-500/10 text-green-500 border border-green-500/20',
      warning: 'bg-amber-500/10 text-amber-500 border border-amber-500/20',
      error: 'bg-red-500/10 text-red-500 border border-red-500/20',
      ghost: 'text-fg hover:bg-accent/10',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium font-body',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';