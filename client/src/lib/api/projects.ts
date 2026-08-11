import { api } from './client';
import { buildQuery } from './query';
import type { Project } from '@/types';

export interface ProjectPayload {
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  repoUrl?: string | null;
  liveUrl?: string | null;
  tags: string[];
  featured: boolean;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  order?: number;
}

export interface ProjectListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  featured?: string;
  sortBy?: string;
  sortOrder?: string;
}

export const projectsApi = {
  listPublic: (params: ProjectListParams = {}) =>
    api.get<Project[]>(buildQuery('/projects', params)),
  listAdmin: (params: ProjectListParams = {}) =>
    api.get<Project[]>(buildQuery('/projects/admin', params)),
  getPublic: (slug: string) => api.get<Project>(`/projects/slug/${slug}`),
  getAdmin: (id: string) => api.get<Project>(`/projects/admin/${id}`),
  create: (payload: ProjectPayload) => api.post<Project>('/projects', payload),
  update: (id: string, payload: Partial<ProjectPayload>) =>
    api.patch<Project>(`/projects/${id}`, payload),
  delete: (id: string) => api.delete<null>(`/projects/${id}`),
  stats: () => api.get<{ total: number; published: number; featured: number; drafts: number }>('/projects/admin/stats'),
};

export { buildQuery };
