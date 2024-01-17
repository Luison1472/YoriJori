import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
  const auth = getAuth();
 const unsubscribe = onAuthStateChanged(auth, (authUser) => {
  if (authUser) {
    setIsUserLoggedIn(!authUser.isAnonymous);
    setUser(authUser);
  } else {
    setIsUserLoggedIn(false);
    setUser(null);
  }
});

  return () => unsubscribe();
}, []);

  return (
  <UserContext.Provider value={{ isUserLoggedIn, user }}>
    {children}
  </UserContext.Provider>
);
};

export { UserProvider, UserContext };