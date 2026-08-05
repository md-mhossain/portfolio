import 'server-only';
import type { ApiResponse, Blog, PaginationMeta, Project, Skill } from '@/types';
import { CACHE_TAGS, REVALIDATE_PUBLIC, REVALIDATE_SETTINGS } from '@/lib/cache';
import { buildQuery } from './query';
import type { BlogListParams } from './blogs';
import type { ProjectListParams } from './projects';

const API_BASE = process.env.API_URL ?? 'http://localhost:4000';

interface ServerFetchOptions {
  revalidate?: number | false;
  tags?: string[];
}

export interface PaginatedResult<T> {
  data: T[];
  meta?: PaginationMeta;
}

async function serverFetchRaw<T>(
  path: string,
  options: ServerFetchOptions = {},
): Promise<ApiResponse<T> | null> {
  const revalidate = options.revalidate ?? REVALIDATE_PUBLIC;

  try {
    const res = await fetch(`${API_BASE}/api/v1${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...(revalidate === false
        ? { cache: 'no-store' as const }
        : { next: { revalidate, tags: options.tags } }),
    });
    if (!res.ok) return null;
    return (await res.json()) as ApiResponse<T>;
  } catch {
    return null;
  }
}

async function serverFetch<T>(path: string, options: ServerFetchOptions = {}): Promise<T | null> {
  const payload = await serverFetchRaw<T>(path, options);
  return payload?.data ?? null;
}

export async function serverListProjects(
  params: ProjectListParams = {},
): Promise<PaginatedResult<Project>> {
  const payload = await serverFetchRaw<Project[]>(buildQuery('/projects', params), {
    tags: [CACHE_TAGS.projects],
  });
  return { data: payload?.data ?? [], meta: payload?.meta };
}

export async function serverListBlogs(params: BlogListParams = {}): Promise<PaginatedResult<Blog>> {
  const payload = await serverFetchRaw<Blog[]>(buildQuery('/blogs', params), {
    tags: [CACHE_TAGS.blogs],
  });
  return { data: payload?.data ?? [], meta: payload?.meta };
}

export async function serverListSkills(params: { page?: number; limit?: number } = {}): Promise<PaginatedResult<Skill>> {
  const payload = await serverFetchRaw<Skill[]>(buildQuery('/skills', params), {
    tags: [CACHE_TAGS.skills],
  });
  return { data: payload?.data ?? [], meta: payload?.meta };
}

export async function serverGetBlog(slug: string) {
  return serverFetch<Blog>(`/blogs/slug/${slug}`, { tags: [CACHE_TAGS.blogs] });
}

export async function serverGetProject(slug: string) {
  return serverFetch<Project>(`/projects/slug/${slug}`, { tags: [CACHE_TAGS.projects] });
}

export async function serverGetSettings(keys?: string) {
  const path = keys ? buildQuery('/settings', { keys }) : '/settings';
  return serverFetch<Record<string, unknown>>(path, {
    revalidate: REVALIDATE_SETTINGS,
    tags: [CACHE_TAGS.settings],
  });
}
