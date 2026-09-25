import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'info' | 'success' | 'warning' | 'danger';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-dark-800 text-slate-300 border-dark-700',
    outline: 'bg-transparent text-slate-300 border-dark-700',
    info: 'bg-blue-950/80 text-blue-400 border-blue-800/60',
    success: 'bg-emerald-950/80 text-emerald-400 border-emerald-800/60',
    warning: 'bg-amber-950/80 text-amber-400 border-amber-800/60',
    danger: 'bg-red-950/80 text-red-400 border-red-800/60',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded border px-2 py-0.5 text-xs font-semibold tracking-wide transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
