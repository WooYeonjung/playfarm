import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import useLikedGames from './ItemLikeLogic'; // 훅의 경로를 확인하세요

const LikedBtn = ({ item }) => {
  const [likedGames, handleLikeBtn] = useLikedGames();
  const isLiked = likedGames.some(likedItem => likedItem.id === item.id);

  return (
    // <div className="like-container">
    <button className="like-button" onClick={() => handleLikeBtn(item)}>
      <FontAwesomeIcon
        icon={isLiked ? solidHeart : regularHeart}
        size="2x"
        style={{ color: isLiked ? "#ff7a7a" : "#ff7a7a" }}
      />
    </button>
    // </div>
  );
};

export default LikedBtn;
