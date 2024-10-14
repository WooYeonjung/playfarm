import React, { useState, useEffect } from 'react';
import { useAuth } from '../../service/context/AuthProvider';
import axios from 'axios';

const useLikedGames = () => {
  const { isLoggedIn, loginInfo, onLogout } = useAuth();
  const userId = loginInfo.userId;
  const [likedGames, setLikedGames] = useState([]);
  // const [likedGames, setLikedGames] = useState(() => {
  //   const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
  //   return storedData[userId] || [];
  // });

  // useEffect(async () => {
  //   await axios.get('/mypage/wishlist', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       "Authorization": 'Bearer ' + loginInfo.token
  //     }
  //   }).then(res => {
  //     setLikedGames(res.data);
  //   }).catch(err => {
  //     alert(err.response.data);
  //   })





  //   // const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
  //   // const userLikedGames = storedData[userId] || [];
  //   // setLikedGames(userLikedGames);
  // }, [userId]);

  const fetchGameData = async () => {

    try {
      const response = await axios.get('/mypage/wishlist', {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + loginInfo.token
        }
      });
      if (!response) {

        return []; // 유저 ID가 없으면 빈 배열 반환
      } else {
        return response.data
      }
    } catch (err) {
      alert("위시리스트를 불러오는 것에 실패하였습니다.");
      //navigator("/");
    }

  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchGameData().then(res => {
        setLikedGames(res);
      })
    } else {
      setLikedGames([]);
    }
  }, [isLoggedIn]);


  const fetchAddWish = async (item, token) => {

    console.log(item.gameId);
    console.log(token);
    await axios.post('http://localhost:8080/mypage/addwish', { gameId: item.gameId }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
    }).then(res => {
      alert(res.data);
    }).catch(err => {
      alert(err.response.data);
    })
  }



  const handleLikeBtn = async (item) => {
    let isLiked = ''
    if (likedGames.length > 0) {
      isLiked = likedGames.some(likedItem => likedItem.gameId === item.gameId);
    }
    //const isLiked = likedGames.some(likedItem => likedItem.gameId === item.gameId);
    const token = loginInfo.token
    if (isLiked) {
      try {
        const response = await axios.delete(`/mypage/deletewish`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + loginInfo.token
          },
          data: { gameId: item.gameId }
        });
        alert(response.data);
        // window.location.reload();

      } catch (err) {
        alert("게임 삭제중 문제가 발생하였습니다.")
      }

    } else {
      fetchAddWish(item, token);
    }

    setLikedGames((prevLikedGames) => {
      prevLikedGames = prevLikedGames || [];
      const updatedLikedGames = prevLikedGames.some(likedItem => likedItem.gameId === item.gameId)
        ? prevLikedGames.filter(likedItem => likedItem.id !== item.id)
        : [...prevLikedGames, item];

      //console.log(prevLikedGames);
      return updatedLikedGames;
    });
  };

  return [likedGames, handleLikeBtn];
};

export default useLikedGames;
