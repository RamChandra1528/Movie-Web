import { useEffect, useState, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { MovieCard } from './components/MovieCard';
import { tmdbService } from './services/tmdb';
import type { Movie } from './types/tmdb';

function App() {
  const [heroMovie, setHeroMovie] = useState<Movie | null>(null);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [continueWatching, setContinueWatching] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'movies' | 'tv'>('movies');
  const [heroIndex, setHeroIndex] = useState(0);

  const moviesRowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const [trending, popular, topRated] = await Promise.all([
        tmdbService.getTrending(),
        tmdbService.getPopular(),
        tmdbService.getTopRated(),
      ]);

      if (trending.length > 0) {
        setTrendingMovies(trending);
        setHeroMovie(trending[0]);
        setHeroIndex(0);
      }

      setPopularMovies(popular.slice(0, 10));
      setContinueWatching(topRated.slice(0, 4));
    } catch (error) {
      console.error('Error loading movies:', error);
    }
  };

  useEffect(() => {
    if (!trendingMovies.length || isSearching) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => {
        const next = (prev + 1) % trendingMovies.length;
        setHeroMovie(trendingMovies[next]);
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [trendingMovies, isSearching]);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const results = await tmdbService.searchMovies(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const moviesToDisplay = isSearching ? searchResults : popularMovies;

  const scrollMovies = (direction: 'left' | 'right') => {
    const container = moviesRowRef.current;
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className="min-h-screen bg-app-bg text-white">
      <Sidebar />

      <div className="ml-64 min-h-screen bg-panel-bg">
        <Header
          onSearch={handleSearch}
          onBack={() => scrollMovies('left')}
          onForward={() => scrollMovies('right')}
        />

        <main className="px-8 pb-8">
          {heroMovie && !isSearching && <HeroBanner movie={heroMovie} />}

          <div className="mb-8">
            <div className="flex items-center gap-6 mb-6">
              <button
                onClick={() => setActiveTab('movies')}
                className={`text-lg font-semibold pb-2 ${
                  activeTab === 'movies'
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-500'
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => setActiveTab('tv')}
                className={`text-lg font-semibold pb-2 ${
                  activeTab === 'tv'
                    ? 'text-white border-b-2 border-white'
                    : 'text-gray-500'
                }`}
              >
                TV Show
              </button>
            </div>

            <div
              ref={moviesRowRef}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
            >
              {moviesToDisplay.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>

          {!isSearching && continueWatching.length > 0 && (
            <div>
              <h3 className="text-white text-xl font-semibold mb-6">
                Continue Watching
              </h3>
              <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {continueWatching.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} size="large" />
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
