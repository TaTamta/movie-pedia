import React from 'react';
import styles from './MovieHeader.module.css';
import Button from '../../components/forrm-elements/Button/Button';

interface Props {
  title: string;
  overview: string;
  rating: React.ReactNode;
  handleToggleFavorites: () => void;
  isFavorite: boolean;
}

export default function MovieHeader({
  title,
  overview,
  rating,
  handleToggleFavorites,
  isFavorite,
}: Props) {
  return (
    <div className={styles.details}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.overview}>{overview}</p>
      <div className={styles.rating}>{rating}</div>
      <Button
        type="primary"
        onClick={handleToggleFavorites}
        text={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        className={styles.favoriteButton}
      />
    </div>
  );
}
