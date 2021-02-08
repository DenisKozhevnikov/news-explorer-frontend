import React, { useState } from "react";
import "./NewsCard.css";

function NewsCard({
  section,
  card,
  isLoggedIn,
  saveNews,
  handleArticleDelete,
  setIsRegisterPopupOpen,
}) {
  const [visibleInfo, setVisibleInfo] = useState(false);

  const { title, source, image, keyword, date, link, text } = card;

  function showInfo() {
    if (!isLoggedIn && section === "news") {
      setVisibleInfo(true);
    }
  }

  function hideInfo() {
    setVisibleInfo(false);
  }

  function convertDate(time) {
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Date(time).toLocaleDateString("ru-RU", options);
  }

  function handleBookmarkClick() {
    if (isLoggedIn && !card._id) {
      saveNews(title, text, date, source, link, image);
    }

    if (card._id) {
      handleArticleDelete(card);
    }

    if (!isLoggedIn) {
      setIsRegisterPopupOpen(true);
    }
  }

  function handleTrashClick() {
    handleArticleDelete(card);
  }

  return (
    <>
      {/* {console.log(card)} */}
      <li className="card">
        <a href={link} className="card__link" target="_blank" rel="noreferrer">
          <img className="card__image" src={image} alt={title} />
          <div className="card__container">
            <div className="card__timestamp">{convertDate(date)}</div>
            <h3 className="card__title">{title}</h3>
            <p className="card__text">{text}</p>
            <p className="card__source">{source}</p>
          </div>
        </a>
        {section === "news" ? (
          <>
            <button
              className={`card__action card__action_bookmark ${
                card._id ? "card__action_bookmark_saved" : ""
              }`}
              onMouseEnter={showInfo}
              onMouseLeave={hideInfo}
              onClick={handleBookmarkClick}
            ></button>
            <p
              className={`card__action-info ${
                visibleInfo ? "card__action-info_visible" : ""
              }`}
            >
              Войдите, чтобы сохранять статьи
            </p>
          </>
        ) : (
          <>
            <button
              className="card__action card__action_trash"
              onMouseEnter={showInfo}
              onMouseLeave={hideInfo}
              onClick={handleTrashClick}
            ></button>
            <p
              className={`card__action-info ${
                visibleInfo ? "card__action-info_visible" : ""
              }`}
            >
              Убрать из сохранённых
            </p>
            <div className="card__keyword">{keyword}</div>
          </>
        )}
      </li>
    </>
  );
}

export default NewsCard;
