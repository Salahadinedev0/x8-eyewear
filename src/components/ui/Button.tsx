'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/helpers';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-body font-medium transition-all duration-fast ease-out-expo focus-ring disabled:opacity-50 disabled:pointer-events-none';
    
    const variants = {
      primary: 'bg-accent text-bg hover:bg-accent-hover active:scale-[0.98]',
      secondary: 'bg-bg-elevated text-fg border border-card-border hover:border-accent/50 hover:bg-accent/5 active:scale-[0.98]',
      ghost: 'text-fg hover:bg-accent/10 active:scale-[0.98]',
      outline: 'border-2 border-accent text-accent hover:bg-accent/10 active:scale-[0.98]',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm gap-1.5',
      md: 'px-6 py-3 text-base gap-2',
      lg: 'px-8 py-4 text-lg gap-2.5',
      xl: 'px-10 py-5 text-xl gap-3',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';