import React, { useEffect } from "react";
import "./PopupRegister.css";
import PopupWithForm from "../PopupWithForm";
import useForm from "../../hooks/userForm";

function PopupRegister({
  onClose,
  isOpen,
  openLoginPopup,
  onRegister,
  submitError,
  isRegisterButtonDisabled,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(...Object.values(values));
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Регистрация"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      name="register"
      onRegister={onRegister}
    >
      <label className="form__label">
        Email
        <input
          className="form__input"
          type="email"
          name="email"
          placeholder="Введите почту"
          required
          onChange={handleChange}
          value={values.email || ""}
          disabled={isRegisterButtonDisabled}
        />
        <span className="form__error">{errors.email}</span>
      </label>

      <label className="form__label">
        Пароль
        <input
          className="form__input"
          type="password"
          name="password"
          placeholder="Введите пароль"
          minLength="8"
          maxLength="40"
          required
          onChange={handleChange}
          value={values.password || ""}
          disabled={isRegisterButtonDisabled}
        />
        <span className="form__error">{errors.password}</span>
      </label>

      <label className="form__label">
        Имя
        <input
          className="form__input"
          type="text"
          name="name"
          placeholder="Введите свое имя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChange}
          value={values.name || ""}
          disabled={isRegisterButtonDisabled}
        />
        <span className="form__error">{errors.name}</span>
      </label>
      <div className="form__container">
        <span className="form__submit-error">{submitError}</span>
        <button
          type="submit"
          className={`form__button ${isValid ? "" : "form__button_disabled"}`}
          disabled={!isValid || isRegisterButtonDisabled}
        >
          {isRegisterButtonDisabled
            ? "Регистрируемся..."
            : "Зарегистрироваться"}
        </button>
        <div className="form__form-change">
          или{" "}
          <span className="form__link" onClick={openLoginPopup}>
            Войти
          </span>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default PopupRegister;
