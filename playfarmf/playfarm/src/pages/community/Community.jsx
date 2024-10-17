import React, { useEffect, useState } from 'react';
import '../../styles/Community.css'
import CommunityList from './CommunityList';
import CommunityAdvertising from './CommunityAdvertising';
import NavbarCommu from './NavbarCommu';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../service/context/AuthProvider';

function Community() {

    const { commuNav } = useParams();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const fetchPostData = async () => {
            await axios.get('/community/postlist')
                .then(response => {
                    console.log(response)

                    setPostData(response.data);
                })
                .catch(error => console.error('코드데이터를 찾지 못했습니다', error)
                )
        };
        fetchPostData();
    }, [])
    console.log(postData)

    // navbar_category(playtype)
    const [posttype, setPosttype] = useState(commuNav);
    const [tab, setTab] = useState({ selectTab: commuNav });
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoggedIn } = useAuth();

    const postTypeOnclick = (postType) => {
        setPosttype(postType);
        setTab({ selectTab: postType });
        setSearch('');
        setCurrentPage(1);
    };

    const navigate = useNavigate();
    const onPostListClick = (post) => {
        if (!isLoggedIn) {
            alert("로그인 후 이용 가능합니다.");
            return navigate(`/community/all`);
        } else {
            navigate(`/community/detail/${post.postId}`);
        }
    };

    // search bar
    const [search, setSearch] = useState('');

    const handleSearchChange = (term) => {
        setSearch(term);
    };

    return (
        <div>
            {/* 데이터 다 받아오면 tab visiblecss 수정필요! */}
            <NavbarCommu tab={tab} postTypeOnclick={postTypeOnclick} setSearch={setSearch} />
            <div className='commu_detail_container'>
                <CommunityList
                    posttype={posttype}
                    onPostListClick={onPostListClick}
                    search={search}
                    onSearchChange={handleSearchChange}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    postData={postData}
                />

                <CommunityAdvertising />
            </div>
        </div>
    );
}

export default Community;