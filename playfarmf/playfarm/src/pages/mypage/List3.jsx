import '../../styles/Mypages.css'
import { NavBarW } from "./Mypages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import PagiNation from '../Pagination';

Modal.setAppElement('#root');

function List3() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [secondModalIsOpen, setSecondModalIsOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloadComplete, setIsDownloadComplete] = useState(false);

  const today = new Date();
  const day = `${today.getFullYear()} / ${today.getMonth() + 1} / ${today.getDate()}`;

  const fontEle = [
    <FontAwesomeIcon icon={faMagnifyingGlass} />,
    <FontAwesomeIcon icon={faXmark} size='2xl' />
  ];

  useEffect(() => {
    const storageUser = localStorage.getItem('userData');
    if (storageUser) {
      const user = JSON.parse(storageUser);
      setUsername(user.name);
      setEmail(user.email);
    }
  }, []);

  const storedGameData = JSON.parse(localStorage.getItem('pay')) || [];
  const userPayData = JSON.parse(localStorage.getItem('userData'));

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

  const gameBox = storedGameData
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    .map((item, i) => (
      <div key={i}>
        <div className={`game${i}`}
          style={{
            backgroundImage: `url(${item.src})`
          }}>
          <div>
            <button onClick={() => openModal(item)}>{fontEle[0]}</button>
          </div>
        </div>
        <button onClick={() => openModalPlay(item)}>게임하러가기</button>
      </div>
    ));

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
              <div><img src={selectedGame.src} alt={selectedGame.title} style={{ width: '100%', height: '100%' }} /></div>
              <span>
                <button onClick={closeModal}>{fontEle[1]}</button>
                <h2>{selectedGame.title}</h2>
              </span>
            </div>
            <div className='gamePayUser'>
              <div>Price </div>
              <p>{selectedGame.price} 원</p>
              <div>Date of purchase </div>
              <p>{day}</p>
              <div>User Name </div>
              <p>{userPayData.name}</p>
              <div>E-mail </div>
              <p>{userPayData.email}</p>
              <div>Platform </div>
              <p>{selectedGame.playtype}</p>
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
              <div><img src={selectedGame.src} alt={selectedGame.title} style={{ width: '100%', height: '100%' }} /></div>
              <span>
                <button onClick={closeSecondModal}>{fontEle[1]}</button>
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
                  <h3>{selectedGame.title}</h3>
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
