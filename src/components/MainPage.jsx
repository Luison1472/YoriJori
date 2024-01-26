import React, { useContext, useState, useEffect } from 'react';
import '/public/MainPage.css';
import { UserContext } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import PostItem from '/src/components/PostItem.jsx';
import Pagination from '/src/components/Pagination.jsx';
import Header from './Header.jsx';

import { fetchPosts } from '/src/firebase-config.js';
import PopularPosts from '/src/components/PopularPosts.jsx';


function MainPage() {
  const { isUserLoggedIn } = useContext(UserContext); 
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 useEffect(() => {
    const fetchData = async () => {
      const postData = await fetchPosts('posts');
      setPosts(postData);
    };

    fetchData();
  }, []);

  const handleMyPageClick = () => {
    if (isUserLoggedIn) {
      navigate('/myPage');
    } else {
      alert('로그인이 필요한 기능입니다.');
    }
  };

  const handleWriteButtonClick = () => {
  if (isUserLoggedIn) {
    navigate('/MainPageBoard');
  } else {
    alert('로그인이 필요한 기능입니다.');
    navigate('/MainPage'); // 비로그인 사용자일 경우 메인 페이지로 이동
  }
};

  const handleLogout = () => {
    const auth = getAuth();
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
      <Header handleMyPageClick={handleMyPageClick} handleLogout={handleLogout} />

      <div className="free">
        <div className="notice">
          <p>공지사항</p>
          <button className="write_btn" onClick={handleWriteButtonClick}>
            <img src="./public/img/write.png" alt="작성" />
          </button>
        </div>
        <div className="post-header">
          <p>순서</p>
          <p>닉네임</p>
          <p>제목</p>
          <p>날짜</p>
        </div>

        <div className="main-post-list">
  {posts
    .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
    .map((post, index) => (
      <Link key={post.id} to={`/Notice/${post.id}`}>
        <PostItem key={post.id} index={index + 1} post={post} showImage={false} nicknameFirst={true} />
      </Link>
    ))}
</div>
        <div className="pagination">
          <Pagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      <PopularPosts />

    </>
  );
}

export default MainPage;