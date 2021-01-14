import React from "react";
import './PopupRegister.css';
import PopupWithForm from '../PopupWithForm';


function PopupRegister({ onClose, isOpen, openLoginPopup }) {
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <PopupWithForm title="Регистрация" onClose={onClose} onSubmit={handleSubmit}  isOpen={isOpen} name="register">
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

      <label className="form__label">
        Имя
        <input className="form__input" type="text" name="name" placeholder="Введите свое имя" minLength="2" maxLength="40" required />
        <span className="form__error"></span>
      </label>
      <div className="form__container">
        <span className="form__submit-error"></span>
        <button type="submit" className="form__button  form__button_disabled" >Зарегистрироваться</button>
        <div className="form__form-change">или <span className="form__link" onClick={openLoginPopup}>Войти</span></div>
      </div>
    </PopupWithForm>
  )
}

export default PopupRegister;