import React from 'react';
import { Link } from 'gatsby';

import NavStyles from './styles/nav.module.css';

export default function Nav() {
  const activeStyles = {
    background: '#ffc600',
  };
  return (
    <nav className={NavStyles.nav}>
      <ul>
        <li>
          <Link activeClassName={NavStyles.active} to="/">
            Home
          </Link>
        </li>
        <li>
          <Link activeClassName={NavStyles.active} to="/about">
            About
          </Link>
        </li>
        <li>
          <Link activeClassName={NavStyles.active} to="/tips">
            🔥 Tips
          </Link>
        </li>
        <li>
          <Link activeClassName={NavStyles.active} to="/users">
            👤 Users
          </Link>
        </li>
      </ul>
    </nav>
  );
}
