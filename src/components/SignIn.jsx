import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import "/public/SignIn.css";


function SignIn() {
  const auth = getAuth(); // Firebase auth 객체 가져오기
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [nickname, setNickname] = useState('');
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
      await updateProfile(user, { displayName: nickname });
      console.log('회원가입 성공:', user);
      alert('회원가입이 완료되었습니다.'); // 회원가입 완료 알림
      // 회원가입에 성공했을 때.
    } catch (error) {
      console.error('회원가입 에러:', error.message);
      alert('이미 있는 계정입니다.');
    }
  };

  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        // data 사용 및 처리
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
     
        <form className="form_bg">
          <p className="login_title">요리조리<br/>Test.version</p>
          <p className="login_join">회원가입</p>
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
          <input type="text" id="nickname" placeholder="닉네임을 입력하세요" value={nickname || ''} onChange={(e) => setNickname(e.target.value)} required maxLength={5} />
        </div>
            {passwordMatchError && <p className="error">{passwordMatchError}</p>}
          <div className="sign_and_login">
            <button className="sign_in_btn" onClick={handleSignUp}>가입</button>
            <Link to="/"><button className="go_sign_btn" type="button">로그인<br/>하러가기</button></Link>
          </div>
          <button className="google_btn" onClick={handleGoogleLogin}>
            <img src="/public/img/web_light_rd_SI@1x.png" alt="구글 로그인" />
          </button>
        </form>
  
    </>
  );
}

export default SignIn;