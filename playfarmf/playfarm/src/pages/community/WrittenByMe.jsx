

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faCircleQuestion, faComments, faHandshake, faMagnifyingGlass, faPalette, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import '../../styles/WrittenByMe.css';
import CommunityAdvertising from "./CommunityAdvertising";

const WrittenByMe = () => {
    const [posts, setPosts] = useState([]); // 모든 게시글을 저장하는 상태
    const [postsList, setPostsList] = useState([]); // 필터된 게시글을 저장하는 상태
    const [loginUserId, setLoginUserId] = useState(''); // 로그인된 사용자의 ID를 저장하는 상태
    const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장하는 상태
    const [filteredPostsList, setFilteredPostsList] = useState([]); // 검색된 게시글을 저장하는 상태
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호를 저장하는 상태

    const postsPerPage = 9; // 한 페이지에 표시할 게시글 수
    const userInfo = JSON.parse(localStorage.getItem("userData")); // 로컬 스토리지에서 사용자 정보 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 네비게이트 함수

    useEffect(() => {
        if (userInfo && userInfo.userid) {
            setLoginUserId(userInfo.userid); // 사용자 정보가 있으면 로그인된 사용자 ID 설정
        }

        const savedPosts = JSON.parse(localStorage.getItem('postsJSON')) || []; // 로컬 스토리지에서 게시글 데이터 가져오기

        setPosts(savedPosts); // 모든 게시글 상태 설정

        const filterById = savedPosts.filter((post) => post.userId === loginUserId); // 로그인된 사용자가 작성한 게시글 필터링
        // 최신 게시글이 맨 위에 오도록 정렬
        const sortDate = filterById.sort((a, b) => new Date(b.date) - new Date(a.date));
        setPostsList(sortDate); // 필터된 게시글 상태 설정
        setFilteredPostsList(sortDate); // 검색된 게시글 상태 초기 설정
    }, [loginUserId]); // loginUserId가 변경될 때마다 useEffect 실행

    // 게시글 삭제 핸들러
    const handleDelete = (postId) => {
        let confirm = window.confirm("삭제 하시겠습니까?");
        if (confirm) {
            const updatedPosts = posts.filter(post => post.postId !== postId); // 특정 게시글 ID를 가진 게시글 삭제
            setPosts(updatedPosts); // 상태 업데이트
            localStorage.setItem('postsJSON', JSON.stringify(updatedPosts)); // 로컬 스토리지 업데이트

            const updatedPostsList = updatedPosts.filter((post) => post.userId === loginUserId); // 로그인된 사용자의 게시글 다시 필터링
            setPostsList(updatedPostsList); // 필터된 게시글 상태 업데이트
            setFilteredPostsList(updatedPostsList); // 검색된 게시글 상태 업데이트
        }
    };

    // 게시글 수정 핸들러
    const handleEdit = (post) => {
        navigate('/community/editCommunity', { state: { post } }); // 게시글 수정 페이지로 이동
    };

    // 게시글 타입에 따른 아이콘 반환 함수
    function icon(postType) {
        switch (postType) {
            case 'find': return (<FontAwesomeIcon icon={faHandshake} />);
            case 'free': return (<FontAwesomeIcon icon={faComments} />);
            case 'question': return (<FontAwesomeIcon icon={faCircleQuestion} />);
            case 'fanArt': return (<FontAwesomeIcon icon={faPalette} />);
            default: return null;
        }
    }

    // 검색어 입력 핸들러
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // 검색 실행 핸들러
    const handleSearch = () => {
        const filtered = postsList.filter(post =>
            post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPostsList(filtered);
        setCurrentPage(1); // 검색할 때 첫 페이지로 이동
    };

    // 엔터 키 입력 핸들러
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    // 현재 페이지에 표시할 게시글 계산
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPostsList.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // 페이지 번호 계산
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredPostsList.length / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="post_list_container">
            <section className="post_list_top">
                <div className="post_list_title">
                    <h1>Community</h1>
                </div>

            </section>
            <div className="post_list_wrapper">
                <div className="post_list">
                    <div className="post_list_subTitle">
                        <h2>내가 쓴 글</h2>

                        <div className='postList_search_box'>
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                onKeyDown={handleKeyPress}
                            />
                            <FontAwesomeIcon
                                className='postList_search_icon'
                                onClick={handleSearch}
                                icon={faMagnifyingGlass}
                            />
                        </div>
                    </div>
                    {currentPosts.length === 0 ? (
                        <p>작성한 글이 없습니다.</p>
                    ) : (
                        <ul>
                            {currentPosts.map((post, index) => (
                                <li key={post.postId} className="post_list_item">
                                    <div className="post_list_item1">
                                        <p>{filteredPostsList.length - (indexOfFirstPost + index)}</p> {/* 게시글 번호 */}
                                        <h3>{icon(post.postType)}</h3> {/* 게시글 타입에 따른 아이콘 */}
                                        <p>{post.title}</p> {/* 게시글 제목 */}
                                        {post.link && (
                                            <a href={post.link} target="_blank" rel="noopener noreferrer">
                                                {post.link}
                                            </a>
                                        )}
                                        <small>{post.date.slice(0, 10)}</small> {/* 게시글 작성 날짜 */}
                                        <div className="post_list_item_actions">
                                            <FontAwesomeIcon icon={faEdit} className="post_list_icon" size="xl" onClick={() => handleEdit(post)} />
                                            <FontAwesomeIcon icon={faTrash} className="post_list_icon" size="xl" onClick={() => handleDelete(post.postId)} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="community_advertise" >
                    <CommunityAdvertising />
                </div>
            </div>
            <div className="post_list_bottom">
                <div className="pagination">
                    {pageNumbers.map(number => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={number === currentPage ? 'active' : ''}>
                            {number}
                        </button>
                    ))}
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default WrittenByMe;

