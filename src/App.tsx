import { useEffect, useState } from 'react';
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
  const [watchlist, setWatchlist] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'movies' | 'tv'>('movies');
  const [activeView, setActiveView] = useState<'browse' | 'watchlist'>('browse');
  const [heroIndex, setHeroIndex] = useState(0);

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
    const stored = window.localStorage.getItem('watchlist');
    if (stored) {
      try {
        const parsed: Movie[] = JSON.parse(stored);
        setWatchlist(parsed);
      } catch (error) {
        console.error('Failed to parse watchlist from localStorage', error);
      }
    }
  }, []);

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

  useEffect(() => {
    window.localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

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

  const toggleWatchlist = (movie: Movie) => {
    setWatchlist((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      }
      return [...prev, movie];
    });
  };

  const isInWatchlist = (movie: Movie) => watchlist.some((m) => m.id === movie.id);

  const moviesToDisplay = isSearching
    ? searchResults
    : activeView === 'watchlist'
    ? watchlist
    : popularMovies;

  const changeHero = (direction: 'left' | 'right') => {
    if (!trendingMovies.length) return;
    setHeroIndex((prev) => {
      const delta = direction === 'left' ? -1 : 1;
      const next = (prev + delta + trendingMovies.length) % trendingMovies.length;
      setHeroMovie(trendingMovies[next]);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-app-bg text-white">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      <div className="ml-64 min-h-screen bg-panel-bg">
        <Header
          onSearch={handleSearch}
          onBack={() => changeHero('left')}
          onForward={() => changeHero('right')}
        />

        <main className="px-8 pb-8">
          {heroMovie && !isSearching && (
            <HeroBanner
              primary={heroMovie}
              secondary={
                trendingMovies.length > 1
                  ? trendingMovies[(heroIndex + 1) % trendingMovies.length]
                  : undefined
              }
            />
          )}

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

            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {moviesToDisplay.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  inWatchlist={isInWatchlist(movie)}
                  onToggleWatchlist={toggleWatchlist}
                />
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
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    size="large"
                    inWatchlist={isInWatchlist(movie)}
                    onToggleWatchlist={toggleWatchlist}
                  />
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
