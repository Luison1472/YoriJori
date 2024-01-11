import React, { useContext, useState, useEffect } from 'react';
import '/public/MainPage.css';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '/src/firebase-config';
import PostItem from '/src/components/PostItem.jsx';

function MainPage() {
  const { isUserLoggedIn } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      const postData = [];
      querySnapshot.forEach((doc) => {
        postData.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postData);
    } catch (error) {
      console.error('데이터를 불러오는 동안 오류가 발생했습니다:', error);
    }
  };
   useEffect(() => {
    fetchData();
   }, []);
  
  const handleMyPageClick = () => {
    if (isUserLoggedIn) {
          // 회원인 경우 Board 페이지로 이동
          navigate('/myPage');
        } else {
          // 비회원인 경우 알람 메시지 표시
          alert('로그인이 필요한 기능입니다.');
          // 여기서 추가적인 로직을 추가해도 됩니다 (예: 로그인 페이지로 이동하거나 다른 처리)
          // 예: navigate('/login');
        }
  };
  

  const handleWriteButtonClick = () => {
    if (isUserLoggedIn) {
      // 회원인 경우 Board 페이지로 이동
      navigate('/Board');
    } else {
      // 비회원인 경우 알람 메시지 표시
      alert('로그인이 필요한 기능입니다.');
      // 여기서 추가적인 로직을 추가해도 됩니다 (예: 로그인 페이지로 이동하거나 다른 처리)
      // 예: navigate('/login');
    }
  };
    
    const handleLogout = () => {
  const auth = getAuth(); // Firebase의 getAuth 함수 호출
  const user = auth.currentUser;

  if (user && user.isAnonymous) {
    auth.signOut()
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('로그아웃 중 오류가 발생했습니다:', error);
      });
  } else {
      // 익명 로그인이 아닌 경우 바로 로그아웃
      signOut(auth)
        .then(() => {
          navigate('/');
        })
        .catch((error) => {
          console.error('로그아웃 중 오류가 발생했습니다:', error);
        });
    }
  };

 
return (
    <>
        <div className="main_pg">
            <div className="InMyPage">
                <p>요리조리</p>
                <img src="/public/img/mypg.png" alt="마이페이지" onClick={handleMyPageClick} ></img>
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
      <div className="notice">
        <p>공지사항</p>
        <button className="write_btn" onClick={handleWriteButtonClick}>
          <img src="/public/img/write.png" alt="작성" />
        </button>
      </div>
      <div className="post-header">
        <p>순서</p>
        <p>닉네임</p>
        <p>제목</p>
        <p>날짜</p>
      </div>

       <div className="post-list">
          {posts.slice().reverse().map((post, index) => (
            <PostItem key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}

export default MainPage;