import React, { useCallback, useEffect, useState } from "react";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Header from "../Header";
import Main from "../Main";
import Footer from "../Footer";
import SavedNews from "../SavedNews";
import PopupRegister from "../PopupRegister";
import PopupLogin from "../PopupLogin";
import PopupRegisterSuccess from "../PopupRegisterSuccess";
import {
  onCreateUser,
  onUserLogin,
  getUserInfo,
  setArticle,
  getArticles,
  deleteArticle,
} from "../../utils/mainApi";
import { onGetNews } from "../../utils/newsApi";
import { setToken, getToken, removeToken } from "../../utils/token";
import {
  setNews,
  getNews,
  removeNews,
  setKeywordToStorage,
  getKeywordFromStorage,
  removeKeywordFromStorage,
} from "../../utils/localStorage";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isRegisterSuccesPopupOpen, setIsRegisterSuccesPopupOpen] = useState(
    false
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [searchStatus, setSearchStatus] = useState(""); // "search" "newsFound" "newsNotFound" "error"
  const [keyword, setKeyword] = useState("");
  const [isNewsSectionHidden, setIsNewsSectionHidden] = useState(true);
  const [savedArticles, setSavedArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [foundNews, setFoundNews] = useState([]);
  const [isRegisterButtonDisabled, setIsRegisterButtonDisabled] = useState(
    false
  );
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();
  const isNotMainPage = pathname !== "/";

  function handleLoginClick() {
    setIsLoginPopupOpen(true);
  }

  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsRegisterSuccesPopupOpen(false);
    setSubmitError("");
  }

  function openLoginPopup() {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  }

  function OpenRegisterPopup() {
    closeAllPopups();
    setIsRegisterPopupOpen(true);
  }

  function OpenRegisterSuccessPopup() {
    closeAllPopups();
    setIsRegisterSuccesPopupOpen(true);
  }

  useEffect(() => {
    function handleEscButtonClose(e) {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }

    function closePopupOnOverlayClick(e) {
      if (e.target.classList.contains("popup")) {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleEscButtonClose);
    document.addEventListener("mousedown", closePopupOnOverlayClick);
    return () => {
      document.removeEventListener("keydown", handleEscButtonClose);
      document.removeEventListener("mousedown", closePopupOnOverlayClick);
    };
  }, []);

  function onRegister(...props) {
    setSubmitError("");
    setIsRegisterButtonDisabled(true);
    onCreateUser(...props)
      .then((data) => {
        if (data) {
          OpenRegisterSuccessPopup();
        }
      })
      .catch((err) => {
        console.log(err);
        setSubmitError(err.message);
      })
      .finally(() => {
        setIsRegisterButtonDisabled(false);
      });
  }

  function onLogin(...props) {
    setSubmitError("");
    setIsLoginButtonDisabled(true);
    onUserLogin(...props)
      .then((data) => {
        setToken(data.token);
        getUserInfo(data.token).then((data) => {
          closeAllPopups();
          setCurrentUser(data);
          setIsLoggedIn(true);
        });
      })
      .catch((err) => {
        setSubmitError(err.message);
      })
      .finally(() => {
        setIsLoginButtonDisabled(false);
      });
  }

  const getContent = useCallback(
    (token) => {
      getUserInfo(token)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch(() => {
          history.location.pathname !== "/" && setIsLoginPopupOpen(true);
          removeToken();
          history.push("/");
        });
    },
    [history]
  );

  function onSignOut() {
    removeToken();
    removeNews();
    removeKeywordFromStorage();
    setIsLoggedIn(false);
    setIsNewsSectionHidden(true);
    history.push("/");
  }

  function searchNews(inputValue) {
    setIsNewsSectionHidden(false);
    setSearchStatus("search");
    onGetNews(inputValue)
      .then((data) => {
        if (data.articles.length > 0) {
          const articles = data.articles.map((el) => {
            return {
              title: el.title || "",
              text: el.description || "",
              date: el.publishedAt || "",
              source: el.source.name || "",
              link: el.url || "",
              image:
                (el.urlToImage === "https:" &&
                  "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80") ||
                el.urlToImage ||
                "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            };
          });
          setFoundNews(articles);
          setKeyword(inputValue);

          setNews(JSON.stringify(articles));
          setKeywordToStorage(inputValue);
          setSearchStatus("newsFound");
        } else {
          setSearchStatus("newsNotFound");
        }
      })
      .catch(() => {
        setSearchStatus("error");
      });
  }

  function saveNews(...props) {
    // token, keyword, title, text, date, source, link, image
    const token = getToken();
    setArticle(token, keyword, ...props)
      .then((data) => {
        const newFoundNews = foundNews.map((e) => {
          if (e.link === data.link) {
            e._id = data.id;
          }
          return e;
        });
        setFoundNews(newFoundNews);
        setNews(JSON.stringify(newFoundNews));
      })
      .catch((err) => console.log(err));
  }

  const getSavedArticles = useCallback(() => {
    const token = getToken();

    if (!token) {
      return;
    }
    getArticles(token)
      .then((data) => {
        setSavedArticles(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleArticleDelete(card) {
    const token = getToken();

    if (!token) {
      return;
    }
    deleteArticle(token, card._id)
      .then(() => {
        if (history.location.pathname === "/") {
          const newFoundNews = foundNews.map((e) => {
            if (e._id === card._id) {
              delete e._id;
            }
            return e;
          });
          setFoundNews(newFoundNews);
          setNews(JSON.stringify(newFoundNews));
        } else {
          const newSavedArticles = savedArticles.filter(
            (e) => e._id !== card._id
          );
          setSavedArticles(newSavedArticles);

          const newFoundNews = foundNews.map((e) => {
            if (e._id === card._id) {
              delete e._id;
            }
            return e;
          });
          setFoundNews(newFoundNews);
          setNews(JSON.stringify(newFoundNews));
        }
      })
      .catch((err) => console.log(err));
  }

  const tokenCheck = useCallback(() => {
    const token = getToken();

    if (!token) {
      return;
    }
    getContent(token);
  }, [getContent]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  useEffect(() => {
    const news = JSON.parse(getNews());
    const storagetKeyword = getKeywordFromStorage();

    if (!news || !storagetKeyword) {
      return;
    }

    setIsNewsSectionHidden(false);
    setSearchStatus("newsFound");
    setFoundNews(news);
    setKeyword(storagetKeyword);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        darkFontColor={isNotMainPage}
        onAuthClick={handleLoginClick}
        isLoggedIn={isLoggedIn}
        onSignOut={onSignOut}
      />
      <Switch>
        <Route exact path="/">
          <Main
            isLoggedIn={isLoggedIn}
            searchStatus={searchStatus}
            searchNews={searchNews}
            setKeyword={setKeyword}
            saveNews={saveNews}
            isNewsSectionHidden={isNewsSectionHidden}
            setIsRegisterPopupOpen={setIsRegisterPopupOpen}
            visibleCount={visibleCount}
            setVisibleCount={setVisibleCount}
            foundNews={foundNews}
            handleArticleDelete={handleArticleDelete}
          />
        </Route>
        <ProtectedRoute
          exact
          path="/saved-news"
          isLoggedIn={isLoggedIn}
          component={SavedNews}
          savedArticles={savedArticles}
          handleArticleDelete={handleArticleDelete}
          getSavedArticles={getSavedArticles}
          setIsLoginPopupOpen={setIsLoginPopupOpen}
        ></ProtectedRoute>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer />
      <PopupRegister
        isOpen={isRegisterPopupOpen}
        onClose={closeAllPopups}
        openLoginPopup={openLoginPopup}
        onRegister={onRegister}
        submitError={submitError}
        isRegisterButtonDisabled={isRegisterButtonDisabled}
      />
      <PopupLogin
        isOpen={isLoginPopupOpen}
        onClose={closeAllPopups}
        OpenRegisterPopup={OpenRegisterPopup}
        onLogin={onLogin}
        submitError={submitError}
        isLoginButtonDisabled={isLoginButtonDisabled}
      />
      <PopupRegisterSuccess
        isOpen={isRegisterSuccesPopupOpen}
        onClose={closeAllPopups}
        openLoginPopup={openLoginPopup}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
