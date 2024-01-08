import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import MainPage from './components/MainPage.jsx';
import '/src/App.css';

const App = () => {
  return (
   
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
      </Routes>
 
  );
};

export default App;