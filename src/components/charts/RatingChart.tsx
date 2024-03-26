import React from 'react';
import styles from './RatingChart.module.css';

interface RatingChartProps {
  rating: number;
}

export default function RatingChart({ rating }: RatingChartProps) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (rating / 10) * circumference;

  return (
    <div className={styles.ratingChart}>
      <svg className={styles.svg} width="70" height="70">
        <circle className={styles.bgCircle} cx="35" cy="35" r={radius} />
        <circle
          className={styles.progressCircle}
          cx="35"
          cy="35"
          r={radius}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: progress,
          }}
        />
        <text
          className={styles.ratingText}
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {rating}
        </text>
      </svg>
    </div>
  );
}
