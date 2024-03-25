import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../App';

export default function MovieDetailsPage() {
  const context = useContext(UserContext);

  if (!context?.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>MOVIE DETAILS PAGE</div>;
}
