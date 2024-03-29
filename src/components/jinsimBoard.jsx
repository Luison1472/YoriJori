import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, addDoc, query, orderBy } from 'firebase/firestore';
import { db } from '/src/firebase-config';
import { UserContext } from './UserContext';
import '/public/Board.css';
import Header from './Header.jsx';
import TextEditor from "/src/components/TextEditor";
import { getAuth, signOut } from 'firebase/auth';
import { fetchPosts } from '/src/components/firebase-utils.js';

function jinsimBoard() {
 const { isUserLoggedIn, user } = useContext(UserContext);
 const [nickname, setNickname] = useState(user ? user.displayName : '');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

   useEffect(() => {
    // 사용자가 닉네임을 설정했다면 자동으로 채우기
    if (user && user.displayName) {
      setNickname(user.displayName);
    }
   }, [user]);
  
   const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('isUserLoggedIn:', isUserLoggedIn);
  if (!isUserLoggedIn) {
    alert('로그인이 필요한 서비스입니다.');
    navigate('/MainPage');
    return;
  }

  // 제목과 내용이 비어있는지 확인
  if (!title || !content) {
    alert('제목과 내용을 모두 입력해주세요.');
    return;
  }

  try {
    const docRef = await addDoc(collection(db, 'jinsim'), {
      nickname,
      title,
      content,
      timestamp: new Date(),
    });

    alert('게시물이 성공적으로 작성되었습니다!');
    setNickname('');
    setTitle('');
    setContent('');
    fetchData(); // 게시글 작성 후 데이터 다시 불러오기
  } catch (error) {
    console.error('게시물을 작성하는 동안 오류가 발생했습니다:', error);
  }
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

  useEffect(() => {
    const fetchData = async () => {
      const postData = await fetchPosts('jinsim'); // 다른 컬렉션 이름 전달
      setPosts(postData);
    };

    fetchData();
  }, []);
  
  const handleGoToMainPage = () => {
    navigate('/jinsim');
  };

  const fetchData = async () => {
  try {
    const boardCollection = collection(db, 'jinsim');
    const q = query(boardCollection, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    const postData = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      // 이미지 URL이 있는지 확인하고 적절히 데이터 생성
      if (data.content.includes('img')) {
        postData.push({ id: doc.id, ...data });
      } else {
        // 텍스트만 작성된 경우에는 빈 이미지 URL로 처리
        postData.push({ id: doc.id, ...data, imageURL: '' });
      }
    });

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
      <div className="board_sub_header">
      <p>게시글 작성</p>
    
          <form onSubmit={handleSubmit}>
            <button className="sub_btn" type="submit">게시</button>
          </form>
    
          <button className="sub_btn2" onClick={handleGoToMainPage}>나가기</button>
       
      </div>


        <div className="form_box">
        <input
          className="nick_input"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임"
          maxLength={5}
        />
        <input
          className="title_input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
        />
        </div>
      <TextEditor setContent={setContent} />

      <div style={{ display: "flex" }}>
        <div className="ck ck-editor__main" 
        style={{ width : "100%"}}>
          <div
            className="ck ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred"
          />
        </div>
      </div>

       


    </>
  );
}

export default jinsimBoard;