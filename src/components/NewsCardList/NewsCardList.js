import React from "react";
import "./NewsCardList.css";
import NewsCard from "../NewsCard/NewsCard";

function NewsCardList({
  section,
  cards,
  isLoggedIn,
  saveNews,
  handleArticleDelete,
  setIsRegisterPopupOpen,
}) {
  return (
    <ul className="cards">
      {cards.map((card, index) => {
        return (
          <NewsCard
            key={index}
            section={section}
            card={card}
            isLoggedIn={isLoggedIn}
            saveNews={saveNews}
            handleArticleDelete={handleArticleDelete}
            setIsRegisterPopupOpen={setIsRegisterPopupOpen}
          />
        );
      })}
    </ul>
  );
}

export default NewsCardList;
