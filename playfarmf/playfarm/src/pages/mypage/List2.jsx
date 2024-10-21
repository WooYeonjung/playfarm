import '../../styles/Mypages.css';
import { NavBarW } from "./Mypages";
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareMinus, faTrash, faTrashCan } from '@fortawesome/free-solid-svg-icons';
// import LikedBtn from './ItemLike';
import PagiNation from '../Pagination';
import axios from 'axios';
import { useAuth } from '../../service/context/AuthProvider';
import { API_BASE_URL } from '../../service/app-config';

function List2() {
  const navigator = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [likedGames, setLikedGames] = useState([]);
  const { isLoggedIn, loginInfo, onLogout } = useAuth();
  const fontEle = [
    <FontAwesomeIcon icon={faTrashCan} size='2xl' />
  ];

  // 게임 데이터를 로컬 스토리지에서 가져오는 함수
  const fetchGameData = async () => {

    try {
      const response = await axios.get(`${API_BASE_URL}/mypage/wishlist`, {
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
      // navigator("/");
    }


    // if (!response) {

    //   return []; // 유저 ID가 없으면 빈 배열 반환
    // }

    // const userId = userData.userid;
    // const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
    // const userLikedGames = storedData[loginInfo.userId] || [];
    // return userLikedGames;
  };

  useEffect(() => {


    if (loginInfo) {
      fetchGameData().then(res => {
        setLikedGames(res);
      })

    } else {
      setLikedGames([]);
    }
  }, [isLoggedIn]);

  const handelPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleRemoveGame = async (gameId) => {
    // const userData = JSON.parse(localStorage.getItem('userData'));

    // if (!userData || !userData.userid) {
    //   return; // 유저 ID가 없으면 아무것도 하지 않음
    // }

    // const userId = userData.userid;
    // const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
    // const userLikedGames = storedData[userId] || [];

    try {
      const response = await axios.delete(`${API_BASE_URL}/mypage/deletewish`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + loginInfo.token
        },
        data: { gameId }
      });
      alert(response.data);
      window.location.reload();

    } catch (err) {
      alert("게임 삭제 중 문제가 발생하였습니다.")
    }
  };

  function clickImg(gameId) {
    navigator(`/store/detail/${gameId}`);
  }

  // 현재 페이지에 따라 보여질 게임 목록
  const gameBox = (likedGames && likedGames.length > 0) ? likedGames
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((item, i) => {
      return (

        <div key={i} className='gameDiv'>
          <div onClick={() => { clickImg(item.gameId) }} className={`game${i}`} style={{ backgroundImage: `url(${API_BASE_URL}/resources/images/game/${item.titleImg})` }}>

          </div>
          <button onClick={() => handleRemoveGame(item.gameId)} className="remove-btn">
            {fontEle}
          </button>
        </div>

      );
    }) :
    <div className="nodata">
      <p>위시리스트가 존재하지 않습니다.</p>
    </div>;

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(likedGames.length / itemsPerPage);

  return (
    <div className='myPageMain'>
      <NavBarW />
      <div className="userInfoBox ">
        <h1>Wish List</h1>
        <div className='userInfo2'>
          {gameBox}
        </div>
      </div>
      <PagiNation currentPage={currentPage} totalPages={totalPages} onPageChange={handelPageChange} />
    </div>
  );
}

export default List2;
