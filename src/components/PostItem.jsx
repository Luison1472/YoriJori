import React from 'react';

function PostItem({ post, index }) {
  const formatDate = (timestamp) => {
    const date = timestamp.toDate(); // Firestore Timestamp를 JavaScript Date로 변환
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).replace(/\//g, ''); // 날짜 형식에서 슬래시 제거
  };

  return (
    <div className="post-item">
      <p>{index + 1}</p>
      <p>{post.nickname}</p>
      <p>{post.title}</p>
      <p>{formatDate(post.timestamp)}</p>
    </div>
  );
}

export default PostItem;