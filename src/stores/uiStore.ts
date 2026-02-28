'use client';

import { create } from 'zustand';
import { Movie, TVShow } from '@/types';

type MediaItem = (Movie | TVShow) & { media_type?: string };

interface UIState {
  isModalOpen: boolean;
  selectedItem: MediaItem | null;
  isSearchOpen: boolean;
  searchQuery: string;
  openModal: (item: MediaItem) => void;
  closeModal: () => void;
  setSearchOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isModalOpen: false,
  selectedItem: null,
  isSearchOpen: false,
  searchQuery: '',
  openModal: (item) => set({ isModalOpen: true, selectedItem: item }),
  closeModal: () => set({ isModalOpen: false, selectedItem: null }),
  setSearchOpen: (open) => set({ isSearchOpen: open }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
