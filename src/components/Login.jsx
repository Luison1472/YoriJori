import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "/src/firebase-config";
import "/public/Login.css";

function Login() {

    const [userData, setUserData] = useState(null);
    
    //구글 로그인
    function handleGoogleLogin() {
    const provider = new GoogleAuthProvider(); // provider 구글 설정
    signInWithPopup(auth, provider) // 팝업창 띄워서 로그인
      .then((data) => {
        setUserData(data.user); // user data 설정
        console.log(data); // console에 UserCredentialImpl 출력
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //이메일, 비밀번호 로그인
  

 const handleLogin = (e) => {
  e.preventDefault();
  const email = document.getElementById('signUpEmail').value;
  const password = document.getElementById('signUpPassword').value;

  if (!email || !password) {
    alert('이메일과 비밀번호를 모두 입력해주세요.');
    return;
  }

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const signedInUser = userCredential.user;
      console.log('로그인 성공:', signedInUser);
      alert('로그인이 완료되었습니다.');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('로그인 에러:', errorMessage);
      alert('없는 계정입니다.');
    });
};

    

  return (
      <>
          <div className="background">
            <form>
                  <p className="login_title">요리조리<br/>Test.version</p>
                  <p className="login_join">로그인</p>
                <div className="in_Email">
            
                    <input type="email" id="signUpEmail" placeholder="이메일을 입력하세요" required />
                </div>
                  
                <div className="in_password" >
                
                    <input type="password" id="signUpPassword" placeholder="비밀번호를 입력하세요" required />
          </div>
          <div>
                <button className="login_btn"onClick={handleLogin}>입장</button>
                <Link to="/SignIn"><button className="join_btn" type="button">회원가입</button></Link>
          </div>
                  <button className="google_btn" onClick={handleGoogleLogin}>
      <img src="/public/img/web_light_rd_SI@1x.png" alt="구글 로그인" />
    </button>
              </form> 
          </div>
    </>
  );
}

export default Login;