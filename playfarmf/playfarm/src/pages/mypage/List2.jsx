// import '../../styles/Mypages.css';
// import { NavBarW } from "./Mypages";
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash } from '@fortawesome/free-solid-svg-icons';
// // import LikedBtn from './ItemLike';
// import PagiNation from '../Pagination';

// function List2() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(9);
//   const [likedGames, setLikedGames] = useState([]);

//   const fontEle = [
//     <FontAwesomeIcon icon={faTrash} size='2xl' />
//   ];

//   // 게임 데이터를 로컬 스토리지에서 가져오는 함수
//   const fetchGameData = () => {
//     const userData = JSON.parse(localStorage.getItem('userData'));

//     if (!userData || !userData.userid) {
//       return []; // 유저 ID가 없으면 빈 배열 반환
//     }

//     const userId = userData.userid;
//     const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
//     const userLikedGames = storedData[userId] || [];
//     return userLikedGames;
//   };

//   useEffect(() => {
//     setLikedGames(fetchGameData());
//   }, []);

//   const handelPageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   }

//   const handleRemoveGame = (gameId) => {
//     const userData = JSON.parse(localStorage.getItem('userData'));

//     if (!userData || !userData.userid) {
//       return; // 유저 ID가 없으면 아무것도 하지 않음
//     }

//     const userId = userData.userid;
//     const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
//     const userLikedGames = storedData[userId] || [];

//     // 해당 게임을 제거한 새로운 배열 생성
//     const updatedGames = userLikedGames.filter(game => game.id !== gameId);

//     // 업데이트된 배열을 로컬 스토리지에 다시 저장
//     storedData[userId] = updatedGames;
//     localStorage.setItem('likedGames', JSON.stringify(storedData));

//     // 상태 업데이트
//     setLikedGames(updatedGames);

//     if ((currentPage - 1) * itemsPerPage >= updatedGames.length) {
//       setCurrentPage(Math.max(1, Math.ceil(updatedGames.length / itemsPerPage)));
//     }
//   };

//   // 현재 페이지에 따라 보여질 게임 목록
//   const gameBox = likedGames
//     .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
//     .map((item, i) => {
//       return (
//         <div className={`game${i}`} style={{ backgroundImage: `url(${item.src_title})` }} key={item.id}>
//           <Link to={`/store/detail/${item.id}`}>
//             <p>{item.title}</p>
//           </Link>
//           <button onClick={() => handleRemoveGame(item.id)} className="remove-btn">
//             {fontEle}
//           </button>
//         </div>
//       );
//     });

//   // 전체 페이지 수 계산
//   const totalPages = Math.ceil(likedGames.length / itemsPerPage);

//   return (
//     <div className='myPageMain'>
//       <NavBarW />
//       <div className="userInfoBox">
//         <h1>Wish List</h1>
//         <div className='userInfo2'>
//           {gameBox}
//         </div>
//         {/* {Array.from({ length: totalPages }, (_, i) => ( */}
//         {/* // ))} */}
//       </div>
//       <PagiNation currentPage={currentPage} totalPages={totalPages} onPageChange={handelPageChange} />
//     </div>
//   );
// }

// export default List2;
import '../../styles/Mypages.css';
import { NavBarW } from "./Mypages";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
// import LikedBtn from './ItemLike';
import PagiNation from '../Pagination';


function List2() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [likedGames, setLikedGames] = useState([]);

  const fontEle = [
    <FontAwesomeIcon icon={faTrash} size='2xl' />
  ];

  // 게임 데이터를 로컬 스토리지에서 가져오는 함수
  const fetchGameData = () => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData || !userData.userid) {
      return []; // 유저 ID가 없으면 빈 배열 반환
    }

    const userId = userData.userid;
    const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
    const userLikedGames = storedData[userId] || [];
    return userLikedGames;
  };

  useEffect(() => {
    setLikedGames(fetchGameData());
  }, []);

  const handelPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handleRemoveGame = (gameId) => {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData || !userData.userid) {
      return; // 유저 ID가 없으면 아무것도 하지 않음
    }

    const userId = userData.userid;
    const storedData = JSON.parse(localStorage.getItem('likedGames')) || {};
    const userLikedGames = storedData[userId] || [];

    // 해당 게임을 제거한 새로운 배열 생성
    const updatedGames = userLikedGames.filter(game => game.id !== gameId);

    // 업데이트된 배열을 로컬 스토리지에 다시 저장
    storedData[userId] = updatedGames;
    localStorage.setItem('likedGames', JSON.stringify(storedData));

    // 상태 업데이트
    setLikedGames(updatedGames);

    if ((currentPage - 1) * itemsPerPage >= updatedGames.length) {
      setCurrentPage(Math.max(1, Math.ceil(updatedGames.length / itemsPerPage)));
    }
  };

  // 현재 페이지에 따라 보여질 게임 목록
  const gameBox = likedGames
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((item, i) => {
      return (
        <div className={`game${i}`} style={{ backgroundImage: `url(${item.src_title})` }} key={item.id}>
          <Link to={`/store/detail/${item.id}`}>
            <p>{item.title}</p>
          </Link>
          <button onClick={() => handleRemoveGame(item.id)} className="remove-btn">
            {fontEle}
          </button>
        </div>
      );
    });

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(likedGames.length / itemsPerPage);

  return (
    <div className='myPageMain'>
      <NavBarW />
      <div className="userInfoBox">
        <h1>Wish List</h1>
        <div className='userInfo2'>
          {gameBox}
        </div>
        {/* {Array.from({ length: totalPages }, (_, i) => ( */}
        {/* // ))} */}
      </div>
      <PagiNation currentPage={currentPage} totalPages={totalPages} onPageChange={handelPageChange} />
    </div>
  );
}

export default List2;
