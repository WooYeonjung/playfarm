import React, { useEffect, useState } from 'react';
import '../../styles/CommentSection.css';

export default function CommentSection({ postId }) {
    const [comments, setComments] = useState(JSON.parse(localStorage.getItem(`comments_${postId}`)) || []);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim() === '') {
            alert('댓글을 입력해주세요!');
            return;
        }

        const comment = {
            id: comments.length + 1,
            content: newComment,
            date: new Date().toISOString(),
        };
        const updatedComments = [...comments, comment];
        setComments(updatedComments);
        localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
        setNewComment('');
    };

    return (
        <div className="comment_section">
            <h3>Comments</h3>
            <div className="comment_list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment_item">
                        <span className='comment_item_content'>{comment.content}</span>
                        <span className='comment_item_date'>{new Date(comment.date).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <div className="comment_form">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요."
                />
                <button className='comment_Btn' onClick={handleAddComment}>댓글달기</button>
            </div>
        </div>
    );
}
