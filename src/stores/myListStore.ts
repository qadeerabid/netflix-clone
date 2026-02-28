'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie, TVShow } from '@/types';

type MediaItem = (Movie | TVShow) & { media_type?: string };

interface MyListState {
  items: MediaItem[];
  addItem: (item: MediaItem) => void;
  removeItem: (id: number) => void;
  isInList: (id: number) => boolean;
  clearList: () => void;
}

export const useMyListStore = create<MyListState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const exists = get().items.some((i) => i.id === item.id);
        if (!exists) {
          set((state) => ({ items: [...state.items, item] }));
        }
      },
      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
      },
      isInList: (id) => get().items.some((i) => i.id === id),
      clearList: () => set({ items: [] }),
    }),
    { name: 'my-list-storage' }
  )
);
