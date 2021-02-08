import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ searchNews, searchStatus, resetVisibleCount }) {
  const [errorText, setErrorText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = e.target.text.value;

    if (!inputValue) {
      return setErrorText("Нужно ввести ключевое слово");
    }

    setErrorText("");
    resetVisibleCount();
    searchNews(inputValue);
  }

  function isSearch() {
    return searchStatus === "search";
  }

  return (
    <>
      <form
        action="#"
        method="post"
        className="search-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <span className="search-form__error">{errorText}</span>
        <input
          className={`search-form__input ${
            isSearch() ? "search-form__input_disabled" : ""
          }`}
          type="text"
          name="text"
          placeholder="Введите тему новости"
          disabled={isSearch()}
          required
        />
        <button
          className={`search-form__button ${
            isSearch() ? "search-form__button_disabled" : ""
          }`}
          type="submit"
          disabled={isSearch()}
        >
          Искать
        </button>
      </form>
    </>
  );
}

export default SearchForm;
