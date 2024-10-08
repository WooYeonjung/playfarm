
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


// export const wholeVariable = React.createContext();

function App() {

  const nav = useNavigate();
  //Scroll to top on first render
  useEffect(() => {
    window.scrollTo({
      top: 0,
    })
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

  const [data, setData] = useState([]);

  useEffect(() => {
    // JSON 파일을 가져오는 함수
    const fetchData = async () => {
      try {
        const response = await fetch('/data/db.json'); // JSON 파일 경로
        const result = await response.json();
        setData(result);
        // if (!localStorage.getItem('cartJSON')) {
        //   localStorage.setItem('cartJSON', JSON.stringify(result.cart));
        // }
        if (!localStorage.getItem('infoDataJSON')) {
          localStorage.setItem('infoDataJSON', JSON.stringify(result.infoData));
        }
        if (!localStorage.getItem('payJSON')) {
          localStorage.setItem('payJSON', JSON.stringify(result.pay));
        }
        // if (!localStorage.getItem('posts')) {
        //   localStorage.setItem('postsJSON', JSON.stringify(result.posts));
        // }
      } catch (error) {
        console.error('JSON 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchData(); // 컴포넌트가 마운트될 때 fetchData 함수 호출
  }, []); // 빈 배열을 두 번째 인자로 전달하여 최초 렌더링 시에만 실행

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
          <Route path="/list2" element={<List2 />} />
          <Route path="/list3" element={<List3 />} />
          <Route path="/customerboard" element={<CustomerBoard />} />
          <Route path="/InquiryForm" element={<InquiryForm />} />
          <Route path="/inquiry-form" element={<InquiryForm />} />
          <Route path="/inquiry-view" element={<InquiryView />} />

        </Routes>
        {!isLoginPage && <TopButton />}
        {!isLoginPage && <Footer />}


      </div>
    </AuthProvider>
  );

}


export default App;