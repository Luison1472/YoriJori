import React, { useContext, useState, useEffect } from 'react';
import '/public/MainPage.css';
import { UserContext } from './UserContext';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '/src/firebase-config';
import PostItem from '/src/components/PostItem.jsx';
import Pagination from '/src/components/Pagination.jsx';
import Header from './Header.jsx';

function MainPage() {
  const { isUserLoggedIn } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 12;
  const navigate = useNavigate();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const fetchData = async () => {
    try {
      const boardCollection = collection(db, 'posts');
      const q = query(boardCollection, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

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
      navigate('/myPage');
    } else {
      alert('로그인이 필요한 기능입니다.');
    }
  };

  const handleWriteButtonClick = () => {
    if (isUserLoggedIn) {
      navigate('/Board');
    } else {
      alert('로그인이 필요한 기능입니다.');
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
          {posts
            .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
            .map((post, index) => (
              <PostItem key={post.id} post={post} index={index} />
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
    </>
  );
}

export default MainPage;