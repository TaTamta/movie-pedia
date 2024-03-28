import React from 'react';
import styles from './MovieDetailsList.module.css';

interface Detail {
  title: string;
  description: string | JSX.Element;
}

interface Props {
  details: Detail[];
}
export default function MovieDetails({ details }: Props) {
  return (
    <div className={styles.additionalDetails}>
      {details.map((detail, index) => (
        <div key={index} className={styles.detailItem}>
          <p className={styles.title}>{detail.title}</p>
          <p className={styles.description}>{detail.description}</p>
        </div>
      ))}
    </div>
  );
}
