'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  hint?: string;
  accent?: 'default' | 'accent' | 'destructive' | 'success';
}

const accentClasses: Record<string, string> = {
  default: 'bg-muted text-foreground',
  accent: 'bg-accent/20 text-accent',
  destructive: 'bg-destructive/10 text-destructive',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
};

export function StatCard({ label, value, icon: Icon, hint, accent = 'default' }: StatCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="font-display text-3xl font-bold">{value}</p>
          {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-2xl', accentClasses[accent])}>
          <Icon className="h-6 w-6" />
        </div>
      </CardContent>
    </Card>
  );
}
