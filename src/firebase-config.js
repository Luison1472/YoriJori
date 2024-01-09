import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCva8nsoUdiUZ4UwCSOE4qGsx83WR97qLI",
  authDomain: "yori-jori-6027c.firebaseapp.com",
  projectId: "yori-jori-6027c",
  storageBucket: "yori-jori-6027c.appspot.com",
  messagingSenderId: "73427111375",
  appId: "1:73427111375:web:bdeaf9ff127eba95e716ba"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { db, app, auth };


// 회원가입 함수
export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export default app;