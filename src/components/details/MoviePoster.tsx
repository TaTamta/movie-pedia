import React from 'react';
import styles from './MoviePoster.module.css';

interface Props {
  posterPath: string;
  title: string;
}

export default function MoviePoster({ posterPath, title }: Props) {
  return <img src={posterPath} alt={title} className={styles.poster} />;
}
