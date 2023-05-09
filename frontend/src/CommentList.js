import React from 'react';

const CommentList = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.commentId}>
          {comment.status === 'approved'
            ? comment.comment
            : comment.status === 'rejected'
            ? 'This comment has been rejected'
            : 'This comment is awaiting moderation'}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
