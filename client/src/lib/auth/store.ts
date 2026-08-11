"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authApi } from "@/lib/api/auth";
import type { User } from "@/types";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  setAccessToken: (accessToken: string | null) => void;
  refresh: () => Promise<User | null>;
  setUser: (user: User | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      status: "idle",

      setUser: (user) =>
        set({ user, status: user ? "authenticated" : "unauthenticated" }),

      setAccessToken: (accessToken) => set({ accessToken }),

      login: async (email, password) => {
        const response = await authApi.login({ email, password });
        set({
          user: response.data.user,
          accessToken: response.data.accessToken,
          status: "authenticated",
        });
        return response.data.user;
      },

      register: async (name, email, password) => {
        const response = await authApi.register({ name, email, password });
        set({
          user: response.data.user,
          accessToken: response.data.accessToken,
          status: "authenticated",
        });
        return response.data.user;
      },

      refresh: async () => {
        set({ status: "loading" });
        try {
          const response = await authApi.refresh();
          const data = response.data;
          set({
            user: data.user,
            accessToken: data.accessToken,
            status: "authenticated",
          });
          return data.user;
        } catch {
          set({ user: null, accessToken: null, status: "unauthenticated" });
          return null;
        }
      },

      logout: async () => {
        try {
          await authApi.logout();
        } finally {
          set({ user: null, accessToken: null, status: "unauthenticated" });
        }
      },

      reset: () => {
        set({ user: null, accessToken: null, status: "unauthenticated" });
      },
    }),
    {
      name: "devmonir-auth",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    },
  ),
);
