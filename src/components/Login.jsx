import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";
import { auth } from "/src/firebase-config";
import "/public/Login.css";

function Login() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  console.log("userData : ");
  console.log(userData);

  // 구글 로그인
  function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        alert("구글 로그인 완료");
        navigate('/MainPage');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 이메일, 비밀번호 로그인
  function handleAnonymousLogin() {
    signInAnonymously(auth)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('익명 사용자로 로그인:', user);
        alert('비회원 로그인이 완료되었습니다.');
        navigate('/MainPage');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error('익명 사용자 로그인 에러:', errorMessage);
      });
  }

  // 이메일, 비밀번호 로그인
  const handleLogin = (e) => {
    e.preventDefault();
    const email = document.getElementById('signUpEmail').value;
    const password = document.getElementById('signUpPassword').value;

    if (!email || !password) {
      // 이메일과 비밀번호를 입력하지 않은 경우 익명 로그인 처리
      handleAnonymousLogin();
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const signedInUser = userCredential.user;
        console.log('로그인 성공:', signedInUser);
        alert('로그인이 완료되었습니다.');
        navigate('/MainPage');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('로그인 에러:', errorMessage);
        alert('없는 계정입니다.');
        alert('회원가입 페이지로 이동합니다.');
        navigate('/SignIn');
      });
  };

  return (
    <>
      <form className="form_bg">
        <p className="login_title">요리조리<br/>Test.version</p>
        <p className="login_join">로그인</p>
        <div className="in_Email">
          <input type="email" id="signUpEmail" placeholder="이메일을 입력하세요" required />
        </div>
        <div className="in_password" >
          <input type="password" id="signUpPassword" placeholder="비밀번호를 입력하세요" required />
        </div>

        <div className="login_box">
          <button className="login_btn" onClick={handleLogin}>입장</button>
          <Link to="/SignIn"><button className="join_btn" type="button">회원가입</button></Link>
        <button className="google_btn" onClick={handleGoogleLogin}>
          <img src="/public/img/web_light_rd_SI@1x.png" alt="구글 로그인" />
        </button>
        </div>
      </form>
    </>
  );
}

export default Login;