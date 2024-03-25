import React, { useContext, useEffect } from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './Root.module.css';
import { UserContext } from '../App';

export default function Root() {
  const location = useLocation();
  const navigate = useNavigate();
  const context = useContext(UserContext);

  useEffect(() => {
    if (location.pathname === '/' && context?.isLoggedIn) {
      navigate('/home');
    } else {
      navigate('/login');
    }
  }, []);

  return (
    <div className={styles.root}>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
