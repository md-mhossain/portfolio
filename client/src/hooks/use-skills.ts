'use client';

import { useQuery } from '@tanstack/react-query';
import { skillsApi } from '@/lib/api/skills';

export function useSkills() {
  return useQuery({
    queryKey: ['skills'],
    queryFn: () => skillsApi.list({ limit: 100 }),
  });
}

export function useAdminSkills() {
  return useQuery({
    queryKey: ['skills', 'admin'],
    queryFn: () => skillsApi.list({ limit: 100 }),
  });
}
