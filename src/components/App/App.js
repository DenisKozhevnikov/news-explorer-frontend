import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import './App.css';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';
import SavedNews from '../SavedNews';
import PopupRegister from '../PopupRegister';
import PopupLogin from '../PopupLogin';
import PopupRegisterSuccess from '../PopupRegisterSuccess';

function App() {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isRegisterSuccesPopupOpen, setIsRegisterSuccesPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function handleLoginClick() {
    setIsLoginPopupOpen(true);
  }

  function closeAllPopups() {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsRegisterSuccesPopupOpen(false);
  }

  function openLoginPopup() {
    closeAllPopups();
    setIsLoginPopupOpen(true)
  }

  function OpenRegisterPopup() {
    closeAllPopups();
    setIsRegisterPopupOpen(true)
  }

  useEffect(() => {
    function handleEscButtonClose(e) {
      if(e.key === "Escape") {
        closeAllPopups();
      }
    }

    function closePopupOnOverlayClick(e) {
      if(e.target.classList.contains('popup')) {
        closeAllPopups();
      }
    }

    document.addEventListener('keydown', handleEscButtonClose);
    document.addEventListener('mousedown', closePopupOnOverlayClick);
    return   () => {
      document.removeEventListener('keydown', handleEscButtonClose);
      document.removeEventListener('mousedown', closePopupOnOverlayClick);
    }
  }, [])

  return (
    <>
      <Switch>
        <Route exact path="/saved-news">
          <Header darkMode={true}  isLoggedIn={isLoggedIn}/>
          <SavedNews />
        </Route>
        <Route exact path="/"> 
          <Header darkMode={false} onAuthClick={handleLoginClick} isLoggedIn={isLoggedIn}/>         
          <Main />          
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
      <Footer />
      <PopupRegister isOpen={isRegisterPopupOpen} onClose={closeAllPopups} openLoginPopup={openLoginPopup} />
      <PopupLogin isOpen={isLoginPopupOpen} onClose={closeAllPopups} OpenRegisterPopup={OpenRegisterPopup} setIsLoggedIn={setIsLoggedIn} />
      <PopupRegisterSuccess isOpen={isRegisterSuccesPopupOpen} onClose={closeAllPopups} openLoginPopup={openLoginPopup} />
    </>
  )
}

export default App;