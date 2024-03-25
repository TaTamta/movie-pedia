import React from 'react';
import Footer from './Footer';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import styles from './Root.module.css';

export default function Root() {
  return (
    <div className={styles.root}>
      <Header />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
