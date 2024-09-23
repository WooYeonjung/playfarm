import React, { useState, useEffect } from 'react';

const useLikedGames = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userId = userData.userid;

  const [likedGames, setLikedGames] = useState(() => {
    const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
    return storedData[userId] || [];
  });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
    const userLikedGames = storedData[userId] || [];
    setLikedGames(userLikedGames);
  }, [userId]);

  const handleLikeBtn = (item) => {
    setLikedGames((prevLikedGames) => {
      const updatedLikedGames = prevLikedGames.some(likedItem => likedItem.id === item.id)
        ? prevLikedGames.filter(likedItem => likedItem.id !== item.id)
        : [...prevLikedGames, item];

      const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
      storedData[userId] = updatedLikedGames;
      localStorage.setItem('likedGames', JSON.stringify(storedData)); // 로컬 스토리지에 전체 데이터 저장
      return updatedLikedGames;
    });
  };

  return [likedGames, handleLikeBtn];
};

export default useLikedGames;
