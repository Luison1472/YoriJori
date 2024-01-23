import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import MainPage from './components/MainPage.jsx';
import '/src/App.css';
import Board from './components/board.jsx';
import { UserProvider } from './components/UserContext.jsx';
import MyPage from './components/myPage.jsx';
import Yamae from './components/yamae.jsx';
import Jinsim from './components/Jinsim.jsx';
import Jayou from './components/Jayou.jsx';
import Annae from './components/Annae.jsx';

import YamaeBoard from './components/yamaeBoard.jsx';
import JinsimBoard from './components/jinsimBoard.jsx';
import AnnaeBoard from './components/annaeBoard.jsx';
import JayouBoard from './components/jayouBoard.jsx';
import MainPageBoard from './components/MainPageBoard.jsx';

import Notice from './components/NoticePage.jsx';
import YamaeNoticePage from './components/yamaeNoticePage.jsx';
import JinsimNoticePage from './components/jinsimNoticePage.jsx';
import JayouNoticePage from './components/jayouNoticepage.jsx';


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
              <div className="notice_pg">
                <Yamae />
              </div>
            }
          />
          <Route
            path="/jinsim"
            element={
              <div className="notice_pg">
                <Jinsim />
              </div>
            }
          />
          <Route
            path="/jayou"
            element={
              <div className="notice_pg">
                <Jayou />
              </div>
            }
          />
          <Route
            path="/annae"
            element={
              <div className="notice_pg">
                <Annae />
              </div>
            }
          />
          <Route
            path="/notice/:postId"
            element={
              <div className="notice_pg">
                <Notice />
              </div>
            }
          />
          <Route
            path="/YamaeNotice/:postId"
            element={
              <div className="notice_pg">
                <YamaeNoticePage />
              </div>
            }
          />
          <Route
            path="/JinsimNotice/:postId"
            element={
              <div className="notice_pg">
                <JinsimNoticePage />
              </div>
            }
          />
          <Route
            path="/JayouNotice/:postId"
            element={
              <div className="notice_pg">
                <JayouNoticePage />
              </div>
            }
          />
          <Route path="/MainPageBoard" element={
            <div className="notice_pg"><MainPageBoard /></div>} />
          <Route path="/YamaeBoard" element={
            <div className="notice_pg"><YamaeBoard /></div>} />
          <Route path="/JinsimBoard" element={
            <div className="notice_pg"><JinsimBoard /></div>} />
          <Route path="/JayouBoard" element={
            <div className="notice_pg"><JayouBoard /></div>} />
          <Route path="/AnnaeBoard" element={
            <div className="notice_pg"><AnnaeBoard /></div>} />
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;