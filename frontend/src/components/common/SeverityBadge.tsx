"use client";

import React from 'react';
import { Badge } from '@/components/ui/badge';

export function SeverityBadge({ severity }: { severity: string }) {
  const normalized = (severity || '').toLowerCase();

  switch (normalized) {
    case 'critical':
      return <Badge variant="danger" className="font-bold border-red-300 bg-red-100 text-red-800">CRITICAL</Badge>;
    case 'high':
      return <Badge variant="warning" className="font-semibold border-amber-300 bg-amber-100 text-amber-900">HIGH</Badge>;
    case 'medium':
      return <Badge variant="warning">MEDIUM</Badge>;
    case 'low':
      return <Badge variant="info">LOW</Badge>;
    default:
      return <Badge variant="outline">{severity.toUpperCase()}</Badge>;
  }
}
