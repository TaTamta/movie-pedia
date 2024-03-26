import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import styles from './MovieDetailsPage.module.css';
import { Movie, movieDetails } from '../../utils/types';
import { posterBaseUrl } from '../../utils/contants';
import { apiCall } from '../../utils/apiCall';
import RatingChart from '../../components/charts/RatingChart';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState<movieDetails | null>(null);
  const context = useContext(UserContext);

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
        const movieDetails = await apiCall<movieDetails>(url);
        setMovieData(movieDetails);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

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
        </div>
      </div>
      <div className={styles.additionalDetails}>
        <p>
          <strong>Release Date:</strong> {movieData.release_date}
        </p>
        <p>
          <strong>Genres:</strong>{' '}
          {movieData?.genres.map((genre) => genre.name).join(', ')}
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
