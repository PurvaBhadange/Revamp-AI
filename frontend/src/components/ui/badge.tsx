"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'info' | 'success' | 'warning' | 'danger';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: 'bg-stone-100 text-stone-700 border-stone-200',
    outline: 'bg-white text-stone-700 border-stone-300',
    info: 'bg-orange-50 text-orange-700 border-orange-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded border px-2 py-0.5 text-xs font-tech font-bold uppercase tracking-wider transition-colors',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
