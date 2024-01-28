import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import { getAuth, signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import '/public/mypage.css'
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function MyPage() {
  const [newNickname, setNewNickname] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [nicknameError, setNicknameError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();
  const [userInfo, setUserInfo] = useState(null);
  const db = getFirestore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const toggleEditModal = () => {
  setIsEditModalOpen(!isEditModalOpen);
};
  

   const handleNicknameChange = async (e) => {
    const nickname = e.target.value;
    setNewNickname(nickname);
    const nicknameExists = await checkNicknameExistence(nickname);
    if (nicknameExists) {
      setNicknameError('이미 사용 중인 닉네임입니다.');
    } else {
      setNicknameError('');
    }
  };

 const checkNicknameExistence = async (nickname) => {
  try {
    const nicknameRef = doc(db, 'userNicknames', nickname); // 닉네임을 문서 ID로 사용
    const nicknameSnapshot = await getDoc(nicknameRef);
    return nicknameSnapshot.exists();
  } catch (error) {
    console.error('닉네임 확인 중 오류 발생:', error);
    return true;
  }
};

  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && !user.isAnonymous) {
        const profilePicture = await getProfilePicture(user.uid);
        setUserInfo({
          email: user.email,
          nickname: user.displayName,
          profilePicture: profilePicture,
        });
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const updateUserProfile = async (nickname) => {
  try {
    const user = auth.currentUser;
    await updateProfile(user, {
      displayName: nickname
    });
    console.log('사용자 프로필이 업데이트되었습니다.');
    // 사용자 정보 다시 가져오기 또는 상태 업데이트 로직 추가
  } catch (error) {
    console.error('사용자 프로필을 업데이트하는 동안 오류가 발생했습니다:', error);
  }
};

  const handleMyPageClick = () => {
    navigate('/myPage');
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('로그아웃 중 오류가 발생했습니다:', error);
      });
  };

  const getProfilePicture = async (uid) => {
    try {
      const storage = ref(getStorage(), `profilePictures/${uid}/profile.jpg`);
      const downloadURL = await getDownloadURL(storage);
      
      console.log('프로필 사진 URL:', downloadURL);
      
      return downloadURL;
    } catch (error) {
      console.error('프로필 사진을 불러오는 중 오류가 발생했습니다:', error);
      return '기본 이미지 URL';
    }
  };

  const handleUpdatePassword = async () => {
  try {
    await updatePassword(newPassword);
    setNewPassword(''); // 비밀번호 변경 후 입력 필드를 초기화합니다.
  } catch (error) {
    console.error('비밀번호 변경 중 오류가 발생했습니다:', error);
  }
};

const handleUpdateEmail = async () => {
  try {
    await updateEmail(newEmail);
    setNewEmail('');
  } catch (error) {
    console.error('이메일 주소 변경 중 오류가 발생했습니다:', error);
  }
  };
  
  const handleOutProfile = async () => {
  alert('공사중입니다');
};

  return (
    <>
      <Header handleMyPageClick={handleMyPageClick} handleLogout={handleLogout} />
      <div className="my_profile">나의 정보</div>
      <div className="myPage_profile">
        <>
          {userInfo ? (
            <div className="myPage_info">
              {userInfo.profilePicture ? (
                <img src={userInfo.profilePicture} alt="프로필 사진" />
              ) : (
                <p>프로필 사진: '회원만 보입니다.'</p>
              )}
              <div className="myPage_nick">닉네임: {userInfo.nickname || '회원만 보입니다.'}</div>
              <div className="myPage_email">이메일: {userInfo.email || '회원만 보입니다.'}</div>
            </div>
          ) : (
            <p>사용자 정보를 불러오는 중...</p>
          )}
        </>
      </div>
      <div className="profileOut_btn">
            <button onClick={handleOutProfile}>회원탈퇴</button>
          </div>
      <div className="profile_change_btn">
         <button onClick={toggleEditModal}>회원정보 수정</button>
      </div>
      {isEditModalOpen && (
  <div className="edit-modal">
    <div className="modal-content">
      <span className="close" onClick={toggleEditModal}></span>
      <div>
        <label htmlFor="nickname">닉네임:</label>
        <input 
          type="text" 
          id="newNickname" 
          value={newNickname} 
          onChange={handleNicknameChange} 
        />
       <button onClick={handleNicknameChange}>중복 확인</button>
  {nicknameError && <p className="error-message">{nicknameError}</p>}
      </div>
      <div>
        <label htmlFor="newPassword">새로운 비밀번호:</label>
        <input 
          type="password" 
          id="newPassword" 
          value={newPassword} 
          onChange={(e) => setNewPassword(e.target.value)} 
        />
        <button onClick={handleUpdatePassword}>비밀번호 변경</button>
      </div>
      <div>
        <label htmlFor="newEmail">새로운 이메일 주소:</label>
        <input 
          type="email" 
          id="newEmail" 
          value={newEmail} 
          onChange={(e) => setNewEmail(e.target.value)} 
        />
        <button onClick={handleUpdateEmail}>이메일 주소 변경</button>
            </div>
            
          </div>
  </div>
)}
          
    </>
  );
}

export default MyPage;