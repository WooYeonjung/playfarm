import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/WriteCommunity.css';
import CommunitySelect from './CommunitySelect';
import CommunityAdvertising from './CommunityAdvertising';
import { useAuth } from '../../service/context/AuthProvider';

const WriteCommunity = () => {
    const [loginUserId, setLoginUserId] = useState(''); // 로그인 되어있는 userId 담기
    const [postType, setPostType] = useState(null);
    const [selectType, setSelectType] = useState('');
    const [link, setLink] = useState('');
    const [postContent, setPostContent] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [files, setFiles] = useState([]);
    const [preViews, setPreViews] = useState([]);
    const navigate = useNavigate();
    const { isLoggedIn, loginInfo, onLogout } = useAuth();

    useEffect(() => {
        if (isLoggedIn && loginInfo.userId) {
            setLoginUserId(loginInfo.userId);
        }
    }, [loginInfo]);

    const handlePostTypeChange = (selectedOption) => {
        setPostType(selectedOption);
        setSelectType(selectedOption.value);

    };

    console.log(postType)


    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleContentChange = (e) => {
        setPostContent(e.target.value);
    };
    const handleImageChange = (event) => {
        const selectedFiles = event.target.files;
        if (event.target.files.length > 4) {
            alert("이미지는 최대 4장까지 선택할 수 있습니다.");
            event.target.value = ""; // 파일 입력 리셋
            setFiles([]);
            setPreViews([]);
            return;
        } else {
            if (selectedFiles.length === 0) {
                setFiles([]);
                setPreViews([]);
                return;
            }

            setFiles(event.target.files);
            const filePreviews = [];
            for (const file of selectedFiles) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    filePreviews.push(reader.result);
                    if (filePreviews.length === selectedFiles.length) {
                        setPreViews(filePreviews);
                    } else {
                        setPreViews('');
                    }
                };
                reader.readAsDataURL(file);
            }
        }

    };


    const handleCancel = (e) => {
        e.preventDefault();
        setPostType(null);
        setLink('');
        setPostContent('');
        setPostTitle('');
        setFiles('');
        setPreViews('');
        navigate('/community/all');
    };

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!postType || !postType.value) {
            alert('게시물 유형을 선택해주세요.');
            return;
        }
        const formData = new FormData(document.getElementById('postFrom'));
        const token = loginInfo.token;
        const existFile = document.getElementById('file');
        console.log(existFile);
        let headers;
        if (existFile) {
            headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        } else {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }
        try {
            const response = await axios.post('/community/uploadpost', formData, {
                headers: headers
            });
            if (response.status === 200) {
                alert('게시글이 작성되었습니다.');
                setPostType(null);
                setLink('');
                setPostContent('');
                setPostTitle('');
                setFiles('');
                setPreViews('');
                navigate('/community/all');
            } else {
                alert('게시글 작성에 실패했습니다.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Response error:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            } else {
                console.error('Error message:', error.message);
            }
            alert('게시글 작성 중 오류가 발생했습니다.');
        }
        // console.log(newPost);
    };

    return (
        <div className="total_wrapper">

            <div className='blank'>
                <h2> Community</h2>
            </div>
            <div className="write_community_container">
                <div className="write_community_wrapper">
                    <h1 className="write_community_title">게시글 작성</h1>
                    <hr />
                    <form onSubmit={handleSubmit} id='postFrom'>
                        <div className="write_community_section">
                            <label className="write_community_label" htmlFor="postType">유형</label>
                            <CommunitySelect
                                value={postType}
                                onChange={handlePostTypeChange}
                                required
                            />
                        </div>
                        <div className="write_community_section">
                            <label className="write_community_label" htmlFor="postTitle">제목</label>
                            <input
                                className="write_community_input"
                                type="text"
                                id="title"
                                name="postTitle"
                                value={postTitle}
                                onChange={handleTitleChange}
                                placeholder="글의 제목을 입력하세요"
                                required
                            />
                        </div>
                        <div className="write_community_section">
                            <label className="write_community_label" htmlFor="link">링크</label>
                            <div className="write_community_flex_container">
                                <input
                                    className="write_community_input"
                                    name="link"
                                    type="url"
                                    id="link"
                                    value={link}
                                    onChange={handleLinkChange}
                                    placeholder="🔗동영상 또는 사이트 링크 입력(필수x)"
                                />
                            </div>
                        </div>
                        <div className="write_community_section">
                            <label className="write_community_label" htmlFor="file">사진</label>
                            <div className="write_community_flex_container">
                                <input
                                    className="write_community_input"
                                    type="file"
                                    id="file"
                                    name="postImg"
                                    // value={link}
                                    onChange={handleImageChange}
                                    multiple
                                />
                            </div>
                            <div className="image_previews">
                                {preViews.map((url, index) => (
                                    <img key={index} src={url} alt={`Preview ${index + 1}`} className="image_preview" />
                                ))}
                            </div>
                        </div>
                        <div className="write_community_section">
                            <label className="write_community_label" htmlFor="postContent">내용</label>
                            <textarea
                                className="write_community_textarea"
                                name="postContent"
                                id="content"
                                value={postContent}
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
                                작성완료
                            </button>
                        </div>
                        <input type="hidden" name="postType" value={selectType} />
                    </form>
                </div>
                <div className="community_advertise">
                    <CommunityAdvertising />
                </div>
            </div>
        </div>
    );
};

