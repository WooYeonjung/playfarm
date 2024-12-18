import { useParams } from "react-router-dom";
import '../../styles/CommunityDetail.css';
import CommunityAdvertising from "./CommunityAdvertising";
import CommentSection from "./CommentSection";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '../../service/context/AuthProvider';
import { API_BASE_URL } from "../../service/app-config";

export default function CommunityDetail() {
    // const userposts = JSON.parse(localStorage.getItem("postsJSON"));
    const [postData, setPostData] = useState({});
    const { postId } = useParams();
    const [comments, setComments] = useState([]);
    const { isLoggedIn, loginInfo, onLogout } = useAuth();
    // const item = userposts.find((item) => item.postId === parseInt(postId));
    console.log(loginInfo);

    useEffect(() => {
        window.scrollTo({
            top: 0
        })
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/community/postdetail/${postId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loginInfo.token,
                    }
                });
                //  console.log("Response Data:", response.data);
                setPostData(response.data);
            } catch (err) {
                // console.error('게시물 데이터를 찾지 못했습니다', err);
            }
        };

        fetchPostData();
    }, [postId]);
    useEffect(() => {

        const fetchReplies = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/community/replies/${postId}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loginInfo.token,
                    }
                });
                setComments(response.data);
            } catch (error) {
                console.error('댓글을 불러오는 중 오류가 발생했습니다.', error);
            }
        };

        fetchReplies();
    }, []);
    console.log(comments)
    // const formatUserId = (userId) => {
    //     if (!userId) return '';
    //     if (userId.length <= 3) {
    //         return userId;
    //     }
    //     return `${userId.slice(0, 3)}****`;
    // }
    const formatDate = (date) => {
        const now = new Date();
        const postTime = new Date(date);
        const betweenTime = Math.floor(
            (now.getTime() - postTime.getTime()) / 1000 / 60
        );

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
        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }

    return (
        <div>
            <div className="detail_nav_area">
                <h1>Community</h1>
            </div>
            <div className="commu_detail_main_container">
                <div className="commu_detail_main">
                    <div className="commu_detail_title">
                        {postData.postTitle}
                    </div>
                    <div className="commu_detail_addinfo">
                        <div>
                            <span>{postData.postType}</span>
                            <span>{formatDate(postData.regDate)}</span>
                            <span>{postData.nickname}</span>
                        </div>
                        <div>
                            <span>조회수 {postData.views}</span>
                        </div>
                    </div>
                    <hr />
                    {postData.images && postData.images.length > 0 && postData.images.map(img => (
                        img.originName ? (
                            <img style={{ width: "300px", height: "300px" }}
                                src={`${API_BASE_URL}/resources/images/post/${img.afterName}`}
                                alt={img.originName}
                                key={img.imageId} />
                        ) : null
                    ))}
                    {postData.link && <a href={postData.link} target="_blank" rel="noopener noreferrer">{postData.link}</a>}
                    {/* {postData.} */}
                    <div className="commu_detail_content">
                        {postData.postContent}
                    </div>
                    <CommentSection postId={postId} comments={comments} setComments={setComments} />
                </div>
                <CommunityAdvertising />
            </div>
        </div>
    );
}