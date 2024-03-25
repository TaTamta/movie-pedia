// App.js

import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './layout/Root';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import AuthorizationPage from './pages/AuthorizationPage';
import { RouterProvider } from 'react-router';

type UserInfo = {
  isLoggedIn: boolean;
  user: string | null; // User interface for user information
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserInfo | null>(null);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index path="/home" element={<HomePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      <Route path="/login" element={<AuthorizationPage />} />
      <Route path="/movie">
        <Route path=":movieId" element={<MovieDetailsPage />} />
      </Route>
    </Route>
  )
);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const username = sessionStorage.getItem('username');
    if (token) {
      setUser(username);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, user, setIsLoggedIn, setUser }}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  );
}
