import React, { useEffect } from "react";
import "./SavedNews.css";
import NewsCardList from "../NewsCardList/NewsCardList";
import SavedNewsHeader from "../SavedNewsHeader";
import notFoundImage from "../../images/not-found_v1.svg";

function SavedNews({
  isLoggedIn,
  savedArticles,
  handleArticleDelete,
  getSavedArticles,
}) {
  const section = "savedNews";

  useEffect(() => {
    if (isLoggedIn) {
      getSavedArticles();
    }
  }, [isLoggedIn, getSavedArticles]);
  return (
    <>
      <main className="main">
        <SavedNewsHeader savedArticles={savedArticles} />
        <section className="news news_page_saved-news">
          {savedArticles.length ? (
            <NewsCardList
              section={section}
              cards={savedArticles}
              isLoggedIn={isLoggedIn}
              handleArticleDelete={handleArticleDelete}
            />
          ) : (
            <>
              <img src={notFoundImage} alt="ничего не найдено" />
              <h2 className="news__not-found">Ничего не найдено</h2>
            </>
          )}
        </section>
      </main>
    </>
  );
}

export default SavedNews;
