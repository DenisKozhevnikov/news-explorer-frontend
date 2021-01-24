import React from "react";
import './PopupLogin.css';
import PopupWithForm from '../PopupWithForm';


function PopupLogin({ onClose, isOpen, OpenRegisterPopup, setIsLoggedIn }) {
  function handleSubmit(e) {
    e.preventDefault();
    setIsLoggedIn(true);
    onClose();
  }

  return (
    <PopupWithForm title="Вход" onClose={onClose} onSubmit={handleSubmit} isOpen={isOpen} name="login">
      <label className="form__label">
        Email
        <input className="form__input" type="email" name="email" placeholder="Введите почту" required />
        <span className="form__error"></span>
      </label>
      <label className="form__label">
        Пароль
        <input className="form__input" type="password" name="password" placeholder="Введите пароль" minLength="8" maxLength="40" required />
        <span className="form__error"></span>
      </label>
      <div className="form__container">
        <button type="submit" className="form__button" >Войти</button>
        <div className="form__form-change">или <span className="form__link" onClick={OpenRegisterPopup}>Зарегистрироваться</span></div>
      </div>
    </PopupWithForm>
  )
}

export default PopupLogin;