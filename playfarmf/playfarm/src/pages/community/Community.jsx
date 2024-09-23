import React, { useState } from 'react';
import '../../styles/Community.css'
import CommunityList from './CommunityList';
import CommunityAdvertising from './CommunityAdvertising';
import NavbarCommu from './NavbarCommu';
import { useNavigate, useParams } from 'react-router-dom';

function Community() {

    const { commuNav } = useParams();

    // navbar_category(playtype)
    const [posttype, setPosttype] = useState(commuNav);
    const [tab, setTab] = useState({ selectTab: commuNav });
    const [currentPage, setCurrentPage] = useState(1);

    const postTypeOnclick = (postType) => {
        setPosttype(postType);
        setTab({ selectTab: postType });
        setSearch('');
        setCurrentPage(1);
    };

    const navigate = useNavigate();
    const onPostListClick = (post) => {
        navigate(`/community/detail/${post.postId}`);
        console.log(post.postId);
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
                />
                
                <CommunityAdvertising />
            </div>
        </div>
    );
}

export default Community;