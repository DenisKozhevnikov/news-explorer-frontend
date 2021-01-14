import React from "react";
import './SavedNewsHeader.css';

function SavedNewsHeader() {
  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Сохранённые статьи</h2>
      <p className="saved-news-header__quantity">Грета, у вас 5 сохранённых статей</p>
      <p className="saved-news-header__keywords">
        По ключевым словам: <span className="saved-news-header__keywords_bold">Природа, Тайга </span> и <span className="saved-news-header__keywords_bold"> 2-м другим</span></p>
    </section>
  )
}

export default SavedNewsHeader;