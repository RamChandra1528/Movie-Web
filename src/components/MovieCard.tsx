import { tmdbService } from '../services/tmdb';
import type { Movie } from '../types/tmdb';

interface MovieCardProps {
  movie: Movie;
  size?: 'small' | 'large';
}

export function MovieCard({ movie, size = 'small' }: MovieCardProps) {
  const posterUrl = tmdbService.getImageUrl(movie.poster_path, 'w500');

  if (size === 'large') {
    return (
      <div className="relative group cursor-pointer flex-shrink-0 w-80 h-48 rounded-xl overflow-hidden">
        <img
          src={tmdbService.getImageUrl(movie.backdrop_path, 'w780')}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h4 className="text-white font-semibold text-lg">{movie.title}</h4>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group cursor-pointer flex-shrink-0 w-44">
      <div className="relative rounded-xl overflow-hidden mb-3 h-64">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <h4 className="text-white font-medium text-sm mb-1 truncate">{movie.title}</h4>
      <p className="text-gray-500 text-xs">
        Action, SF, War
      </p>
    </div>
  );
}
