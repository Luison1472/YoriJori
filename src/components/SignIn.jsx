import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL,getStorage } from 'firebase/storage';
import "/public/SignIn.css";


function SignIn() {
  const auth = getAuth();
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [nickname, setNickname] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const storage = getStorage();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.');
      return;
    } else {
      setPasswordMatchError(''); 
    }

      try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (profilePicture) {
        // 프로필 사진 업로드
        const metadata = {
          contentType: profilePicture.type // 파일의 MIME 유형 설정
        };
        const storageRef = ref(storage, `profilePictures/${user.uid}/profile.jpg`);
        await uploadBytes(storageRef, profilePicture, metadata);
      }

      // 사용자 프로필 업데이트
      await updateProfile(user, {
        displayName: document.getElementById('nickname').value,
        // photoURL은 이미지 업로드 후 자동으로 설정됩니다.
      });

      console.log('회원가입 성공:', user);
      alert('회원가입이 완료되었습니다.'); // 회원가입 완료 알림
    } catch (error) {
      console.error('회원가입 에러:', error.message);
      alert('이미 있는 계정입니다.');
    }
  };


 const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file ? file : null);
  };

  function handleGoogleLogin() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((userCredential) => {
      const user = userCredential.user;
      setUserData({
        displayName: user.displayName,
        photoURL: user.photoURL,
        googleUser: true // 구글 로그인 사용자 여부 플래그 추가
      });

      // 구글 로그인 사용자의 경우 프로필 사진 업데이트
      if (user.photoURL) {
        updateProfile(user, {
          photoURL: user.photoURL
        });
      }

      alert("구글 로그인 완료");
      navigate('/MainPage');
    })
    .catch((err) => {
      console.log(err);
    });
}

  return (
   <>
      <form className="form_bg">
        <p className="login_title">요리조리<br/>Test.version</p>
        <p className="signin_join">회원가입</p>
        <div className="in_profile">
          {profilePicture ? (
            <img 
              src={URL.createObjectURL(profilePicture)} 
              alt="프로필 사진 미리보기" 
              style={{borderRadius:'50%', width: '150px', height: '150px', objectFit: 'cover' }}
            />
          ) : (
            <div 
              className="empty-profile-box" 
              style={{ width: '150px', height: '150px', background: '#fff', border: '1px solid #ccc' }}
            />
          )}
          <input 
            type="file" 
            id="profilePicture" 
            accept="image/*" 
            onChange={handleProfilePictureChange} 
          />
        </div>
        <div className="profile_intro">화면을 클릭해 프로필 변경 해주세요</div>
        <div className="in_Email">
          <input type="email" id="signUpEmail" placeholder="이메일을 입력하세요" required />
        </div>
        <div className="in_password">
          <input type="password" id="signUpPassword" placeholder="비밀번호를 입력하세요" required />
        </div>
        <div className="in_password">
          <input type="password" id="confirmPassword" placeholder="비밀번호를 확인하세요" required />
        </div>
        <div className="in_password">
          <input type="text" id="nickname" placeholder="닉네임을 입력하세요" value={nickname || ''} onChange={(e) => setNickname(e.target.value)} required maxLength={6} />
        </div>
        {passwordMatchError && <p className="error">{passwordMatchError}</p>}
        <div className="sign_and_login">
          <button className="sign_in_btn" onClick={handleSignUp}>가입</button>
          <Link to="/"><button className="go_sign_btn" type="button">로그인<br/>하러가기</button></Link>
        </div>
        <button className="google_btn" onClick={handleGoogleLogin}>
         <img src="/img/google_login.png" alt="구글 로그인" />
        </button>
      </form>
    </>
  );
}

export default SignIn;