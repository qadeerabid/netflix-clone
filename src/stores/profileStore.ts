'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '@/types';

interface ProfileState {
  profiles: Profile[];
  activeProfile: Profile | null;
  setActiveProfile: (profile: Profile) => void;
  addProfile: (profile: Omit<Profile, 'id'>) => void;
  removeProfile: (id: string) => void;
  updateProfile: (id: string, data: Partial<Profile>) => void;
  initializeProfiles: (userId: string) => void;
}

const DEFAULT_COLORS = ['#E50914', '#0071EB', '#E87C03', '#54B9C5', '#2ECC71'];

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profiles: [],
      activeProfile: null,
      setActiveProfile: (profile) => set({ activeProfile: profile }),
      addProfile: (profile) => {
        const newProfile: Profile = { ...profile, id: Math.random().toString(36).slice(2) };
        set((state) => ({ profiles: [...state.profiles, newProfile] }));
      },
      removeProfile: (id) => {
        set((state) => ({ profiles: state.profiles.filter((p) => p.id !== id) }));
      },
      updateProfile: (id, data) => {
        set((state) => ({
          profiles: state.profiles.map((p) => (p.id === id ? { ...p, ...data } : p)),
        }));
      },
      initializeProfiles: (userId) => {
        const existing = get().profiles.filter((p) => p.userId === userId);
        if (existing.length === 0) {
          const defaultProfile: Profile = {
            id: Math.random().toString(36).slice(2),
            name: 'Profile 1',
            avatar: 'A',
            color: DEFAULT_COLORS[0],
            userId,
          };
          set((state) => ({ profiles: [...state.profiles, defaultProfile] }));
        }
      },
    }),
    { name: 'profiles-storage' }
  )
);
