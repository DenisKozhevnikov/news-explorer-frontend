import React, { useEffect } from "react";
import "./PopupLogin.css";
import PopupWithForm from "../PopupWithForm";
import useForm from "../../hooks/userForm";

function PopupLogin({
  onClose,
  isOpen,
  OpenRegisterPopup,
  onLogin,
  submitError,
  isLoginButtonDisabled,
}) {
  const { values, errors, isValid, handleChange, resetForm } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(...Object.values(values));
  }

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  return (
    <PopupWithForm
      title="Вход"
      onClose={onClose}
      onSubmit={handleSubmit}
      isOpen={isOpen}
      name="login"
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
          disabled={isLoginButtonDisabled}
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
          disabled={isLoginButtonDisabled}
        />
        <span className="form__error">{errors.password}</span>
      </label>
      <div className="form__container">
        <span className="form__submit-error">{submitError}</span>
        <button
          type="submit"
          className={`form__button ${isValid ? "" : "form__button_disabled"}`}
          disabled={!isValid || isLoginButtonDisabled}
        >
          {isLoginButtonDisabled ? "Заходим..." : "Войти"}
        </button>
        <div className="form__form-change">
          или{" "}
          <span className="form__link" onClick={OpenRegisterPopup}>
            Зарегистрироваться
          </span>
        </div>
      </div>
    </PopupWithForm>
  );
}

export default PopupLogin;
