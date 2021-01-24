import React from "react";
import './PopupRegisterSuccess.css';


function PopupRegisterSuccess({ isOpen, onClose, openLoginPopup }) {


  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <h2 className="popup__heading">Пользователь успешно зарегистрирован!</h2>
        <span className="popup__link-to-login" onClick={openLoginPopup} >Войти</span>
      </div>
    </section>
  )
}

export default PopupRegisterSuccess;