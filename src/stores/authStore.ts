'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
}

/**
 * Demo-only authentication store. In a real application, this should
 * connect to a secure backend. Any email/password combination will succeed.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      signIn: async (email: string, _password: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const user: User = {
          id: Math.random().toString(36).slice(2),
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true, isLoading: false });
      },
      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },
      signUp: async (email: string, _password: string, name?: string) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const user: User = {
          id: Math.random().toString(36).slice(2),
          email,
          name: name || email.split('@')[0],
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true, isLoading: false });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);
