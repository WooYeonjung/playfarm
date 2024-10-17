import '../../styles/CommunityList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faMagnifyingGlass, faHandshake, faCircleQuestion, faPalette } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-regular-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination';
import { useAuth } from '../../service/context/AuthProvider';

const CommuListItem = ({ title, date, userName, type, reply }) => {

    const formatDate = (date) => {
        if (!date) return '';
        const now = new Date();
        // console.log('작성시간: ' + date)
        const postTime = new Date(date);
        // console.log('현재: '+now)
        // console.log('작정시간 넣은값: '+postTime)

        const betweenTime = Math.floor(
            (now.getTime() - postTime.getTime()) / 1000 / 60
        );
        // console.log('시간차이계산: '+betweenTime)
        if (betweenTime < 1) return "방금전";
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay < 365) {
            return `${betweenTimeDay}일전`;
        }
        // console.log(`${Math.floor(betweenTimeDay / 365)}년전`)
        return `${Math.floor(betweenTimeDay / 365)}년전`;
        // if (differenceInMinutes < 60) {
        //     return `${differenceInMinutes} 분 전`;
        // } else {
        //     const differenceInHours = Math.floor(differenceInMinutes / 60);
        //     return `${differenceInHours} 시간 전`
        // }
    }

    return (
        <div className='commu_item_container'>
            {type === 'free' && <FontAwesomeIcon className='cmItem_icon' icon={faComments} />}
            {type === 'find' && <FontAwesomeIcon className='cmItem_icon' icon={faHandshake} />}
            {type === 'fanart' && <FontAwesomeIcon className='cmItem_icon' icon={faPalette} />}
            {type === 'question' && <FontAwesomeIcon className='cmItem_icon' icon={faCircleQuestion} />}

            <div className='cmItem_title'>{title}</div>
            <div className='cmItem_date'>{formatDate(date)}</div>
            <div className='cmItem_userId'>{userName}</div>
            <div className='cmItem_view'><FontAwesomeIcon icon={faMessage} /> {reply}</div>
        </div>
    );
}

function CommunityList({ posttype, onPostListClick, search, onSearchChange, currentPage, setCurrentPage, postData }) {
    
    // const [search, setSearch] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    // const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // 페이지당 아이템 수
    const navigate = useNavigate();


    const { isLoggedIn, loginInfo, onLogout } = useAuth();
    
    // CommunityWrite 이동
    const onWriteClick = () => {
        if (!isLoggedIn || !loginInfo || !loginInfo.userId) {
            let loginConfirm = window.confirm('로그인 후 이용 가능. 로그인 하시겠습니까?');
            if (loginConfirm) {
                navigate('/login');
            }
            return; // 로그인 페이지로 이동하는 경우 함수 종료
        } else {
            navigate('/community/write');
        }
        // navigate('/community/write');
        console.log(sessionStorage.getItem("loginInfo"));
    };

    useEffect(() => {
        console.log("isLoggedIn: ", isLoggedIn);
        console.log("loginInfo: ", loginInfo);
    }, [isLoggedIn, loginInfo]);
    // useEffect(() => {
    //     if (userInfo && userInfo.userid) {
    //         setLoginUserId(userInfo.userid);
    //     }
    // }, [userInfo]);

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleSearch = () => {
        // const filtered = userposts.filter(post => 
        //     post.title && post.title.toLowerCase().includes(search.toLowerCase())
        // );
        onSearchChange(searchTerm);
        // setSearch(searchTerm);
    }
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const commuFilteredposts = () => {
        let filteredPosts = postData;
        // navbar
        if (posttype !== 'all') {
            filteredPosts = filteredPosts.filter((item) => item.postType && item.postType.includes(posttype));
        }
        if (search !== '') {
            filteredPosts = filteredPosts.filter((item) => item.postTitle && item.postTitle.toLowerCase().includes(search.toLowerCase()));
        }
        // 게시물을 날짜 기준으로 정렬 (최신 순)
        filteredPosts.sort((a, b) => new Date(b.regDate) - new Date(a.regDate));
        return filteredPosts;
    }

    const filteredCommuList = commuFilteredposts();
    const totalPages = Math.ceil(filteredCommuList.length / itemsPerPage);

    // 현재 페이지에 해당하는 게시글 목록을 가져오는 함수
    const getCurrentPagePosts = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredCommuList.slice(startIndex, endIndex);
    };

    useEffect(() => {
        setSearchTerm(search);
    }, [search]);

    return (
        <div className='commuList_container'>
            <div className='commuList_wrapper'>
                <section className='commuList_top'>
                    <div className='write_Btn_container'>
                        <button className='write_Btn' onClick={onWriteClick}>글쓰기</button>
                        {isLoggedIn && <Link to='/community/posts' >
                            <button className='write_Btn'>내가 쓴 글보기</button>
                        </Link>}
                    </div>
                    <div className='commu_search_box'>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleChange}
                            onKeyPress={handleKeyPress}
                        />
                        <FontAwesomeIcon
                            className='commu_search_icon'
                            onClick={handleSearch}
                            icon={faMagnifyingGlass}
                        />
                    </div>
                </section>
                <section>
                    {filteredCommuList.length === 0 ? (
                        <p className="no_posts_message">검색 조건에 맞는 게시글이 없습니다.</p>
                    ) : (getCurrentPagePosts().map((post, idx) => {
                        return (
                            <div className='commuItem_container' key={idx} onClick={() => { onPostListClick(post) }}>
                                <CommuListItem
                                    userName={post.user.nickname}
                                    title={post.postTitle}
                                    // content={post.postContent}
                                    type={post.postType}
                                    date={post.regDate}
                                    reply={post.replyCnt}
                                />
                            </div>
                        )
                    })
                    )}
                    {/* {
                        getCurrentPagePosts().map((post, idx) => {
                            return (
                                <div className='commuItem_container' key={idx} onClick={() => { onPostListClick(post) }}>
                                    <CommuListItem
                                        userId={post.userId}
                                        title={post.title}
                                        content={post.content}
                                        type={post.postType}
                                        date={post.date}
                                    />
                                </div>
                            )
                        })
                    } */}
                </section>
            </div>
            <div className='commu_list_pagination'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)} />
            </div>
        </div>
    );
}

export default CommunityList;