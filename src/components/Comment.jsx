import '/public/NoticePage.css';

const Comment = ({ comments }) => {
  // comments.timestamp가 존재하는지 확인 후 변환
  const formattedTimestamp = comments.timestamp ? new Date(comments.timestamp.toMillis()).toLocaleString() : '';

  return (
    <div className="comment">
        <div className="com_name">{comments.username}</div> 
        <div className="com_content">{comments.content}</div>
   </div>
  );
};

export default Comment;