import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '../../assets/tv.svg';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const context = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogOut() {
    sessionStorage.removeItem('token');
    context?.setIsLoggedIn(false);
    context?.setUser(null);
    navigate('/login');
  }

  return (
    <section className={styles.header}>
      <div className={styles.container}>
        <header className={styles.headerItems}>
          <div className={styles.headerLeftPart}>
            <Link className={styles.logoPart} to="/home">
              <img className={styles.logo} src={logo} alt="logo" />
              <div className={styles.name}>MOVIEPEDIA</div>
            </Link>
          </div>
          {!context?.isLoggedIn ? null : (
            <nav className={styles.menu}>
              <ul className={styles.menuList}>
                <li>
                  <Link to="/home">HOME</Link>
                </li>
                <li>
                  <Link to="/favorites">
                    {context?.user?.toUpperCase()}'S FAVORITES
                  </Link>
                </li>
                <li onClick={handleLogOut}>
                  <Link to="/login">LOG OUT</Link>
                </li>
              </ul>
            </nav>
          )}
        </header>
      </div>
    </section>
  );
}
