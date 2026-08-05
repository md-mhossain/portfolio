'use client';

import { useQuery } from '@tanstack/react-query';
import { blogsApi, type BlogListParams } from '@/lib/api/blogs';

export function useBlogs(params: BlogListParams = {}) {
  return useQuery({
    queryKey: ['blogs', 'public', params],
    queryFn: () => blogsApi.listPublic(params),
  });
}

export function useRecentBlogs(limit = 3) {
  return useBlogs({ limit });
}

export function useBlog(slug: string) {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: () => blogsApi.getPublic(slug),
    enabled: Boolean(slug),
  });
}

export function useAdminBlogs(params: BlogListParams = {}) {
  return useQuery({
    queryKey: ['blogs', 'admin', params],
    queryFn: () => blogsApi.listAdmin(params),
  });
}

export function useBlogStats() {
  return useQuery({
    queryKey: ['blogs', 'stats'],
    queryFn: () => blogsApi.stats(),
  });
}
