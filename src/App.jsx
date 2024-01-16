import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import MainPage from './components/MainPage.jsx';
import '/src/App.css';
import Board from './components/board.jsx';
import { UserProvider } from './components/UserContext.jsx';
import MyPage from './components/myPage.jsx';
import Yamae from './components/Yamae.jsx';
import Jinsim from './components/jinsim.jsx';
import Jayou from './components/Jayou.jsx';
import Annae from './components/Annae.jsx';
import Notice from './components/NoticePage.jsx';

const App = () => {

  if (typeof global === 'undefined') {
  window.global = window;
}
  return (
    <UserProvider>
      <div className="app-wrapper">
        <Routes>
          <Route
            path="/"
            element={
              <div className="LoginPage_bg">
              <Login />
              </div>
            }
          />
          <Route
            path="/signIn"
            element={
              <div className="LoginPage_bg">
                <SignIn />
              </div>
            }
          />
          <Route
            path="/MainPage"
            element={
              <div className="MainPage_bg">
                <MainPage />
              </div>
            }
          />
          <Route
            path="/Board"
            element={
              <div className="MainPage_bg">
                <Board />
              </div>
            }
          />
          <Route
            path="/myPage"
            element={
              <div className="MainPage_bg">
                <MyPage />
              </div>
            }
          />
          <Route
            path="/yaMae"
            element={
              <div className="MainPage_bg">
                <Yamae />
              </div>
            }
          />
          <Route
            path="/jinsim"
            element={
              <div className="MainPage_bg">
                <Jinsim />
              </div>
            }
          />
          <Route
            path="/jayou"
            element={
              <div className="MainPage_bg">
                <Jayou />
              </div>
            }
          />
          <Route
            path="/annae"
            element={
              <div className="MainPage_bg">
                <Annae />
              </div>
            }
          />
          <Route
            path="/notice/:postId"
            element={
              <div className="MainPage_bg">
                <Notice />
              </div>
            }
          />
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;