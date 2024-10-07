import React, { useEffect, useState } from 'react';
import '../../styles/CommentSection.css';
import axios from 'axios';
import { useAuth } from '../../service/context/AuthProvider';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CommentSection({ postId, comments, setComments }) {
    // const [comments, setComments] = useState(JSON.parse(localStorage.getItem(`comments_${postId}`)) || []);

    const [newComment, setNewComment] = useState('');
    const { isLoggedIn, loginInfo, onLogout } = useAuth();
    console.log(loginInfo)
    const handleAddComment = async () => {
        if (newComment.trim() === '') {
            alert('댓글을 입력해주세요!');
            return;
        }

        const commentData = {
            postId,
            replyContent: newComment
        };

        try {
            const response = await axios.post('/community/reply', commentData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginInfo.token,
                }
            });

            if (response.status === 200) {
                alert('댓글을 등록하였습니다.');
                setNewComment('');
            }
        } catch (error) {
            alert('댓글 등록을 실패하였습니다.');
            console.error('댓글 등록을 실패하였습니다.', error);
        }

        // const comment = {
        //     id: comments.length + 1,
        //     content: newComment,
        //     date: new Date().toISOString(),
        // };
        // const updatedComments = [...comments, comment];
        // setComments(updatedComments);
        // localStorage.setItem(`comments_${postId}`, JSON.stringify(updatedComments));
        // setNewComment('');
    };

    const deleteMyReply = async (replyId) => {
        try {
            const response = await axios.delete(`/community/reply/${replyId}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginInfo.token,
                }
            });
            alert('댓글을 삭제하였습니다.');
            setComments(comments.filter(comment => comment.replyId !== replyId));
        } catch (error) {
            alert('댓글 삭제를 실패하였습니다.');
            console.error('댓글 삭제 중 오류가 발생했습니다.', error);
        }
    };

    return (
        <div className="comment_section">
            <h3>Comments</h3>
            <div className="comment_list">
                {comments.map((comment) => (
                    <div key={comment.replyId} className="comment_item">
                        <span className='comment_item_nickname'>{comment.nickname}</span>
                        <span className='comment_item_content'>{comment.replyContent}</span>
                        <span className='comment_item_date'>{new Date(comment.regDate).toLocaleString()}</span>
                        <span className='comment_item_delete'>
                            {isLoggedIn && loginInfo.nickname === comment.nickname &&
                                <FontAwesomeIcon icon={faTrashCan} onClick={() => deleteMyReply(comment.replyId)} />}
                        </span>
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
