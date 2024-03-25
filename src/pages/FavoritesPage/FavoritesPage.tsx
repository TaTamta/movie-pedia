import React, { useContext } from 'react';
import { UserContext } from '../../App';
import { Navigate } from 'react-router-dom';

export default function FavoritesPage() {
  const context = useContext(UserContext);

  if (!context?.isLoggedIn) {
    console.log(context);
    return <Navigate to="/login" />;
  }
  return <div>FAVORITES</div>;
}
