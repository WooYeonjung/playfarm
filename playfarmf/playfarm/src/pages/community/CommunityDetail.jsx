import { useParams } from "react-router-dom";
import '../../styles/CommunityDetail.css';
import CommunityAdvertising from "./CommunityAdvertising";
import CommentSection from "./CommentSection";
import { useEffect } from "react";

export default function CommunityDetail() {
    const userposts = JSON.parse(localStorage.getItem("postsJSON"));
    const { postId } = useParams();
    const item = userposts.find((item) => item.postId === parseInt(postId));

    const formatUserId = (userId) => {
        if (!userId) return '';
        if (userId.length <= 3) {
            return userId;
        }
        return `${userId.slice(0, 3)}****`;
    }
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

    useEffect(() => {
        window.scrollTo({
            top: 0
        })
    }, []);

    return (
        <div>
            <div className="detail_nav_area">
                <h1>Community</h1>
            </div>
            <div className="commu_detail_main_container">
                <div className="commu_detail_main">
                    <div className="commu_detail_title">
                        {item.title}
                    </div>
                    <div className="commu_detail_addinfo">
                        <span>{item.postType}</span>
                        <span>{formatDate(item.date)}</span>
                        <span>{formatUserId(item.userId)}</span>
                    </div>
                    <hr />
                    <div className="commu_detail_content">
                        {item.content}
                    </div>
                    <CommentSection postId={item.postId} />
                </div>
                <CommunityAdvertising />
            </div>
        </div>
    );
}