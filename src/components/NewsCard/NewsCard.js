import React from "react";
import './NewsCard.css';

function NewsCard({ section }) {

  const url = "https://www.forbes.com/sites/billybambrough/2021/01/10/after-parler-whats-next/?sh=177685284b94";
  const urlToImage = "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5ffaba90814190b5d6ac55df%2F0x0.jpg";
  const title = "«Первозданная тайга»: новый фотопроект Игоря Шпиленка";
  const publishedAt = "10 января, 2021";
  const description = "Знаменитый фотограф снимает первозданные леса России, чтобы рассказать о необходимости их сохранения. В этот раз он отправился в Двинско-Пинежскую тайгу, где...";
  const source = {
    name: "Риа"
  }
  const keyword = "Природа";

  return (
    <>
      <li className="card">
        <a href={url} className="card__link" target="_blank" rel="noreferrer">
          <img className="card__image" src={urlToImage} alt={title}/>
          <div className="card__container">                
            <div className="card__timestamp">{publishedAt}</div>
            <h3 className="card__title">{title}</h3>
            <p className="card__text">{description}</p>
            <p className="card__source">{source.name}</p>
          </div>
        </a>
        { section === "news" ? (
            <>
              <button className="card__action card__action_bookmark card__action_bookmark_saved"></button>      
              <p className="card__action-info">Войдите, чтобы сохранять статьи</p>
            </>
          ) : (
            <>
              <button className="card__action card__action_trash"></button>
              <p className="card__action-info">Убрать из сохранённых</p>
              <div className="card__keyword">{keyword}</div>
            </>
          )
        }
      </li>
    </>
  )
}

export default NewsCard;