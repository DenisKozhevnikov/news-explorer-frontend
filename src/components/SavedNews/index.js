import React from "react";
import './SavedNews.css';
import NewsCardList from '../NewsCardList/NewsCardList';
import SavedNewsHeader from '../SavedNewsHeader';

function SavedNews() {

  return (
    <>
    <main>
      <SavedNewsHeader />
      <section className="saved-news">
        <NewsCardList />
      </section>
    </main>
    </>
  )
}

export default SavedNews;