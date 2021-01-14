import React from "react";
import './Main.css';
import SearchForm from '../SearchForm';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import notFoundImage from '../../images/not-found_v1.svg';

function Main() {

  const searching = false;
  const result = true;
  const section = "news"

  return (
    <main className="main">
      <section className="search">
        <h1 className="search__title">Что творится в мире?</h1>
        <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
        <SearchForm />
      </section>
      <section className="news">
        { 
          searching ? (
            <>
              <Preloader />
              <p className="news__request">Идет поиск новостей...</p>
            </>
          ) : (
            result ? (
              <>
                <h2 className="news__title">Результаты поиска</h2>  
                <NewsCardList section={section} />
                <button className="news__show-more">Показать ещё</button>
              </>
            ) : (
              <>
                <img src={notFoundImage} alt="ничего не найдено"/>
                <h2 className="news__not-found">Ничего не найдено</h2>
                <p className="news__request">К сожалению по вашему запросу ничего не найдено.</p>
              </>
            )
          )
        }
      </section>
      <About />      
    </main>
  )
}

export default Main;