import { tmdbService } from '../services/tmdb';
import type { Movie } from '../types/tmdb';

interface HeroBannerProps {
  primary: Movie;
  secondary?: Movie;
}

export function HeroBanner({ primary, secondary }: HeroBannerProps) {
  const backdropUrl = tmdbService.getImageUrl(primary.backdrop_path, 'w780');
  const primaryPosterUrl = tmdbService.getImageUrl(primary.poster_path, 'w500');
  const secondaryPosterUrl = secondary
    ? tmdbService.getImageUrl(secondary.poster_path, 'w500')
    : null;

  return (
    <div className="flex items-stretch gap-6 h-80 rounded-3xl mb-8 bg-panel-bg px-8 py-6 shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
      {/* Left text panel */}
      <div className="flex flex-col justify-center w-[32%] bg-gradient-to-r from-black via-black to-transparent rounded-2xl px-8 py-6">
        <h2 className="text-4xl font-extrabold text-white mb-3 leading-tight tracking-tight">
          {primary.title}
        </h2>
        <p className="text-gray-300 text-xs mb-4 line-clamp-3 max-w-xs">
          {primary.overview}
        </p>
        <div className="flex items-center gap-2 mb-5">
          <img
            src="https://flagcdn.com/w20/us.png"
            alt="English"
            className="w-5 h-3"
          />
          <span className="text-gray-400 text-xs">English</span>
        </div>
        <div className="relative inline-flex items-center">
          <button className="bg-accent-red hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-[0_0_25px_rgba(248,45,45,0.8)]">
            Watch
          </button>
          <div className="flex items-center gap-1 ml-4 mt-7">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full -ml-2" />
            <span className="w-3 h-3 bg-blue-500 rounded-full -ml-2" />
          </div>
        </div>
      </div>

      {/* Center main backdrop image */}
      <div className="flex-1 relative rounded-2xl overflow-hidden">
        <img
          src={backdropUrl}
          alt={primary.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right side poster / cropped image */}
      <div className="w-40 rounded-2xl overflow-hidden hidden md:block">
        <img
          src={secondaryPosterUrl || primaryPosterUrl || backdropUrl}
          alt={secondary?.title ?? primary.title}
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
