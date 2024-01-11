import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && !user.isAnonymous) {
        // 실제로 로그인된 사용자인 경우
        setIsUserLoggedIn(true);
      } else {
        // 익명으로 로그인된 사용자 또는 로그아웃된 경우
        setIsUserLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ isUserLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };