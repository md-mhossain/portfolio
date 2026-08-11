'use client';

import { useQuery } from '@tanstack/react-query';
import { projectsApi, type ProjectListParams } from '@/lib/api/projects';

export function useProjects(params: ProjectListParams = {}) {
  return useQuery({
    queryKey: ['projects', 'public', params],
    queryFn: () => projectsApi.listPublic(params),
  });
}

export function useFeaturedProjects(limit = 3) {
  return useProjects({ limit, featured: 'true' });
}

export function useAdminProjects(params: ProjectListParams = {}) {
  return useQuery({
    queryKey: ['projects', 'admin', params],
    queryFn: () => projectsApi.listAdmin(params),
  });
}

export function useProject(slug: string) {
  return useQuery({
    queryKey: ['project', slug],
    queryFn: () => projectsApi.getPublic(slug),
    enabled: Boolean(slug),
  });
}

export function useProjectStats() {
  return useQuery({
    queryKey: ['projects', 'stats'],
    queryFn: () => projectsApi.stats(),
  });
}
