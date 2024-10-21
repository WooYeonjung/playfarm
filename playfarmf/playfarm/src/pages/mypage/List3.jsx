import '../../styles/Mypages.css'
import { NavBarW } from "./Mypages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../service/context/AuthProvider';
import axios from 'axios';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import PagiNation from '../Pagination';
import { API_BASE_URL } from '../../service/app-config';

Modal.setAppElement('#root');

function List3() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  // const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const { isLoggedIn, loginInfo } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);
  const [storedGameData, setStoredGameData] = useState([]);

  // const today = new Date();
  // const day = `${today.getFullYear()} / ${today.getMonth() + 1} / ${today.getDate()}`;

  const fontEle = [
    <FontAwesomeIcon icon={faMagnifyingGlass} />,
    <FontAwesomeIcon icon={faXmark} size='2xl' />
  ];

  
  const fetchList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/mypage/mygamelist`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + loginInfo.token
        }
      });
      return response.data || [];
    }
    catch (err) {
      alert(err.response.data);
      return [];
    }
  }

  useEffect(() => {

    if (loginInfo) {
      fetchList().then(res => {
        setStoredGameData(res);
      })
    } else {
      setStoredGameData([]);
    }

  }, [isLoggedIn]);

  //console.log(storedGameData);

  const openModal = (game) => {

    setSelectedGame(game);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedGame(null);
  };

  const openModalPlay = (game) => {
    setSelectedGame(game);
    setSecondModalIsOpen(true);
  };

  const closeSecondModal = () => {
    setSecondModalIsOpen(false);
    setSelectedGame(null);
  };

  const handelPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(storedGameData.length / itemsPerPage);

  // const gameBox = storedGameData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  //   .map((item, i) => (
  //     <div key={i}>
  //       <div className={`game${i}`}
  //         style={{
  //           backgroundImage: `url(${API_BASE_URL}/resources/images/game/${item.titleImg})`
  //         }}>
  //         <div>
  //           <button onClick={() => openModal(item)}>{fontEle[0]}</button>
  //         </div>
  //       </div>
  //       <button onClick={() => openModalPlay(item)}>게임하러가기</button>
  //     </div>
  //   ));

  const gameBox = (storedGameData && storedGameData.length > 0)
    ? storedGameData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      .map((item, i) => (
        <div key={i}>
          <div className={`game${i}`}
            style={{
              backgroundImage: `url(${API_BASE_URL}/resources/images/game/${item.titleImg})`
            }}>
            <div>
              <button onClick={() => openModal(item)}>{fontEle[0]}</button>
            </div>
          </div>
          <button onClick={() => openModalPlay(item)}>게임하러가기</button>
        </div>
      ))
    : <div className="nodata" style={{ placeItems: 'center' }}>
      <p>게임 데이터가 존재하지 않습니다.</p>
    </div>;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.');
  };


  useEffect(() => {
    function handleResize() {
      const windowHeight = window.innerHeight;
      if (windowHeight < 920) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(9);
      }
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const startDownload = () => {
    setIsDownloading(true);
    setIsDownloadComplete(false);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setDownloadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setIsDownloading(false);
        setIsDownloadComplete(true);
      }
    }, 1000);
  };
  // console.log(selectedGame);
  return (
    <div className='myPageMain'>
      <NavBarW />
      <div className="userInfoBox">
        <h1>MY GAMES</h1>
        <div className='userInfo3'>
          {gameBox}
        </div>
      </div>
      <PagiNation currentPage={currentPage} totalPages={totalPages} onPageChange={handelPageChange} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Game Detail"
        className="Modal"
        overlayClassName="Overlay"

      >
        {selectedGame && (
          <div>
            <div className='gamePro'>
              <div><img src={`${API_BASE_URL}/resources/images/game/${selectedGame.titleImg}`} alt={selectedGame.gameTitle} style={{ width: '100%', height: '100%' }} /></div>
              <span>
                <button onClick={closeModal}>{fontEle[1]}</button>
                <h2>{selectedGame.gameTitle}</h2>
              </span>
            </div>
            <div className='gamePayUser'>

              <div style={{ fontWeight: 'bold', color: '#444' }}>Date of purchase </div>
              <p style={{ fontWeight: 'bold' }}>{formatDate(selectedGame.purchDate)}</p>
              <div style={{ fontWeight: 'bold', color: '#444' }}>User Ninkname </div>
              <p style={{ fontWeight: 'bold' }}>{loginInfo.nickname}</p>
              <div style={{ fontWeight: 'bold', color: '#444' }}>E-mail </div>
              <p style={{ fontWeight: 'bold' }}> {loginInfo.email}</p>
              <div style={{ fontWeight: 'bold', color: '#444' }}>Platform </div>
              <p style={{ fontWeight: 'bold' }}>
                {selectedGame.playtype === 'pc' ? 'PC' : selectedGame.playtype === 'nin' ? 'Nintendo' : 'Playstation'}</p>
              {/* <p>{selectedGame.playtype}</p> */}
            </div>
          </div>
        )}
      </Modal>
      <Modal
        isOpen={secondModalIsOpen}
        onRequestClose={closeSecondModal}
        contentLabel="Download Game"
        className="Modal1"
        overlayClassName="Overlay"
      >
        {selectedGame && (
          <div>
            <div className='gamePro'>
              <div><img src={`${API_BASE_URL}/resources/images/game/${selectedGame.titleImg}`} alt={selectedGame.gameTitle} style={{ width: '100%', height: '80%' }} /></div>
              <span>
                <button onClick={closeSecondModal} style={{ color: 'white' }}>{fontEle[1]}</button>
              </span>
            </div>

            <div className='downloadSection'>
              <div className='downloadInfo'>
                {isDownloading ? (
                  <div>
                    <p>다운로드 중... {downloadProgress}%</p>
                    <progress value={downloadProgress} max="100"></progress>
                  </div>
                ) : isDownloadComplete ? (
                  <div className='downloadCom'>
                    <p>다운로드 완료</p>
                    <button>START</button>
                  </div>
                ) : null}
              </div>
              {isDownloadComplete ? null : (
                <div className='downloadActions'>
                  <h3>{selectedGame.gameTitle}</h3>
                  {!isDownloading && (
                    <button onClick={startDownload}>다운로드 시작</button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default List3;
