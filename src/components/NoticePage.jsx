import React, { useEffect, useState } from 'react';
import Header from './Header.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '/src/firebase-config';
import PostItem from '/src/components/PostItem.jsx';

const NoticePage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
    const [post, setPost] = useState(null);
    
    const fetchData = async () => {
    try {
      const postDocRef = doc(db, 'posts', postId);
      const postDocSnap = await getDoc(postDocRef);

      if (postDocSnap.exists()) {
        setPost({ id: postDocSnap.id, ...postDocSnap.data() });
      } else {
        console.error('해당 ID의 게시물이 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('데이터를 불러오는 동안 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  const handleMyPageClick = () => {
    if (isUserLoggedIn) {
      navigate('/myPage');
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
          {post && (
        <div className="notice-content">
          {/* NoticePage에서 필요한 정보를 PostItem으로 전달 */}
          <PostItem post={post} index={0} />
        </div>
      )}

      </>
  );
};

export default NoticePage;