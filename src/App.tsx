import React from 'react';
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

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index path="/home" element={<HomePage />} />
      <Route path="/favourites" element={<FavoritesPage />} />
      <Route path="/login" element={<AuthorizationPage />} />
      <Route path="/movie">
        <Route path=":movieId" element={<MovieDetailsPage />} />
      </Route>
    </Route>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
