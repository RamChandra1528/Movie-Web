# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Tooling and commands

Commands below assume `npm`; adapt to `pnpm`/`yarn` if you use those instead.

### Install dependencies
- `npm install`

### Run the development server
- `npm run dev`
  - Starts the Vite dev server (default: http://localhost:5173).

### Build for production
- `npm run build`
  - Runs the Vite production build.

### Preview the production build
- `npm run preview`
  - Serves the built app locally for testing the production build.

### Linting and type-checking
- `npm run lint`
  - Runs ESLint over the entire project (configured via `eslint` defaults and `@eslint/js`, `typescript-eslint`, React plugins).
- `npm run typecheck`
  - Runs TypeScript in no-emit mode using `tsconfig.app.json`.

### Testing
- There is currently no test script configured in `package.json` and no test framework present in the repo. If tests are added, update this section with how to run the full suite and a single test.

## High-level architecture

This is a Vite + React + TypeScript single-page application styled with Tailwind CSS.

### Build and configuration layer
- `vite.config.ts`
  - Configures Vite with the React plugin.
  - Excludes `lucide-react` from dependency optimization.
- TypeScript configs:
  - `tsconfig.json` is a project reference entry point that points to:
    - `tsconfig.app.json` for the browser app (strict, `src`-only, `jsx: react-jsx`).
    - `tsconfig.node.json` (Node/Vite tooling config).

### Entry point and composition
- `index.html`
  - Standard Vite HTML shell that provides the `#root` element.
- `src/main.tsx`
  - React entry: creates the root and renders `<App />` inside `React.StrictMode`.
  - Imports global styles from `src/index.css`.
- `src/App.tsx`
  - Top-level application component responsible for:
    - Owning all movie-related state (`heroMovie`, `popularMovies`, `continueWatching`, `searchResults`, `isSearching`, `activeTab`).
    - Bootstrapping initial data by calling `tmdbService.getTrending`, `getPopular`, and `getTopRated` in parallel on mount.
    - Handling search via `tmdbService.searchMovies` and toggling between default lists and search results.
    - Composing the main layout with `Sidebar`, `Header`, `HeroBanner`, and `MovieCard` lists.
  - All TMDB data consumed by the UI flows through this component.

### UI component layer (`src/components`)
- `Sidebar.tsx`
  - Fixed left-side navigation with hard-coded "New feed" items and a category list.
  - Exposes optional `selectedCategory` and `onCategorySelect` props to allow higher-level components to control category selection.
- `Header.tsx`
  - Top bar with back/forward buttons, search input, and simple user/menu actions.
  - Accepts `onSearch` callback and calls it on each input change; this is wired to `App` for search behavior.
- `HeroBanner.tsx`
  - Large hero section for a single `Movie`.
  - Uses `tmdbService.getImageUrl` to build the backdrop image URL.
  - Renders the movie title, overview, and a prominent “Watch” call-to-action.
- `MovieCard.tsx`
  - Reusable movie tile component with two display modes:
    - `size="small"` (default): poster-focused vertical card used in the horizontal carousels.
    - `size="large"`: backdrop-style wide card used for the "Continue Watching" row.
  - All artwork URLs are resolved via `tmdbService.getImageUrl` to avoid duplicating URL logic.

Together, these components implement a single-page layout where `App` owns state and passes data/handlers down, while each component focuses on one part of the UI.

### Data and API layer (`src/services` and `src/types`)
- `src/services/tmdb.ts`
  - Centralized wrapper for The Movie Database (TMDB) HTTP API.
  - Reads the API key from `import.meta.env.VITE_TMDB_API_KEY` and defines:
    - Image helper: `getImageUrl(path, size)` for constructing image URLs with fallbacks.
    - Data fetchers for movies: `getTrending`, `getPopular`, `getNowPlaying`, `getTopRated`.
    - Search: `searchMovies(query)` (returns empty array for blank queries).
    - Genre utilities: `getGenres` and `getMoviesByGenre`.
  - All network calls from the UI should go through this service instead of calling `fetch` directly.
- `src/types/tmdb.ts`
  - TypeScript interfaces representing TMDB responses:
    - `Movie` – core movie fields used throughout the UI.
    - `TMDBResponse` – generic paged response shape (with `results: Movie[]`).
    - `Genre` – basic genre shape.
  - These types are used by `tmdbService` and `App` to keep data access strongly typed.

### Styling
- `src/index.css`
  - Tailwind entry file (`@tailwind base`, `components`, `utilities`).
  - Defines a `scrollbar-hide` utility for horizontally scrollable carousels used in `App`.

## Environment configuration

- The TMDB service expects `VITE_TMDB_API_KEY` to be available in the Vite environment (`import.meta.env.VITE_TMDB_API_KEY`).
- When modifying or adding API calls, prefer extending `src/services/tmdb.ts` and the corresponding types in `src/types/tmdb.ts` rather than using `fetch` directly in components.
