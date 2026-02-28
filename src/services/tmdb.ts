import { TMDBResponse, Movie, TVShow, MovieDetails, TVShowDetails, Genre, Cast, Video } from '@/types';

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  url.searchParams.set('api_key', TMDB_API_KEY);
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));

  const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export const tmdbService = {
  getTrending: (mediaType: 'all' | 'movie' | 'tv' = 'all', timeWindow: 'day' | 'week' = 'week') =>
    fetchTMDB<TMDBResponse<Movie & TVShow>>(`/trending/${mediaType}/${timeWindow}`),

  getTopRatedMovies: () => fetchTMDB<TMDBResponse<Movie>>('/movie/top_rated'),
  getPopularMovies: () => fetchTMDB<TMDBResponse<Movie>>('/movie/popular'),
  getNowPlayingMovies: () => fetchTMDB<TMDBResponse<Movie>>('/movie/now_playing'),
  getUpcomingMovies: () => fetchTMDB<TMDBResponse<Movie>>('/movie/upcoming'),

  getTopRatedTV: () => fetchTMDB<TMDBResponse<TVShow>>('/tv/top_rated'),
  getPopularTV: () => fetchTMDB<TMDBResponse<TVShow>>('/tv/popular'),
  getAiringTodayTV: () => fetchTMDB<TMDBResponse<TVShow>>('/tv/airing_today'),
  getOnTheAirTV: () => fetchTMDB<TMDBResponse<TVShow>>('/tv/on_the_air'),

  getMoviesByGenre: (genreId: number) =>
    fetchTMDB<TMDBResponse<Movie>>('/discover/movie', { with_genres: String(genreId), sort_by: 'popularity.desc' }),

  getTVByGenre: (genreId: number) =>
    fetchTMDB<TMDBResponse<TVShow>>('/discover/tv', { with_genres: String(genreId), sort_by: 'popularity.desc' }),

  getMovieDetails: (movieId: number) =>
    fetchTMDB<MovieDetails>(`/movie/${movieId}`),

  getTVDetails: (tvId: number) =>
    fetchTMDB<TVShowDetails>(`/tv/${tvId}`),

  getMovieCredits: (movieId: number) =>
    fetchTMDB<{ id: number; cast: Cast[] }>(`/movie/${movieId}/credits`),

  getTVCredits: (tvId: number) =>
    fetchTMDB<{ id: number; cast: Cast[] }>(`/tv/${tvId}/credits`),

  getMovieVideos: (movieId: number) =>
    fetchTMDB<{ id: number; results: Video[] }>(`/movie/${movieId}/videos`),

  getTVVideos: (tvId: number) =>
    fetchTMDB<{ id: number; results: Video[] }>(`/tv/${tvId}/videos`),

  getSimilarMovies: (movieId: number) =>
    fetchTMDB<TMDBResponse<Movie>>(`/movie/${movieId}/similar`),

  getSimilarTV: (tvId: number) =>
    fetchTMDB<TMDBResponse<TVShow>>(`/tv/${tvId}/similar`),

  searchMulti: (query: string) =>
    fetchTMDB<TMDBResponse<Movie & TVShow>>('/search/multi', { query }),

  searchMovies: (query: string) =>
    fetchTMDB<TMDBResponse<Movie>>('/search/movie', { query }),

  searchTV: (query: string) =>
    fetchTMDB<TMDBResponse<TVShow>>('/search/tv', { query }),

  getMovieGenres: () =>
    fetchTMDB<{ genres: Genre[] }>('/genre/movie/list'),

  getTVGenres: () =>
    fetchTMDB<{ genres: Genre[] }>('/genre/tv/list'),
};
