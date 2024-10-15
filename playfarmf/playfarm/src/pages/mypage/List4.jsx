import '../../styles/Mypages.css'
import { NavBarW } from "./Mypages";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faReceipt } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../service/context/AuthProvider';
import axios from 'axios';
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import PagiNation from '../Pagination';
import { API_BASE_URL } from '../../service/app-config';
import { faMessage } from '@fortawesome/free-regular-svg-icons';

Modal.setAppElement('#root');

function List4() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [details, setDetails] = useState(null);
  // const [selectedListDate, setSelectedListDate] = useState('');
  const { isLoggedIn, loginInfo } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [storedGameData, setStoredGameData] = useState([]);

  const today = new Date();
  const day = `${today.getFullYear()} / ${today.getMonth() + 1} / ${today.getDate()}`;

  const fontEle = [
    <FontAwesomeIcon icon={faMagnifyingGlass} />,
    <FontAwesomeIcon icon={faXmark} size='2xl' />
  ];

  // useEffect(() => {
  //   const storageUser = localStorage.getItem('userData');
  //   if (storageUser) {
  //     const user = JSON.parse(storageUser);
  //     setUsername(user.name);
  //     setEmail(user.email);
  //   }
  // }, []);

  // const storedGameData = JSON.parse(localStorage.getItem('pay')) || [];
  // const userPayData = JSON.parse(localStorage.getItem('userData'));

  // let storedGameData = [];
  let userPayData = JSON.parse(localStorage.getItem('userData'));
  const fetchList = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/mypage/purchaselist`, {
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + loginInfo.token
        }
      });
      return response.data;
    }
    catch (err) {
      alert('구매리스트를 불러오는 것에 실패하였습니다.');
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


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let formatDate2 = new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.');
    // if (formatDate2.endsWith('-')) {
    //   formatDate2 = formatDate2.slice(0, -1);
    // }
    return formatDate2;
  };
  const fetchDetail = async (purchaseId) => {
    // alert(purchaseId)
    try {
      const response = await axios.get(`${API_BASE_URL}/mypage/purchasedetail`, {

        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer ' + loginInfo.token
        },
        params: {
          purchId: +purchaseId
        }
      });
      return response.data;
    }
    catch (err) {
      alert(err.response.data);
      return [];
    }
  }
  const openModal = async (game) => {
    const detailList = await fetchDetail(game.purchId);
    setDetails(detailList);
    setSelectedList({
      purchDate: game.purchDate,
      totalPrice: game.formattedTotalPrice
    });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedList([]);
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
          <div className={`list${i}`}>
            <div>
              <div>
                <h2><FontAwesomeIcon icon={faReceipt} size='2xl' /></h2>
              </div>
              <div className='listOfList'>
                <div>
                  <ul>
                    <li>
                      Purchase Date
                    </li>
                    <li>
                      PayMethod
                    </li>
                    <li>Total Price</li>
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>
                      {formatDate(item.purchDate)}
                    </li>
                    <li> {item.codeInfo}</li>
                    <li> ￦ {item.formattedTotalPrice}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div>
              <button onClick={() => openModal(item)}>{fontEle[0]}</button>
            </div>
          </div>
        </div>
      ))
    : <div className="nodata" style={{ placeItems: 'center' }}>
      <p>구매 데이터가 존재하지 않습니다.</p>
    </div>;





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

  return (
    <div className='myPageMain'>
      <NavBarW />
      <div className="userInfoBox">
        <h1>Purchase History</h1>
        <div className='userInfo4'>
          {gameBox}
        </div>
      </div>
      <PagiNation currentPage={currentPage} totalPages={totalPages} onPageChange={handelPageChange} />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Purchase Detail"
        className="Modal2"
        overlayClassName="Overlay"
      >
        {details &&
          <div>
            <div className='gamePro'>
              <div>
                <h1>Purchase Detail</h1>
              </div>
              <span>
                <button onClick={closeModal}>{fontEle[1]}</button>
                {/* <h2>{selectedGame.gameTitle}</h2> */}
              </span>
            </div>
            <div className='payContent'>
              <div className='payDate'>
                <div>{selectedList.purchDate}</div>
              </div>
              <div className='payContentListTitle'>
                <p>Game</p><p>Platform</p><p>price</p>
              </div>
              <div className='payDetails'>
                {details.map((item, i) => (
                  <div className='payDetailList' key={i}>
                    <p class="payDetailListTitle">{item.gameTitle}</p>{item.playtype === 'nin' && <img className="playtypeImg" src={`${API_BASE_URL}/resources/images/logo/service_nintendo_logo.jpg`}></img>}
                    {item.playtype === 'ps' && <img className="playtypeImg" src={`${API_BASE_URL}/resources/images/logo/service_playstation_logo.jpg`}></img>}
                    {item.playtype === 'pc' && <img className="playtypeImg" src={`${API_BASE_URL}/resources/images/logo/service_pc_logo.jpg`}></img>}<p>{item.formattedEachPrice}</p>
                  </div>
                ))}
              </div>
              <div className='payTotalPrice'>
                <p className='payTotalPriceTotal'>
                  Total
                </p>
                <p></p>
                <p>￦ {selectedList.totalPrice}</p>
              </div>

            </div>
          </div>
        }
      </Modal>
    </div>
  )
}

export default List4;
