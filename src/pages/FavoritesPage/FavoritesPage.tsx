import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { Navigate } from 'react-router-dom';
import { MovieDetails } from '../../utils/types';
import styles from './FavoritesPage.module.css';
import MovieCard from '../../components/cards/MovieCard';
import Button from '../../components/forrm-elements/Button/Button';
import ConfirmationModal from '../../components/modal/ConfirmationModal';

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
    setModalOpen(false); // Close modal after removal
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
    <div className={styles.favoritesContainer}>
      <div className={styles.favoritesContent}>
        <h1 className={styles.title}>Favorites</h1>
        {favorites.length === 0 && (
          <p className={styles.message}>You have no favorite movies yet.</p>
        )}
        <div className={styles.moviesList}>
          {favorites.map((movie) => (
            <div key={movie.id} className={styles.card}>
              <MovieCard movieData={movie} />
              <Button
                type="primary"
                text="Remove from favorites"
                onClick={() => openModal(movie)}
                disabled={false}
              />
            </div>
          ))}
        </div>
      </div>

      {modalOpen && (
        <ConfirmationModal
          message="Are you sure you want to remove this movie from favorites?"
          onConfirm={() => handleRemoveFromFavorites(selectedMovie!)}
          onCancel={closeModal}
        />
      )}
    </div>
  );
};
