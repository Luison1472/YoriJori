import React, { useState, useEffect } from 'react';
import '/public/MainPage.css';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


function MainPage() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();

   useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsUserLoggedIn(!!user); 
    });

    return () => {
      unsubscribe();
    };
  }, []);

   const handleWriteButtonClick = () => {
    if (isUserLoggedIn) {
      // 회원인 경우 Board 페이지로 이동
      navigate('/Board');
    } else {
      // 비회원인 경우 알람 메시지 표시
      alert('로그인이 필요한 기능입니다.');
    }
    };
    
    const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('로그아웃 중 오류가 발생했습니다:', error);
      });
  };

 
return (
    <>
        <div className="main_pg">
            <div className="InMyPage">
                <p>요리조리</p>
                <img src="/public/img/mypg.png" alt="마이페이지"></img>
                 <img
            src="/public/img/logout.png"
            alt="로그아웃"
            onClick={handleLogout}
          ></img>
            </div>
        </div>

        <div className="mainpg_header">
            <ul className="mainpg_nav">
                <li>야매요리</li>
                <li>진심요리</li>
                <li>자유게시판</li>
                <li>안내</li>
            </ul>
        </div>

      <div className="free">
        <button onClick={handleWriteButtonClick}>작성</button>
      </div>
    </>
);
}

export default MainPage;