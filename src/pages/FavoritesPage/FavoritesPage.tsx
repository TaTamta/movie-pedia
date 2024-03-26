import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { Navigate } from 'react-router-dom';
import { posterBaseUrl } from '../../utils/constants';
import { MovieDetails } from '../../utils/types';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
  const context = useContext(UserContext);

  const [favorites, setFavorites] = useState<MovieDetails[]>(
    JSON.parse(localStorage.getItem('favoriteMovies') || '[]')
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null);

  const handleRemoveFromFavorites = (movie: MovieDetails) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== movie.id);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const handleConfirmRemove = () => {
    if (selectedMovie) {
      handleRemoveFromFavorites(selectedMovie);
      setModalOpen(false);
    }
  };

  const handleRejectRemove = () => {
    setModalOpen(false);
  };

  const openModal = (movie: MovieDetails) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  if (!context?.isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className={styles.container}>
      <h1>Favorites</h1>
      <div className={styles.movieGrid}>
        {favorites.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img
              src={posterBaseUrl + movie.poster_path}
              alt={movie.title}
              className={styles.poster}
            />
            <div className={styles.details}>
              <h2 className={styles.title}>{movie.title}</h2>
              <button onClick={() => openModal(movie)}>Remove</button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to remove this movie from favorites?</p>
            <div>
              <button onClick={handleConfirmRemove}>Yes</button>
              <button onClick={handleRejectRemove}>No</button>
            </div>
          </div>
          <div className={styles.modalBackground} onClick={closeModal}></div>
        </div>
      )}
    </div>
  );
}
