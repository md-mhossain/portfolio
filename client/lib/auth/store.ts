'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/lib/api/auth';
import { setAccessToken } from '@/lib/api/client';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  refresh: () => Promise<User | null>;
  setUser: (user: User | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      status: 'idle',

      setUser: (user) => set({ user, status: user ? 'authenticated' : 'unauthenticated' }),

      login: async (email, password) => {
        const response = await authApi.login({ email, password });
        setAccessToken(response.data.accessToken);
        set({ user: response.data.user, accessToken: response.data.accessToken, status: 'authenticated' });
        return response.data.user;
      },

      register: async (name, email, password) => {
        const response = await authApi.register({ name, email, password });
        setAccessToken(response.data.accessToken);
        set({ user: response.data.user, accessToken: response.data.accessToken, status: 'authenticated' });
        return response.data.user;
      },

      refresh: async () => {
        const current = get().accessToken;
        if (current) setAccessToken(current);
        try {
          const response = await authApi.refresh();
          setAccessToken(response.data.accessToken);
          set({
            user: response.data.user,
            accessToken: response.data.accessToken,
            status: 'authenticated',
          });
          return response.data.user;
        } catch {
          setAccessToken(null);
          set({ user: null, accessToken: null, status: 'unauthenticated' });
          return null;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          setAccessToken(null);
          set({ user: null, accessToken: null, status: 'unauthenticated' });
        }
      },

      reset: () => {
        setAccessToken(null);
        set({ user: null, accessToken: null, status: 'unauthenticated' });
      },
    }),
    {
      name: 'devmonir-auth',
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
    },
  ),
);
