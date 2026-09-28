"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="relative w-full overflow-auto rounded-lg border border-stone-200 bg-white shadow-sm">
      <table className={cn('w-full caption-bottom text-xs text-stone-800', className)} {...props} />
    </div>
  );
}

export function TableHeader({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold uppercase tracking-wider', className)} {...props} />;
}

export function TableBody({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('[&_tr:last-child]:border-0 divide-y divide-stone-100 bg-white', className)} {...props} />;
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr className={cn('hover:bg-stone-50/80 transition-colors data-[state=selected]:bg-stone-50', className)} {...props} />;
}

export function TableHead({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return <th className={cn('h-9 px-4 text-left align-middle font-semibold text-stone-600 uppercase text-xs tracking-wider', className)} {...props} />;
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn('p-5 align-middle [&:has([role=checkbox])]:pr-0', className)} {...props} />;
}
