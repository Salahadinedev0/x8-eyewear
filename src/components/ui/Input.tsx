'use client';

import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/helpers';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type = 'text', ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          'w-full px-4 py-3 bg-bg-elevated border border-card-border text-fg placeholder-muted',
          'transition-colors duration-fast ease-out-expo',
          'focus-ring',
          'hover:border-accent/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full px-4 py-3 bg-bg-elevated border border-card-border text-fg placeholder-muted',
          'transition-colors duration-fast ease-out-expo',
          'focus-ring',
          'hover:border-accent/50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'resize-y min-h-[100px]',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';