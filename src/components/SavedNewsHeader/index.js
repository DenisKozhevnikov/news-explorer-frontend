import React, { useContext, useEffect, useState } from "react";
import "./SavedNewsHeader.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function SavedNewsHeader({ savedArticles }) {
  const currentUser = useContext(CurrentUserContext);
  const [sortedKeywords, setSortedKeywords] = useState([]);

  useEffect(() => {
    const numberOfKeywords = savedArticles.reduce((acc, el) => {
      acc[el.keyword] = (acc[el.keyword] || 0) + 1;
      return acc;
    }, {});

    const keywords = Object.entries(numberOfKeywords)
      .sort((a, b) => b[1] - a[1])
      .map((el) => el[0]);
    setSortedKeywords(keywords);
  }, [savedArticles]);

  return (
    <section className="saved-news-header">
      <h2 className="saved-news-header__title">Сохранённые статьи</h2>
      <p className="saved-news-header__quantity">
        {currentUser.name}, у вас {savedArticles.length} сохранённых статей
      </p>
      <p className="saved-news-header__keywords">
        {}
        По ключевым словам:{" "}
        <span className="saved-news-header__keywords_bold">
          {sortedKeywords.length > 0 && sortedKeywords[0]}
          {sortedKeywords.length > 1 && `, ${sortedKeywords[1]}`}{" "}
        </span>
        {sortedKeywords.length > 2 && ` и `}
        <span className="saved-news-header__keywords_bold">
          {sortedKeywords.length === 3
            ? ` ${sortedKeywords.length - 2} другому`
            : sortedKeywords.length > 2 &&
              ` ${sortedKeywords.length - 2} другим`}
        </span>
      </p>
    </section>
  );
}

export default SavedNewsHeader;
