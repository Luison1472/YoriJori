import React from 'react';
import '/public/MainPage.css';

const Header = ({ handleMyPageClick, handleLogout }) => {
  return (
    <div className="main_pg">
      <div className="InMyPage">
        <p>요리조리</p>
        <img src="/public/img/mypg.png" alt="마이페이지" onClick={handleMyPageClick} />
        <img src="/public/img/logout.png" alt="로그아웃" onClick={handleLogout} />
      </div>
      <div className="mainpg_header">
        <ul className="mainpg_nav">
          <li>야매요리</li>
          <li>진심요리</li>
          <li>자유게시판</li>
          <li>안내</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;