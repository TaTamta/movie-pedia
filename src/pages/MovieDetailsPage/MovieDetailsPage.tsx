import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLoaderData } from 'react-router-dom';
import { UserContext } from '../../App';
import styles from './MovieDetailsPage.module.css';
import { MovieDetails } from '../../utils/types';
import { posterBaseUrl } from '../../utils/constants';
import RatingChart from '../../components/charts/RatingChart';
import Button from '../../components/forrm-elements/Button/Button';

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

  return (
    <div className={styles.detailsPage}>
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
            </div>
            <Button
              type="primary"
              onClick={handleToggleFavorites}
              text={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            />
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
          <p>
            <strong>Production Countries:</strong>{' '}
            {movieData.production_countries
              .map((country) => country.name)
              .join(', ')}
          </p>
          <p>
            <strong>Tagline:</strong> {movieData.tagline}
          </p>
          <p>
            <strong>IMDb ID:</strong> {movieData.imdb_id}
          </p>
          <p>
            <strong>Homepage:</strong>{' '}
            <a
              href={movieData.homepage}
              target="_blank"
              rel="noopener noreferrer"
            >
              {movieData.homepage}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
