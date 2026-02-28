# Netflix Clone

A complete Netflix clone frontend built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🎬 **Browse Content**: Movies, TV Shows, trending, and genre-based rows
- 🔍 **Search**: Real-time search with debouncing
- 👤 **Authentication**: Sign in/sign up with Zustand state management
- 👥 **Profiles**: Multi-profile support per user
- ❤️ **My List**: Save movies and TV shows for later
- 🎥 **Video Player**: YouTube-based trailer player with custom controls
- 📱 **Responsive**: Mobile-first responsive design
- ✨ **Animations**: Smooth transitions with Framer Motion

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form
- **Video Player**: React Player
- **API**: TMDB (The Movie Database)

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env.local` and add your TMDB API key
4. Run: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Getting a TMDB API Key

1. Visit [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Create a free account
3. Go to Settings > API
4. Request an API key

## Environment Variables

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

## Project Structure

```
src/
├── app/          # Next.js App Router pages
├── components/   # React components
│   ├── auth/     # Authentication forms
│   ├── browse/   # Movie cards, rows, billboard
│   ├── layout/   # Navbar, Footer
│   ├── player/   # Video player
│   ├── profiles/ # Profile selection
│   ├── search/   # Search components
│   └── ui/       # Reusable UI components
├── constants/    # App constants
├── hooks/        # Custom React hooks
├── services/     # TMDB API service
├── stores/       # Zustand stores
├── types/        # TypeScript types
└── utils/        # Utility functions
```
