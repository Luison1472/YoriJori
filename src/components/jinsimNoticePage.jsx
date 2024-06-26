import React, { useContext,useEffect, useState } from 'react';
import Header from './Header.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import { getAuth, signOut } from 'firebase/auth';
import { serverTimestamp, collection,updateDoc ,doc, getDoc, query, where,getDocs, addDoc} from 'firebase/firestore';  // query, where, getDocs 추가
import { db } from '/src/firebase-config';
import PostItem from '/src/components/PostItem.jsx';
import '/public/NoticePage.css';
import Comment from '/src/components/Comment.jsx';

const PAGE_SIZE = 8;

const jinsimNoticePage = () => {
  const { isUserLoggedIn } = useContext(UserContext);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]); 
  const [newComment, setNewComment] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const calculateTotalPages = (totalComments) => {
    return Math.ceil(totalComments / PAGE_SIZE);
  };
  useEffect(() => {
    fetchData();
    fetchComments();
  }, [postId, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


    const fetchData = async () => {
    try {
      const postDocRef = doc(db, 'jinsim', postId);
      const postDocSnap = await getDoc(postDocRef);

      if (postDocSnap.exists()) {
        const postData = postDocSnap.data();

       
        const views = postData.views || 0;
        await updateDoc(postDocRef, { views: views + 1 });
        setPost({
          id: postDocSnap.id,
          ...postData,
          views: views,
        });
      } else {
        console.error('해당 ID의 게시물이 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('데이터를 불러오는 동안 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [postId]);

  const fetchComments = async () => {
  try {
    const commentsCollectionRef = collection(db, 'comments');
    const commentsQuery = query(commentsCollectionRef, where('postId', '==', postId));
    const commentsQuerySnapshot = await getDocs(commentsQuery);

    const fetchedComments = commentsQuerySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 댓글을 시간순으로 정렬
    fetchedComments.sort((b, a) => {
      const timestampA = a.timestamp ? a.timestamp.toMillis() : 0;
      const timestampB = b.timestamp ? b.timestamp.toMillis() : 0;
      return timestampA - timestampB;
    });

    setComments(fetchedComments);
    setTotalPages(calculateTotalPages(fetchedComments.length));
  } catch (error) {
    console.error('댓글을 불러오는 동안 오류가 발생했습니다:', error);
  }
};

  useEffect(() => {
    fetchData();
    fetchComments();
    getViews();
  }, [postId]);

  const getViews = async () => {
  try {
    const postDocRef = doc(db, 'jinsim', postId);
    const postDocSnap = await getDoc(postDocRef);

    if (postDocSnap.exists()) {
      return postDocSnap.data().views || 0;
    } else {
      console.error('해당 ID의 게시물이 존재하지 않습니다.');
      return 0;
    }
  } catch (error) {
    console.error('조회수를 가져오는 동안 오류가 발생했습니다:', error);
    return 0;
  }
};

  const handleCommentSubmit = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    let commentUsername = '익명';

    if (user) {
      commentUsername = user.displayName || '익명';
    }

    const commentData = {
      postId,
      username: commentUsername,
      content: newComment,
      timestamp: serverTimestamp(),
    };

    const commentsCollectionRef = collection(db, 'comments');
    await addDoc(commentsCollectionRef, commentData);

    fetchComments();
    setNewComment('');
  } catch (error) {
    console.error('댓글을 제출하는 동안 오류가 발생했습니다:', error);
  }
};

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
      <div className="notice_header">
        <p>진심 게시판</p>
        <div className="hr1">
        </div>
      </div>
      {post && (
        <div className="notice-content">
         <PostItem post={post} showImage={true} nicknameFirst={false} />
        </div>
      )}

        <div className="comments-section">
        <h3>전체댓글 ({comments.length}) 방문수({post ? post.views : 1})</h3>
       <div className="comments-container">
          <div className="comments-list">
            {comments
              .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
              .map((comment, index) => (
                <Comment key={index} comments={comment} />
              ))}
          </div>
          <div className="comment_pagination">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={page === currentPage ? "active" : ""}
                >
                  {page}
                </button>
              )
            )}
          </div>
          <div className="comment-form">
            <p>댓글 작성</p>
            <input
              rows="1"
              placeholder=""
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="comment_btn">
              <button className="com_btn" onClick={handleCommentSubmit}>
                댓글 남기기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default jinsimNoticePage;