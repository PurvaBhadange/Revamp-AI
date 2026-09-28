import React from 'react';
import { LucideIcon, Inbox } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg border border-dashed border-stone-300 bg-stone-50/60 my-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-stone-500 mb-3 border border-stone-200 shadow-sm">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-semibold text-stone-800 uppercase tracking-wide mb-1">{title}</h3>
      <p className="text-xs text-stone-500 max-w-sm mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button size="sm" variant="primary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
