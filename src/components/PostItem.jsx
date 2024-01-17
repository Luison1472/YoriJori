import React from 'react';
import '/public/PostItem.css';

function PostItem({ post, showImage, index, nicknameFirst }) {
  const formatDate = (timestamp) => {
    const date = timestamp.toDate();
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).replace(/\//g, '');
  };

  return (
    <div className="post-item">
      {index !== undefined && <p>{index}</p>}
      {nicknameFirst ? (
        <>
          <p>{post.nickname}</p>
          <p>{post.title}</p>
          <p>{formatDate(post.timestamp)}</p>
        </>
      ) : (
        <>
          <p>{post.title}</p>
          <p>{post.nickname}</p>
          <p>{formatDate(post.timestamp)}</p>
          <div className="hr2"></div>
        </>
      )}
      
      {showImage && post.content && post.content.includes('<img') && (
        <div className="img_content" dangerouslySetInnerHTML={{ __html: post.content }} />
      )}
    </div>
  );
}

export default PostItem;