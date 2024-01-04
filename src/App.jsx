import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignIn from './components/SignIn.jsx';
import '/src/App.css';
const App = () => {
  return (
    <>
      <div className="backGround">
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signIn" element={<SignIn />}/>
      </Routes>
      </div>
    </>
  );
};

export default App;