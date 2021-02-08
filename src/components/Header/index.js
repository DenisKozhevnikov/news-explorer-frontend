import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Navigation from "../Navigation";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ darkFontColor, onAuthClick, isLoggedIn, onSignOut }) {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const currentUser = useContext(CurrentUserContext);

  function onBurgerClick() {
    if (isBurgerMenuOpen) {
      setIsBurgerMenuOpen(false);
    } else {
      setIsBurgerMenuOpen(true);
    }
  }

  return (
    <header
      className={`header ${darkFontColor ? "header_dark" : ""} ${
        isBurgerMenuOpen ? "header_expanded" : ""
      }`}
    >
      <Link
        className={`header__logo ${darkFontColor ? "header__logo_dark" : ""} ${
          isBurgerMenuOpen ? "header__logo_expanded" : ""
        }`}
        to="/"
      >
        NewsExplorer
      </Link>
      <div
        className={`header__container  ${
          isBurgerMenuOpen ? "header__container_expanded" : ""
        }`}
      >
        <Navigation darkFontColor={darkFontColor} isLoggedIn={isLoggedIn} />
        {isLoggedIn ? (
          <button
            className={`header__auth ${
              darkFontColor ? "header__auth_dark" : ""
            } ${isBurgerMenuOpen ? "header__auth_expanded" : ""}`}
            onClick={onSignOut}
          >
            {currentUser.name}
            <svg
              className={`header__logout-icon ${
                darkFontColor ? "header__logout-icon_dark" : ""
              } ${isBurgerMenuOpen ? "header__logout-icon_expanded" : ""}`}
              width="18"
              height="16"
              viewBox="0 0 18 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2L2 2L2 14H6V16H2C0.89543 16 0 15.1046 0 14V2C0 0.89543 0.895432 0 2 0H6V2ZM13.5856 9.00002L9.29274 13.1339L10.707 14.4958L17.4141 8.03706L10.707 1.57837L9.29274 2.9402L13.5856 7.0741H4V9.00002H13.5856Z"
              />
            </svg>
          </button>
        ) : (
          <button className="header__auth" onClick={onAuthClick}>
            Авторизоваться
          </button>
        )}
      </div>
      <div
        className={`burger ${darkFontColor ? "burger_dark" : ""} ${
          isBurgerMenuOpen ? "burger_expanded" : ""
        }`}
        onClick={onBurgerClick}
      ></div>
    </header>
  );
}

export default Header;
