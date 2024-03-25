import React, { createContext, useState, useEffect } from 'react';
import './App.css';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Root from './layout/Root';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import MovieDetailsPage from './pages/MovieDetailsPage/MovieDetailsPage';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import { RouterProvider } from 'react-router';
import { apiCall } from './utils/apiCall';
import { UserInfo, MoviesResponse } from './utils/types';

export const UserContext = createContext<UserInfo | null>(null);

async function loadMovies(
  page1: number,
  page2: number
): Promise<MoviesResponse['results']> {
  const url1 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page1}&sort_by=popularity.desc`;
  const url2 = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page2}&sort_by=popularity.desc`;

  try {
    // Make API calls for both pages concurrently using Promise.all
    const [moviesData1, moviesData2] = await Promise.all([
      apiCall<MoviesResponse>(url1),
      apiCall<MoviesResponse>(url2),
    ]);

    // Combine the results from both pages
    const combinedResults = [...moviesData1.results, ...moviesData2.results];

    return combinedResults;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="login" element={<AuthorizationPage />} />
      <Route path="home" element={<HomePage />} loader={() => loadMovies(1, 2)} />
      <Route path="favorites" element={<FavoritesPage />} />
      <Route path="movie">
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
