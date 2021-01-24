import React from "react";
import './NewsCardList.css';
import NewsCard from '../NewsCard/NewsCard';


function NewsCardList({ section }) {

  return ( 
    <ul className="cards"> 
      <NewsCard section={section} />
      <NewsCard section={section} />
      <NewsCard section={section} />               
    </ul>
  )
}

export default NewsCardList;