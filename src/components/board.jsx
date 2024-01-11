import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from '/src/firebase-config';
import { UserContext } from './UserContext';
import '/public/Board.css';

function Board() {
 const { isUserLoggedIn } = useContext(UserContext);
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('isUserLoggedIn:', isUserLoggedIn);
    if (!isUserLoggedIn) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/MainPage');
      return;
    }

    try {
      const currentDate = new Date();
      const formattedDate = `${currentDate.getFullYear()}/${currentDate.getMonth() + 1}/${currentDate.getDate()}`;
      
      await addDoc(collection(db, 'posts'), {
        nickname,
        title,
        content,
        date: formattedDate,
      });
      alert('게시물이 성공적으로 작성되었습니다!');
      setNickname('');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('게시물을 작성하는 동안 오류가 발생했습니다:', error);
    }
  };

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        // 여기서 데이터를 상태로 저장하거나 다른 처리를 수행할 수 있습니다.
      });
    } catch (error) {
      console.error('데이터를 불러오는 동안 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // 페이지 로드 시 데이터 불러오기

  return (
    <>
      {/* 폼 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
        />
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
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