export default WriteCommunity;

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/WriteCommunity.css';
// import CommunitySelect from './CommunitySelect';
// import CommunityAdvertising from './CommunityAdvertising';

// const WriteCommunity = () => {
//     const [loginUserId, setLoginUserId] = useState(''); // 로그인 되어있는 userId 담기
//     const [postType, setPostType] = useState(null);
//     const [link, setLink] = useState('');
//     const [content, setContent] = useState('');
//     const [posts, setPosts] = useState([]);
//     const [title, setTitle] = useState('');
//     const [postId, setPostId] = useState(1); // 추가: 새로운 게시물 ID
//     const navigate = useNavigate();

//     const userInfo = JSON.parse(localStorage.getItem("userData"));

//     useEffect(() => {
//         if (userInfo && userInfo.userid) {
//             setLoginUserId(userInfo.userid);
//         }
//         const savedPosts = localStorage.getItem('postsJSON');
//         if (savedPosts) {
//             const parsedPosts = JSON.parse(savedPosts);
//             setPosts(parsedPosts);
//             // 마지막 게시물의 postId를 기준으로 초기화
//             if (parsedPosts.length > 0) {
//                 const lastPostId = parsedPosts[parsedPosts.length - 1].postId; // 마지막 게시물의 postId 가져오기
//                 setPostId(lastPostId + 1);
//             }
//         }
//     }, [userInfo]);

//     const handlePostTypeChange = (selectedOption) => {
//         setPostType(selectedOption);
//     };

//     const handleLinkChange = (e) => {
//         setLink(e.target.value);
//     };

//     const handleContentChange = (e) => {
//         setContent(e.target.value);
//     };

//     const handleCancel = (e) => {
//         e.preventDefault();
//         setPostType(null);
//         setLink('');
//         setContent('');
//         setTitle('');
//         navigate('/community/all');
//     };

//     const handleTitleChange = (e) => {
//         setTitle(e.target.value);
//     };

//     const date = new Date();
//     const formattedDate = date.getFullYear() + '-' +
//         String(date.getMonth() + 1).padStart(2, '0') + '-' +
//         String(date.getDate()).padStart(2, '0') + ' ' +
//         String(date.getHours()).padStart(2, '0') + ':' +
//         String(date.getMinutes()).padStart(2, '0') + ':' +
//         String(date.getSeconds()).padStart(2, '0');



//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!postType || !postType.value) {
//             alert('게시물 유형을 선택해주세요.');

//             return;
//         }
//         const newPost = {
//             postId: postId,
//             userId: loginUserId,
//             title,
//             postType: postType.value, // postType이 null이 아닌 경우에만 접근
//             link,
//             content,
//             date: formattedDate,
//         };

//         const updatedPosts = [...posts, newPost];
//         setPosts(updatedPosts);
//         localStorage.setItem('postsJSON', JSON.stringify(updatedPosts));

//         // postId +1 증가 및 저장
//         const newPostId = postId + 1;
//         setPostId(newPostId);
//         localStorage.setItem('postId', newPostId.toString());

//         setPostType(null);
//         setLink('');
//         setContent('');
//         setTitle('');
//         alert('게시글이 작성되었습니다.');
//         navigate('/community/all');
//     };

//     return (
//         <div>
//             <div className='blank'>
//                 <h1> Community</h1>
//             </div>
//             <div className="write_community_container">
//                 <div className="write_community_wrapper">
//                     <h1 className="write_community_title">게시글 작성</h1>
//                     <hr />
//                     <form onSubmit={handleSubmit}>
//                         <div className="write_community_section">
//                             <label className="write_community_label" htmlFor="postType">유형</label>
//                             <CommunitySelect
//                                 value={postType}
//                                 onChange={handlePostTypeChange}
//                             />
//                         </div>
//                         <div className="write_community_section">
//                             <label className="write_community_label" htmlFor="title">제목</label>
//                             <input
//                                 className="write_community_input"
//                                 type="text"
//                                 id="title"
//                                 value={title}
//                                 onChange={handleTitleChange}
//                                 placeholder="글의 제목을 입력하세요"
//                                 required
//                             />
//                         </div>
//                         <div className="write_community_section">
//                             <label className="write_community_label" htmlFor="link">링크</label>
//                             <div className="write_community_flex_container">
//                                 <input
//                                     className="write_community_input"
//                                     type="text"
//                                     id="link"
//                                     value={link}
//                                     onChange={handleLinkChange}
//                                     placeholder="🔗동영상 또는 사이트 링크 입력(필수x)"
//                                 />
//                             </div>
//                         </div>
//                         <div className="write_community_section">
//                             <label className="write_community_label" htmlFor="content">내용</label>
//                             <textarea
//                                 className="write_community_textarea"
//                                 id="content"
//                                 value={content}
//                                 onChange={handleContentChange}
//                                 rows="10"
//                                 required
//                             />
//                         </div>
//                         <div className="write_community_flex_between">
//                             <button type="button" className="write_community_button write_community_button_cancel" onClick={handleCancel}>
//                                 취소
//                             </button>
//                             <button type="submit" className="write_community_button write_community_button_submit">
//                                 작성완료
//                             </button>
//                         </div>
//                     </form>
//                     {/* <div className="link_to_posts">
//                         <Link to="/community/posts">내가 쓴 글 목록 보기</Link>
//                     </div> */}
//                 </div>
//                 <div className="community_advertise">
//                     <CommunityAdvertising />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default WriteCommunity;

