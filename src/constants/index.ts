export const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const HERO_BACKGROUND_IMAGE = 'https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e5-f008e353e0eb/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg';
export const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';

export const IMAGE_SIZES = {
  poster: 'w500',
  backdrop: 'original',
  profile: 'w185',
  small: 'w185',
  medium: 'w342',
  large: 'w780',
};

export const GENRES = {
  ACTION: 28,
  ADVENTURE: 12,
  ANIMATION: 16,
  COMEDY: 35,
  CRIME: 80,
  DOCUMENTARY: 99,
  DRAMA: 18,
  FAMILY: 10751,
  FANTASY: 14,
  HISTORY: 36,
  HORROR: 27,
  MUSIC: 10402,
  MYSTERY: 9648,
  ROMANCE: 10749,
  SCIENCE_FICTION: 878,
  THRILLER: 53,
  WAR: 10752,
  WESTERN: 37,
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PROFILES: '/profiles',
  BROWSE: '/browse',
  TV: '/browse/tv',
  MOVIES: '/browse/movies',
  LATEST: '/browse/latest',
  MY_LIST: '/browse/my-list',
  SEARCH: '/search',
  WATCH: '/watch',
  ACCOUNT: '/account',
};

export const PROFILE_AVATARS = [
  { id: 1, color: '#E50914', letter: 'A' },
  { id: 2, color: '#0071EB', letter: 'B' },
  { id: 3, color: '#E87C03', letter: 'C' },
  { id: 4, color: '#54B9C5', letter: 'D' },
  { id: 5, color: '#2ECC71', letter: 'E' },
];

export const SAMPLE_VIDEO_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
