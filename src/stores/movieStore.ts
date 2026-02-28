'use client';

import { create } from 'zustand';
import { Movie, TVShow } from '@/types';

interface MovieState {
  trending: (Movie & TVShow)[];
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  popularTV: TVShow[];
  topRatedTV: TVShow[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  isLoading: boolean;
  error: string | null;
  setTrending: (items: (Movie & TVShow)[]) => void;
  setPopularMovies: (items: Movie[]) => void;
  setTopRatedMovies: (items: Movie[]) => void;
  setPopularTV: (items: TVShow[]) => void;
  setTopRatedTV: (items: TVShow[]) => void;
  setActionMovies: (items: Movie[]) => void;
  setComedyMovies: (items: Movie[]) => void;
  setHorrorMovies: (items: Movie[]) => void;
  setRomanceMovies: (items: Movie[]) => void;
  setDocumentaries: (items: Movie[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  trending: [],
  popularMovies: [],
  topRatedMovies: [],
  popularTV: [],
  topRatedTV: [],
  actionMovies: [],
  comedyMovies: [],
  horrorMovies: [],
  romanceMovies: [],
  documentaries: [],
  isLoading: false,
  error: null,
  setTrending: (items) => set({ trending: items }),
  setPopularMovies: (items) => set({ popularMovies: items }),
  setTopRatedMovies: (items) => set({ topRatedMovies: items }),
  setPopularTV: (items) => set({ popularTV: items }),
  setTopRatedTV: (items) => set({ topRatedTV: items }),
  setActionMovies: (items) => set({ actionMovies: items }),
  setComedyMovies: (items) => set({ comedyMovies: items }),
  setHorrorMovies: (items) => set({ horrorMovies: items }),
  setRomanceMovies: (items) => set({ romanceMovies: items }),
  setDocumentaries: (items) => set({ documentaries: items }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
}));
