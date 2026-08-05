import { api } from './client';
import type { Skill, SkillCategory } from '@/types';

export interface SkillPayload {
  name: string;
  description: string;
  iconUrl: string;
  category: SkillCategory;
  proficiency: number;
  order?: number;
}

export interface SkillListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export const skillsApi = {
  list: (params: SkillListParams = {}) => api.get<Skill[]>(buildSkillQuery(params)),
  get: (id: string) => api.get<Skill>(`/skills/${id}`),
  create: (payload: SkillPayload) => api.post<Skill>('/skills', payload),
  update: (id: string, payload: Partial<SkillPayload>) => api.patch<Skill>(`/skills/${id}`, payload),
  delete: (id: string) => api.delete<null>(`/skills/${id}`),
};

function buildSkillQuery(params: SkillListParams): string {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  });
  const qs = search.toString();
  return qs ? `/skills?${qs}` : '/skills';
}
