import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm";
import About from "../About/About";
import NewsCardList from "../NewsCardList/NewsCardList";
import Preloader from "../Preloader/";
import notFoundImage from "../../images/not-found_v1.svg";

function Main({
  isLoggedIn,
  foundNews,
  searchStatus,
  searchNews,
  saveNews,
  isNewsSectionHidden,
  setIsRegisterPopupOpen,
  visibleCount,
  setVisibleCount,
  handleArticleDelete,
}) {
  const section = "news";

  function loadMore() {
    setVisibleCount((prev) => prev + 3);
  }

  function resetVisibleCount() {
    setVisibleCount(3);
  }

  function searchResult(status) {
    switch (status) {
      case "search":
        return (
          <>
            <Preloader />
            <p className="news__request">Идет поиск новостей...</p>
          </>
        );
      case "newsFound":
        return (
          <>
            <h2 className="news__title">Результаты поиска</h2>
            <NewsCardList
              section={section}
              isLoggedIn={isLoggedIn}
              cards={foundNews.slice(0, visibleCount)}
              saveNews={saveNews}
              setIsRegisterPopupOpen={setIsRegisterPopupOpen}
              handleArticleDelete={handleArticleDelete}
            />
            {foundNews.length > 3 &&
              (visibleCount < foundNews.length ? (
                <button className="news__show-more" onClick={loadMore}>
                  Показать ещё
                </button>
              ) : (
                <button className="news__show-more" onClick={resetVisibleCount}>
                  Свернуть
                </button>
              ))}
          </>
        );
      case "newsNotFound":
        return (
          <>
            <img src={notFoundImage} alt="ничего не найдено" />
            <h2 className="news__not-found">Ничего не найдено</h2>
            <p className="news__request">
              К сожалению по вашему запросу ничего не найдено.
            </p>
          </>
        );
      case "error":
        return (
          <>
            <h2 className="news__not-found">
              Во время запроса произошла ошибка.
            </h2>
            <p className="news__request">
              Возможно, проблема с соединением или сервер недоступен. Подождите
              немного и попробуйте ещё раз
            </p>
          </>
        );
      default:
        return null;
    }
  }

  return (
    <main className="main">
      <section className="search">
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном
          кабинете.
        </p>
        <SearchForm
          searchNews={searchNews}
          searchStatus={searchStatus}
          resetVisibleCount={resetVisibleCount}
        />
      </section>
      <section className={`news ${isNewsSectionHidden ? "news_disabled" : ""}`}>
        {searchResult(searchStatus)}
      </section>
      <About />
    </main>
  );
}

export default Main;
