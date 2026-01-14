import { tmdbService } from '../services/tmdb';
import type { Movie } from '../types/tmdb';

interface HeroBannerProps {
  movie: Movie;
}

export function HeroBanner({ movie }: HeroBannerProps) {
  const backdropUrl = tmdbService.getImageUrl(movie.backdrop_path, 'original');

  return (
    <div className="relative h-96 rounded-3xl overflow-hidden mb-8">
      <div className="absolute inset-0">
        <img
          src={backdropUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
      </div>

      <div className="relative h-full flex items-center px-12">
        <div className="max-w-xl">
          <h2 className="text-5xl font-bold text-white mb-4 leading-tight">
            {movie.title}
          </h2>
          <p className="text-gray-300 text-sm mb-4 line-clamp-3">
            {movie.overview}
          </p>
          <div className="flex items-center gap-2 mb-6">
            <img
              src="https://flagcdn.com/w20/us.png"
              alt="English"
              className="w-5 h-3"
            />
            <span className="text-gray-400 text-sm">English</span>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg flex items-center gap-3 transition-colors">
            <span>Watch</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
