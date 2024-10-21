
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import HomeMainPage from './pages/mainHome/HomeMainPage';
import AuthProvider, { useAuth } from './service/context/AuthProvider'; // 로그인 정보 전달
import Footer from './components/Footer';
import TopButton from './components/TopButton';
import Login from './pages/auth/Login';
import Store from './pages/store/Store';
import News from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail';
import SignUp from './pages/auth/SignUp';
import Find from './pages/auth/Find';
import Mypage from './pages/mypage/Mypages';
import List1 from './pages/mypage/List1';
import List2 from './pages/mypage/List2';
import List3 from './pages/mypage/List3';
import PrivateRoute from './pages/PrivateRoute';
import Board from './pages/support/Board';
import CustomerBoard from './pages/support/CustomerBoard';
import GameDetailsPage from './pages/store/GameDetailsPage';
import InquiryForm from './pages/support/InquiryForm';
import Cart from './pages/cart/Cart';
import Payment from './pages/payment/Payment';
import InquiryView from './pages/support/InquiryView';
import WriteCommunity from './pages/community/WriteCommunity';
import Community from './pages/community/Community';
import WrittenByMe from './pages/community/WrittenByMe';
import EditCommunity from './pages/community/EditCommunity';
import CommunityDetail from './pages/community/CommunityDetail';
import Membership from './pages/mypage/Membership';
import List4 from './pages/mypage/List4';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


// export const wholeVariable = React.createContext();

function App() {
  const [showModal, setShowModal] = useState(true); //안내창 모달 추가
  const nav = useNavigate();
  // 모달 닫기 함수
  const handleCloseModal = () => {
    setShowModal(false);
    localStorage.setItem('isModalClosed', 'true');
  };
  //Scroll to top on first render

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
    const isModalClosed = localStorage.getItem('isModalClosed');
    if (isModalClosed) {
      setShowModal(false);
    }

  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
  }, [nav]);


  const location = useLocation();
  const paths = ['/login', '/find'];
  const isLoginPage = paths.includes(location.pathname);
  const [showOutLink, setShowOutLink] = useState(false);


  //외부 링크바 열기
  const clickOutLink = () => {
    setShowOutLink(!showOutLink);
    let outLinkMenu = document.querySelector('.outLinkMenu');
    outLinkMenu.style.left = '0px';
  }
  // 외부 링크바 닫기
  const outLinkClose = () => {
    setShowOutLink(false)
    let outLinkMenu = document.querySelector('.outLinkMenu');
    outLinkMenu.style.left = '-300px';

  }

  // 페이지 전환 시 사이드바 상태 초기화
  useEffect(() => {
    setShowOutLink(false); // 상태를 false로 설정
    let outLinkMenu = document.querySelector('.outLinkMenu');
    if (outLinkMenu) {
      outLinkMenu.style.left = '-300px'; // 사이드바를 화면에서 숨김
    }
  }, [location.pathname]); // location.pathname이 변경될 때마다 실행

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px'
    },
  };

  return (
    <AuthProvider>
      <div className="App">
        {!isLoginPage && <Header showOutLink={showOutLink} clickOutLink={clickOutLink} outLinkClose={outLinkClose} />}

        <Routes>
          <Route path="/" element={<HomeMainPage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact' element={<Board />} />
          <Route path='/store/:storeNav' element={<Store />} />
          <Route path='/store/detail/:id' element={<GameDetailsPage />} />

          {/* <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } /> */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>} />
          <Route path='/info' element={<News />} />
          <Route path='/community/:commuNav' element={<Community />} />
          <Route path='/community/detail/:postId' element={<CommunityDetail />} />
          <Route path='/community/write' element={<WriteCommunity />} />
          <Route path='/community/posts' element={<WrittenByMe />} />
          <Route path='/community/editCommunity' element={<EditCommunity />} />
          {/* <Route path='/news/:id' element={<News />} /> */}
          <Route path="/info/detail/:id" element={<NewsDetail />} />
          <Route path="/signup" element={<SignUp className="signUpCss" />} />
          <Route path="/find" element={<Find />} />
          <Route path="/mypages" element={
            <PrivateRoute>
              <Mypage />
            </PrivateRoute>} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/myInfo" element={<List1 />} />
          <Route path="/wishlist" element={<List2 />} />
          <Route path="/mygame" element={<List3 />} />
          <Route path="/purchasehistory" element={<List4 />} />
          <Route path="/customerboard" element={<CustomerBoard />} />
          <Route path="/InquiryForm" element={<InquiryForm />} />
          <Route path="/inquiry-form" element={<InquiryForm />} />
          <Route path="/inquiry-view" element={<InquiryView />} />

        </Routes>
        {!isLoginPage && <TopButton />}
        {!isLoginPage && <Footer />}


        {/* 모달 추가 */}
        <Modal
          isOpen={showModal}
          onRequestClose={handleCloseModal}
          style={customStyles}
          contentLabel="Welcome Modal"
        >
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Playfarm</h3>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <pre style={{ lineHeight: '20px', fontSize: '16px' }}> 안녕하세요! Playfarm 입니다.
              <br />관리자로 로그인 하실 경우  <br />
              <span style={{ textDecoration: 'underline', marginBottom: '10px', color: 'red' }}>ID: admin &nbsp;
                PW: 12345!</span>
              <br />을 사용하시면 됩니다.
            </pre>
          </div>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <button onClick={handleCloseModal}> <FontAwesomeIcon icon={faXmark} size='m' /></button>
          </div>
        </Modal>
      </div>
    </AuthProvider>
  );

}


export default App;