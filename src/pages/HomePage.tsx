import React, { useContext } from 'react';
import { UserContext } from '../App';
import { Navigate } from 'react-router-dom';

export default function HomePage() {
  const context = useContext(UserContext);

  if (!context?.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>HOME PAGE</div>;
}
