import React from 'react';
import Header from './Header.jsx';

const Jinsim = () => {

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
      </>
  );
};

export default Jinsim;