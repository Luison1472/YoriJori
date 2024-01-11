import React from 'react';

const PostItem = ({ post, index }) => (
    <div className="post-item">
    <p>{index + 1}.</p>
    <p>{post.nickname}</p>
    <p>{post.title}</p>
    <p>{post.date}</p>
  </div>
);

export default PostItem;