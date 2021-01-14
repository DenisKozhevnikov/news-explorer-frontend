import React from "react";
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation({ darkMode, isLoggedIn }) {
  return (
    <nav className="nav">
      <ul className="nav__list">
      <li className="nav__item">
        <NavLink activeClassName="nav__item-link_active"  className={`nav__item-link ${darkMode ? "nav__item-link_dark" : "" }`} exact to="/">Главная</NavLink>
      </li>
      {
        isLoggedIn && (
          <li className="nav__item">
          <NavLink activeClassName="nav__item-link_active-dark" className="nav__item-link" exact to="/saved-news">Сохранённые статьи</NavLink>
        </li>
        )
      }
      </ul>
    </nav>
  )
}

export default Navigation;