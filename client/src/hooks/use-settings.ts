'use client';

import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/lib/api/index';

export function useSettings(keys?: string) {
  return useQuery({
    queryKey: ['settings', keys],
    queryFn: () => settingsApi.get(keys),
  });
}
