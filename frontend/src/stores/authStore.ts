"use client";

import { create } from 'zustand';
import { User } from '@/types/auth';
import { authApi } from '@/lib/api/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,

  login: async (email: string, pass: string) => {
    set({ isLoading: true, error: null });
    try {
      await authApi.login(email, pass);
      const user = await authApi.me();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (err: unknown) {
      set({ error: err.message || 'Login failed', isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore
    } finally {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  initialize: async () => {
    let token = null;
    try {
      token = localStorage.getItem('revamp_ai_jwt');
    } catch (e) {
      console.error("localStorage access error:", e);
    }

    if (!token) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      return;
    }

    try {
      const user = await authApi.me();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch {
      try {
        localStorage.removeItem('revamp_ai_jwt');
      } catch (e) {}
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
