import React, { useContext, useState, useEffect } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../App';
import { apiCall } from '../../utils/apiCall';
import { Movie, MoviesResponse } from '../../utils/types';
import MovieCard from '../../components/cards/MovieCard';
import Search from '../../components/search/Search';
import styles from './HomePage.module.css';

const PAGE_SIZE = 12;

export default function HomePage() {
  const context = useContext(UserContext);
  const navigate = useNavigate();
  const [defaultMovies, setDefaultMovies] = useState<Movie[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const [searchParams] = useSearchParams();
  const searchQueryParam = searchParams.get('search');

  useEffect(() => {
    async function fetchDefaultMovies() {
      try {
        const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
        const moviesData = await apiCall<MoviesResponse>(url);
        setDefaultMovies(moviesData.results);
      } catch (error) {
        console.error('Error fetching default movies:', error);
      }
    }

    async function fetchSearchedMovies(query: string) {
      try {
        setIsSearchLoading(true);
        const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
        const moviesData = await apiCall<MoviesResponse>(url);
        setSearchedMovies(moviesData.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setIsSearchLoading(false);
      }
    }

    if (searchQueryParam) {
      setSearchQuery(searchQueryParam);
      fetchSearchedMovies(searchQueryParam);
    } else {
      setSearchQuery('');
      fetchDefaultMovies();
    }
  }, [searchQueryParam]);

  const handleSearch = async (query: string) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  const handleClear = () => {
    navigate('/');
  };

  if (!context?.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const moviesToRender = searchQuery ? searchedMovies : defaultMovies;

  return (
    <div className={styles.moviesContainer}>
      <Search onSearch={handleSearch} onClear={handleClear} />

      <div className={styles.moviesList}>
        {isSearchLoading ? (
          <p>Loading...</p>
        ) : moviesToRender.length > 0 ? (
          moviesToRender
            .slice(0, page * PAGE_SIZE)
            .map((movie) => <MovieCard key={movie.id} movieData={movie} />)
        ) : (
          <p>No movies found</p>
        )}
      </div>

      {moviesToRender.length > page * PAGE_SIZE && (
        <button onClick={() => setPage(page + 1)}>Load more</button>
      )}
    </div>
  );
}
