import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link to="/home" className={styles.footerLink}>Terms</Link>
          <Link to="/home" className={styles.footerLink}>Privacy</Link>
          <Link to="/home" className={styles.footerLink}>Press Room</Link>
        </div>
        <div className={styles.copyright}>
          © 2021 MovieBox by Adriana Eka Prayudha
        </div>
      </div>
    </footer>
  );
}
