import React from "react";
import "./PopupWithForm.css";

function PopupWithForm({ title, name, onClose, onSubmit, isOpen, children }) {
  return (
    <section className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <h2 className="popup__heading">{title}</h2>
        <form
          action="#"
          method="post"
          className="form"
          name={name}
          onSubmit={onSubmit}
        >
          {children}
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
