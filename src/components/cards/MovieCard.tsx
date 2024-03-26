import React from 'react';
import styles from './MovieCard.module.css';
import { Movie } from '../../utils/types';
import { posterBaseUrl } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  movieData: Movie;
  onCardClick: () => void; // Add onCardClick function
}

export default function MovieCard({ movieData, onCardClick }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movieData.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.languageBadge}>{movieData.original_language}</div>
      <img
        src={posterBaseUrl + movieData.poster_path}
        alt={movieData.title}
        className={styles.poster}
      />
      <div className={styles.details}>
        <div className={styles.date}>{movieData.release_date}</div>
        <h3 className={styles.title}>{movieData.title}</h3>
        <div className={styles.rating}>Rating: {movieData.vote_average}</div>
      </div>
    </div>
  );
}
