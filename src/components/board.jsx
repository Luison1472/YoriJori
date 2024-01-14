import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '/src/firebase-config';
import { UserContext } from './UserContext';
import '/public/Board.css';
import Header from './Header.jsx';
import '/public/MainPage.css';
import ReactQuillComponent from '/src/components/ReactQuillCustom.jsx';
function Board() {
  const { isUserLoggedIn } = useContext(UserContext);
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

    const handleEditorChange = (value) => {
    setEditorContent(value);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('isUserLoggedIn:', isUserLoggedIn);
    if (!isUserLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/MainPage');
      return;
    }

    try {
      await addDoc(collection(db, 'posts'), {
        nickname,
        title,
        content: editorContent,
        timestamp: new Date(),
      });
      alert('게시물이 성공적으로 작성되었습니다!');
      setNickname('');
      setTitle('');
      setEditorContent('');
      fetchData();
    } catch (error) {
      console.error('게시물을 작성하는 동안 오류가 발생했습니다:', error);
    }
  };

  const fetchData = async () => {
  try {
    const boardCollection = collection(db, 'posts');
    const q = query(boardCollection, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    const postData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setPosts(postData);
  } catch (error) {
    console.error('데이터를 불러오는 동안 오류가 발생했습니다:', error);
  }
};

 useEffect(() => {
  fetchData();
}, []); 

  return (
    <>
       <Header handleMyPageClick={handleMyPageClick} handleLogout={handleLogout} />
      
      <h1>게시글 작성</h1>
      
      <form onSubmit={handleSubmit}>

        <div className="form_box">
        <input
          className="nick_input"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          maxLength={2}
        />
        <input
          className="title_input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        </div>
        <ReactQuillComponent
          value={editorContent}
          onChange={handleEditorChange}
          placeholder="내용"
        />
        <button type="submit">게시</button>
      </form>

      {/* 데이터 불러오기 버튼 */}
      <button onClick={fetchData}>데이터 불러오기</button>
    </>
  );
}

export default Board;