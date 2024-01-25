import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

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
const storage = getStorage(app);
export { db, app, auth, storage };
  
  export const fetchPosts = async (collectionName) => {
  try {
    const collectionRef = collection(db, collectionName);
    const collectionSnapshot = await getDocs(collectionRef);

    const posts = collectionSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return posts;
  } catch (error) {
    console.error('게시글을 불러오는 동안 오류가 발생했습니다:', error);
    return [];
  }
};


// 회원가입 함수
export const signUpWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {

    if (error.code === 'auth/email-already-in-use') {
      throw new Error('이미 사용 중인 이메일 주소입니다.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('유효하지 않은 이메일 주소입니다.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('약한 암호입니다. 더 강력한 암호를 사용하세요.');
    } else {
      throw new Error('회원가입 중 오류가 발생했습니다.');
    }
  }
};

export default app;