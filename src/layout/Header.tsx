import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">MAIN PAGE</Link>
        </li>
        <li>
          <Link to="/favourites">FAVORITES</Link>
        </li>
        <li>
          <Link to="/login">LOGIN</Link>
        </li>
      </ul>
    </div>
  );
}
