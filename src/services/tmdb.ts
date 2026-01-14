import type { TMDBResponse, Movie, Genre } from '../types/tmdb';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const tmdbService = {
  getImageUrl: (path: string | null, size: 'w500' | 'w780' | 'original' = 'w500') => {
    if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
    return `${IMAGE_BASE_URL}/${size}${path}`;
  },

  getTrending: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },

  getPopular: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },

  getNowPlaying: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },

  getTopRated: async (): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },

  searchMovies: async (query: string): Promise<Movie[]> => {
    if (!query.trim()) return [];
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },

  getGenres: async (): Promise<Genre[]> => {
    const response = await fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.genres;
  },

  getMoviesByGenre: async (genreId: number): Promise<Movie[]> => {
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`
    );
    const data: TMDBResponse = await response.json();
    return data.results;
  },
};
