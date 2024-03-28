// MovieDetailsPage.js
import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { UserContext } from '../../App';
import styles from './MovieDetailsPage.module.css';
import { MovieDetails } from '../../utils/types';
import { posterBaseUrl } from '../../utils/constants';
import RatingChart from '../../components/charts/RatingChart';
import MoviePoster from '../../components/details/MoviePoster';
import MovieHeader from '../../components/details/MovieHeader';
import MovieDetailsList from '../../components/details/MovieDetailsList';

export default function MovieDetailsPage() {
  const context = useContext(UserContext);
  const movieData = useLoaderData() as MovieDetails;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
    setIsFavorite(
      favorites.some((fav: MovieDetails) => fav.id === movieData.id)
    );
  }, [movieData]);

  const handleToggleFavorites = () => {
    if (!movieData) return;

    const favorites = JSON.parse(
      localStorage.getItem('favoriteMovies') || '[]'
    );
    const isMovieInFavorites = favorites.some(
      (fav: MovieDetails) => fav.id === movieData.id
    );

    if (isMovieInFavorites) {
      const updatedFavorites = favorites.filter(
        (fav: MovieDetails) => fav.id !== movieData.id
      );
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      setIsFavorite(false);
    } else {
      favorites.push(movieData);
      localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  if (!context?.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!movieData) {
    return <p>Loading...</p>;
  }

  const additionalDetails = [
    { title: 'Release Date', description: movieData.release_date },
    {
      title: 'Genres',
      description: movieData.genres.map((genre) => genre.name).join(', '),
    },
    { title: 'Runtime', description: `${movieData.runtime} minutes` },
    {
      title: 'Production Companies',
      description: movieData.production_companies
        .map((company) => company.name)
        .join(', '),
    },
    {
      title: 'Production Countries',
      description: movieData.production_countries
        .map((country) => country.name)
        .join(', '),
    },
    { title: 'Tagline', description: movieData.tagline },
    { title: 'IMDb ID', description: movieData.imdb_id },
    {
      title: 'Homepage',
      description: (
        <a href={movieData.homepage} target="_blank" rel="noopener noreferrer">
          {movieData.homepage}
        </a>
      ),
    },
  ];

  return (
    <div className={styles.detailsPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <MoviePoster
            posterPath={posterBaseUrl + movieData.poster_path}
            title={movieData.title}
          />
          <MovieHeader
            title={movieData.title}
            overview={movieData.overview}
            rating={<RatingChart rating={movieData.vote_average} />}
            handleToggleFavorites={handleToggleFavorites}
            isFavorite={isFavorite}
          />
        </div>
        <MovieDetailsList details={additionalDetails} />
      </div>
    </div>
  );
}
