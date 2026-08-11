'use client';

import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BackButton() {
  return (
    <Button variant="outline" type="button" onClick={() => window.history.back()}>
      <ArrowLeft className="h-4 w-4" />
      Go back
    </Button>
  );
}
