import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import MainPage from './components/MainPage.jsx';
import '/src/App.css';
import Board from './components/board.jsx'
import { UserProvider } from './components/UserContext.jsx';
import MyPage from './components/myPage.jsx';
const App = () => {
  return (
   <UserProvider>
      <Routes>
        <Route
          path="/"
          element={
            <div className="login-background">
              <Login />
            </div>
          }
        />
        <Route
          path="/signIn"
          element={
            <div className="signIn-background">
              <SignIn />
            </div>
          }
        />
        <Route
          path="/MainPage"
          element={
            <div className="MainPage-background">
              <MainPage />
            </div>
          }
      />
       <Route
          path="/Board"
          element={
            <div className="MainPage-background">
              <Board />
            </div>
          }
        />
        <Route
          path="/myPage"
          element={
            <div className="MainPage-background">
              <MyPage />
            </div>
          }
        />
      </Routes>
   </UserProvider>
 
  );
};

export default App;