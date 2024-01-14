import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import MainPage from './components/MainPage.jsx';
import '/src/App.css';
import Board from './components/board.jsx';
import { UserProvider } from './components/UserContext.jsx';
import MyPage from './components/myPage.jsx';

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
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;