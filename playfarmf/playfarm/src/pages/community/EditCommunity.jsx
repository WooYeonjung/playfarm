
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/WriteCommunity.css';
// import CommunitySelect, { options } from './CommunitySelect'; // options 가져오기
import CommunitySelect from './CommunitySelect'; // options 가져오기
import CommunityAdvertising from './CommunityAdvertising';
import { useAuth } from '../../service/context/AuthProvider';
import axios from 'axios';
import { API_BASE_URL } from '../../service/app-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faComments, faHandshake } from '@fortawesome/free-regular-svg-icons';
import { faPalette } from '@fortawesome/free-solid-svg-icons';

const EditCommunity = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { post } = location.state;
    const { isLoggedIn, loginInfo } = useAuth();
    const [postType, setPostType] = useState('');
    const [link, setLink] = useState(post.link);
    const [postContent, setPostContent] = useState(post.postContent);
    const [selectType, setSelectType] = useState('');
    const [posts, setPosts] = useState([]);
    const [postTitle, setPostTitle] = useState(post.postTitle);
    const [imageList, setImageList] = useState([]);
    const [preViews, setPreViews] = useState([]);
    const [files, setFiles] = useState([]);
    const fileGroupId = post.fileGroupId;
    const date = new Date();
    const formattedDate = date.getFullYear() + '-' +
        String(date.getMonth() + 1).padStart(2, '0') + '-' +
        String(date.getDate()).padStart(2, '0') + ' ' +
        String(date.getHours()).padStart(2, '0') + ':' +
        String(date.getMinutes()).padStart(2, '0') + ':' +
        String(date.getSeconds()).padStart(2, '0');

    const options = [
        { value: 'find', label: '유저찾기', icon: <FontAwesomeIcon icon={faHandshake} /> },
        { value: 'free', label: '자유', icon: <FontAwesomeIcon icon={faComments} /> },
        { value: 'question', label: '질문', icon: <FontAwesomeIcon icon={faCircleQuestion} /> },
        { value: 'fanart', label: '팬아트', icon: <FontAwesomeIcon icon={faPalette} /> },
    ];
    useEffect(() => {

        const fetchPost = async () => {
            if (isLoggedIn && loginInfo.userId) {
                try {
                    const response = await axios.get(`/image/detailpost/${fileGroupId}`);

                    return response.data
                } catch (error) {
                    console.error('게시글을 찾지 못했습니다.', error);
                }
            }

        };

        if (post.fileGroupId != null && post.fileGroupId != '') {
            fetchPost().then((res) => {
                setImageList(res);
                setPreViews(res);

            });
        }
        //postType을 초기화
        const selectedPostType = options.find(option => option.value === post.postType);
        setPostType(selectedPostType);
        setSelectType(selectedPostType.value);
    }, []);

    useEffect(() => {
        if (files.length === 0) {
            // 새로운 이미지가 선택되지 않았다면 기존 preViews를 유지
            setPreViews(post.preViews);
        }
    }, [files, imageList]);//[files, imageList]

    const handlePostTypeChange = (selectedOption) => {
        setPostType(selectedOption);
        setSelectType(selectedOption.value);
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
    };

    const handleContentChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate('/community/posts');
    };

    const handleTitleChange = (e) => {
        setPostTitle(e.target.value);
    };

    // console.log(postTitle);
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
    const handleSubmit = async (e) => {
        e.preventDefault();

        // const data = document.getElementById('postForm');
        const formData = new FormData();
        // formData.append('fileGroupId', post.fileGroupId);
        formData.append('postId', post.postId);
        formData.append('postTitle', postTitle);
        formData.append('postContent', postContent);
        formData.append('link', link);
        formData.append('postType', selectType);
        console.log(post.postId);
        debugger;

        // 파일이 있을 경우 FormData에 추가
        const existFile = document.getElementById('file2');
        // if (existFile && existFile.files.length > 0) {
        //     formData.append('postImg', files)
        // }
        if (files && files.length > 0) {
            for (let i = 0; i < existFile.files.length; i++) {
                formData.append('postImg', existFile.files[i]);
            }
        }
        const token = loginInfo.token;
        console.log(existFile);
        let headers;
        if (existFile && existFile.files.length > 0) {
            headers = {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            };
        } else {
            headers = {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            };
        }

        try {
            const response = await axios.put('/community/updatepost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + token
                },
                data: formData
            });

            debugger;
            if (response.status === 200) {
                alert('게시글이 수정되었습니다.');
                // setPostType(null);
                // setLink('');
                // setPostContent('');
                // setPostTitle('');
                // setFiles('');
                // setPreViews('');
                navigate('/community/posts');
            } else {
                alert('게시글 수정에 실패했습니다.');
            }
        } catch (error) {
            if (error.response) {
                console.error('Response error:', error.response.data);
                console.error('Status:', error.response.status);
                console.error('Headers:', error.response.headers);
            } else {
                console.error('Error message:', error.message);
            }
            alert('게시글 수정 중 오류가 발생했습니다.');
        }


        // const updatedPosts = posts.map((p) =>
        //     p.postId === post.postId
        //         ? { ...p, postTitle, postType: postType, link, postContent, files }
        //         : p
        // );

        // setPosts(updatedPosts);
        //navigate('/community/all');
    };
    return (
        <div className="total_wrapper">
            <div className='blank'>
                <div className='blank'>
                    <h2> Community</h2>
                </div>
            </div>
            <div className="write_community_container" style={{ height: "100vh" }}>
                <div className="write_community_wrapper">
                    <h1 className="write_community_title">게시글 수정</h1>
                    <form onSubmit={handleSubmit} id='postForm'>
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
                                name="postTitle"
                                type="text"
                                id="title"
                                value={postTitle}
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
                                    type="url"
                                    name="link"
                                    id="link"
                                    value={link}
                                    onChange={handleLinkChange}
                                    placeholder="🔗동영상 또는 사이트 링크 입력(필수x)"
                                    style={{ marginBottom: "20px" }}
                                />
                            </div>
                        </div>
                        <div className="write_community_section">
                            <label className="write_community_label" htmlFor="file">사진</label>
                            <div className="write_community_flex_container">
                                <input
                                    className="write_community_input"
                                    type="file"
                                    id="file2"
                                    name="postImg"
                                    // value={link}
                                    onChange={handleImageChange}
                                    multiple
                                />
                            </div>
                            <div className="image_previews">
                                {/* {preViews.map((url, index) => (
                                    <img key={index} src={url} alt={`Preview ${index + 1}`} className="image_preview" />
                                ))} */}
                                {/* {preViews ? (
                                    <>
                                        {preViews.map((url, index) => (
                                            <img key={index} src={`${API_BASE_URL}/resources/images/post/${url}`} alt={`Preview ${index + 1}`} className="image_preview" />
                                        ))}
                                    </>
                                ) : ''} */}
                                {(preViews || imageList) ? (
                                    <>
                                        {(preViews || imageList).map((url, index) => (
                                            <img key={index} src={preViews ? url : `${API_BASE_URL}/resources/images/post/${url}`} className="image_preview" />
                                        ))}
                                    </>
                                ) : null}
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
