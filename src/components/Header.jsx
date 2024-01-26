import React from 'react';
import '/public/Header.css';
import { Link } from 'react-router-dom';

const Header = ({ handleMyPageClick, handleLogout }) => {
  return (
    <div className="main_pg">
      <div className="InMyPage">
        <p><Link to ="/MainPage">요리조리</Link></p>
        <img src="./public/images/mypg.png" alt="마이페이지" onClick={handleMyPageClick} />
        <img src="./public/images/logout.png" alt="로그아웃" onClick={handleLogout} />
      </div>
      <div className="mainpg_header">
        <ul className="mainpg_nav">
          <li><Link to="/all">전체게시판</Link></li>
          <li><Link to="/yamae">야매요리</Link></li>
          <li><Link to="/jinsim">진심요리</Link></li>
          <li><Link to="/jayou">자유게시판</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Header;