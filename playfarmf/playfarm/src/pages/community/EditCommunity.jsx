
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../styles/WriteCommunity.css';
import CommunitySelect, { options } from './CommunitySelect'; // options 가져오기
import CommunityAdvertising from './CommunityAdvertising';

const EditCommunity = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { post } = location.state;

    const [loginUserId, setLoginUserId] = useState('');
    const [postType, setPostType] = useState(null);
    const [link, setLink] = useState(post.link);
    const [content, setContent] = useState(post.content);
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState(post.title);

    const userInfo = JSON.parse(localStorage.getItem("userData"));
    const date = new Date();
    const formattedDate = date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0') + ' ' +
        String(date.getHours()).padStart(2, '0') + ':' +
        String(date.getMinutes()).padStart(2, '0') + ':' +
        String(date.getSeconds()).padStart(2, '0');


    useEffect(() => {
        if (userInfo && userInfo.userid) {
            setLoginUserId(userInfo.userid);
        }
        const savedPosts = localStorage.getItem('postsJSON');
        if (savedPosts) {
            setPosts(JSON.parse(savedPosts));
        }

        // postType을 초기화
        const selectedPostType = options.find(option => option.value === post.postType);
        setPostType(selectedPostType);
    }, []);

    const handlePostTypeChange = (selectedOption) => {
        setPostType(selectedOption);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/community/posts');
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('게시글이 수정되었습니다.');

        const updatedPosts = posts.map((p) =>
            p.postId === post.postId
                ? { ...p, title, postType: postType.value, link, content, date: formattedDate }
                : p
        );

        setPosts(updatedPosts);
        localStorage.setItem('postsJSON', JSON.stringify(updatedPosts));

        navigate('/community/all');
    };

    return (
        <div>
            <div className='blank'></div>
            <div className="write_community_container" style={{ height: "100vh" }}>
                <div className="write_community_wrapper">
                    <h1 className="write_community_title">게시글 수정</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="write_community_section">
                            <label className="write_community_label" htmlFor="postType">유형</label>
                            <CommunitySelect
                                value={postType}
                                onChange={handlePostTypeChange}
                            />
                        </div>
                        <div className="write_community_section">
                            <label className="write_community_label" htmlFor="title">제목</label>
                            <input
                                className="write_community_input"
                                type="text"
                                id="title"
                                value={title}
                                onChange={handleTitleChange}
                                placeholder="글의 제목을 입력하세요"
                            />
                        </div>
                        <div className="write_community_section">
                            <label className="write_community_label" htmlFor="link">링크</label>
                            <div className="write_community_flex_container">
                                {/* <span role="img" aria-label="link" style={{ marginLeft: '8px' }}>
                                    
                                </span> */}
                                <input
                                    className="write_community_input"
                                    type="text"
                                    id="link"
                                    value={link}
                                    onChange={handleLinkChange}
                                    placeholder="🔗동영상 또는 사이트 링크 입력(필수x)"
                                    style={{ marginBottom: "20px" }}
                                />
                            </div>
                            <textarea
                                className="write_community_textarea"
                                id="content"
                                value={content}
                                onChange={handleContentChange}
                                rows="10"
                                required
                            />
                        </div>
                        <div className="write_community_flex_between">
                            <button type="button" className="write_community_button write_community_button_cancel" onClick={handleCancel}>
                                취소
                            </button>
                            <button type="submit" className="write_community_button write_community_button_submit">
                                수정완료
                            </button>
                        </div>
                    </form>
                </div>
                <div className="community_advertise">
                    <CommunityAdvertising />
                </div>
            </div>
        </div>
    );
};

export default EditCommunity;
