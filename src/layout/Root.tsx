import React from 'react';
import Footer from './Footer';
import Header from './Header';
import styles from './Root.module.css';
import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
