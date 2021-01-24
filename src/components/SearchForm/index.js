import React from "react";
import './SearchForm.css';

function SearchForm() {
  const searching = false;
  return (
    <>
      <form action="#" method="post" className="search-form">
        <input className={`search-form__input ${ searching ? "search-form__input_disabled" : "" }`} type="text" placeholder="Введите тему новости" disabled={searching} required/>
        <button className={`search-form__button ${ searching ? "search-form__button_disabled" : "" }`} type="submit" disabled={searching} >Искать</button>
      </form>
    </>
  )
}

export default SearchForm;



