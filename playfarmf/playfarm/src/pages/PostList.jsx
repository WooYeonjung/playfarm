import React from 'react';
import './PostList.css'; // 게시글 목록 관련 스타일을 import

const PostList = ({ posts }) => {
  return (
    <div className="post-list-container">
      <h2 className="post-list-title">글 목록</h2>
      {posts.map(post => (
        <div key={post.id} className="post-item">
          <h3 className="post-title">{post.title}</h3>
          <p className="post-content">{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostList;