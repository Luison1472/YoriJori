import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '/src/firebase-config';

export const fetchPosts = async (collectionName) => {
  try {
    const postsCollection = collection(db, collectionName);
    const q = query(postsCollection, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    const postData = [];
    querySnapshot.forEach((doc) => {
      postData.push({ id: doc.id, ...doc.data() });
    });

    return postData;
  } catch (error) {
    console.error('데이터를 불러오는 동안 오류가 발생했습니다:', error);
    return [];
  }
};