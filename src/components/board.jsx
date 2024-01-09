import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from "/src/firebase-config"; 

function Board({ isUserLoggedIn }) {
  const [nickname, setNickname] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


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
      <form>
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
    </>
  );
}

export default Board;