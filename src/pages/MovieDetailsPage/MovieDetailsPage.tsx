import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { UserContext } from '../../App';
import styles from './MovieDetailsPage.module.css';
import { MovieDetails } from '../../utils/types';
import { posterBaseUrl } from '../../utils/constants';
import RatingChart from '../../components/charts/RatingChart';

export default function MovieDetailsPage() {
  const context = useContext(UserContext);
  const movieData = useLoaderData() as MovieDetails;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Check if movie is in favorites when component mounts
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img
          src={posterBaseUrl + movieData.poster_path}
          alt={movieData.title}
          className={styles.poster}
        />
        <div className={styles.details}>
          <h2 className={styles.title}>{movieData.title}</h2>
          <p className={styles.overview}>{movieData.overview}</p>
          <div className={styles.rating}>
            <RatingChart rating={movieData.vote_average} />
            <span className={styles.voteAverage}>{movieData.vote_average}</span>
          </div>
          <button onClick={handleToggleFavorites}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </button>
        </div>
      </div>
      <div className={styles.additionalDetails}>
        <p>
          <strong>Release Date:</strong> {movieData.release_date}
        </p>
        <p>
          <strong>Genres:</strong>{' '}
          {movieData.genres.map((genre) => genre.name).join(', ')}
        </p>
        <p>
          <strong>Runtime:</strong> {movieData.runtime} minutes
        </p>
        <p>
          <strong>Production Companies:</strong>{' '}
          {movieData.production_companies
            .map((company) => company.name)
            .join(', ')}
        </p>
      </div>
    </div>
  );
}
