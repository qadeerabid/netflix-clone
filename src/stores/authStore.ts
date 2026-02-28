'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { generateId } from '@/utils';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  signUp: (email: string, password: string, name?: string) => Promise<void>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Demo-only authentication store. In a real application, this should
 * connect to a secure backend with proper credential verification.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      signIn: async (email: string, password: string) => {
        if (!EMAIL_REGEX.test(email)) throw new Error('Invalid email format');
        if (password.length < 4) throw new Error('Password must be at least 4 characters');
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const user: User = {
          id: generateId(),
          email,
          name: email.split('@')[0],
          createdAt: new Date().toISOString(),
        };
        set({ user, isAuthenticated: true, isLoading: false });
      },
      signOut: () => {
        set({ user: null, isAuthenticated: false });
      },
      signUp: async (email: string, password: string, name?: string) => {
        if (!EMAIL_REGEX.test(email)) throw new Error('Invalid email format');
        if (password.length < 4) throw new Error('Password must be at least 4 characters');
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const user: User = {
          id: generateId(),
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
