import React, { useState } from 'react';
import './PostForm.css'; // 게시글 작성 폼 관련 스타일을 import

const PostForm = ({ onPostSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      content,
    };
    onPostSubmit(newPost);
    setTitle('');
    setContent('');
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="게임명"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="post-input"
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="post-textarea"
      />
      <button type="submit" className="post-submit-button">등록</button>
    </form>
  );
};

export default PostForm;