'use client';

import { Inbox, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onRetry?: () => void;
  className?: string;
}

export function EmptyState({
  title = 'Nothing here yet',
  description = 'Items you add will appear here.',
  action,
  onRetry,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 py-20 text-center',
        className,
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <Inbox className="h-7 w-7 text-muted-foreground" />
      </div>
      <div className="space-y-1 px-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry}>
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
      ) : (
        action
      )}
    </div>
  );
}
