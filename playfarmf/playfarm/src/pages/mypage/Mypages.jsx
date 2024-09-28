// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import '../../styles/Mypages.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser, faReceipt, faGamepad, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
// // import ReactDOM from 'react-dom';


// const NavBarW = () => {

//   const fontElement = [
//     <FontAwesomeIcon icon={faUser} />,
//     <FontAwesomeIcon icon={faGamepad} />,
//     <FontAwesomeIcon icon={faReceipt} />,
//     <FontAwesomeIcon icon={faThumbsUp} />
//   ]

//   return (
//     <article className='page1'>
//       <ul>
//         <li><Link to={'/list1'}><span>{fontElement[0]}</span><span>Membership</span></Link></li>
//         <li><Link to={'/list3'}><span>{fontElement[1]}</span><span>My Game</span></Link></li>
//         <li><Link to={'/list2'}><span>{fontElement[3]}</span><span>Wish List</span></Link></li>
//         <li><Link to={'/list4'}><span>{fontElement[2]}</span><span>Shopping List</span></Link></li>
//         {/* <li key={4}><NavLink to={'/list4'}>{fontElement[3]} Wish List</NavLink></li> */}
//       </ul>
//     </article>
//   );
// }

// const PageNation = () => {

//   const history = useNavigate();

//   const handlePage1 = () => {
//     history('/list1');
//   }
//   const handlePage2 = () => {
//     history('/list3');
//   }
//   const handlePage3 = () => {
//     history('/list2');
//   }

//   return (
//     <div className='container_box'>
//       <div className='containerItem1' >
//         <div className='conItem1' onClick={handlePage1} />
//         <span>MEMBERSHIP</span>
//       </div>
//       <div className='containerItem2'>
//         <div className='conItem2' onClick={handlePage2} />
//         <span>MYGAMES</span>
//       </div>
//       <div className='containerItem3'>
//         <div className='conItem3' onClick={handlePage3} />
//         <span>WishList</span>
//       </div>
//       <div className='containerItem4'>
//         <div className='conItem4' onClick={handlePage3} />
//         <span>Shopping List</span>
//       </div>
//     </div>
//   )
// }

// function Mypage() {
//   return (
//     <div className='myPageMain'>
//       <PageNation />
//     </div>
//   )
// }

// export { NavBarW };
// export default Mypage;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Mypages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faReceipt, faGamepad, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { useAuth } from '../../service/context/AuthProvider';
import { apiCall } from '../../service/apiService';

const NavBarW = () => {
  const fontElement = [
    <FontAwesomeIcon icon={faUser} />,
    <FontAwesomeIcon icon={faGamepad} />,
    <FontAwesomeIcon icon={faReceipt} />,
    <FontAwesomeIcon icon={faThumbsUp} />
  ];

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const { loginInfo } = useAuth(); // useAuth 훅 사용
  const navigate = useNavigate();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleConfirm = () => {
    // 비밀번호 확인 로직 추가
    if (password === 'your_password') { // 여기에 실제 비밀번호 확인 로직을 추가하세요
      closeModal();
      navigate('/list1');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  return (
    <article className='page1'>
      <ul>
        {/* <li onClick={openModal}><span>{fontElement[0]}</span><span>Membership</span></li> */}
        <li onClick={openModal}><Link><span>{fontElement[0]}</span><span>Membership</span></Link></li>
        <li><Link to={'/list3'}><span>{fontElement[1]}</span><span>My Game</span></Link></li>
        <li><Link to={'/list2'}><span>{fontElement[3]}</span><span>Wish List</span></Link></li>
        <li><Link to={'/list4'}><span>{fontElement[2]}</span><span>Shopping List</span></Link></li>
        {/* <li key={4}><NavLink to={'/list4'}>{fontElement[3]} Wish List</NavLink></li> */}
      </ul>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Password Confirmation"
        style={{
          overlay: {
            zIndex: 1000 // 원하는 z-index 값으로 설정하세요
          },
          content: {
            zIndex: 1001, // 원하는 z-index 값으로 설정하세요
            width: '400px', // 원하는 너비로 설정하세요
            height: '300px', // 원하는 높이로 설정하세요
            margin: 'auto' // 모달을 화면 중앙에 배치
          }
        }}
      >
        <h2>비밀번호 확인</h2>
        <input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={handlePasswordChange} />
        <button onClick={handleConfirm} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>확인</button>
        <button onClick={closeModal} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>취소</button>
      </Modal>
    </article>
  );
};

const PageNation = () => {
  const history = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [loginInfo] = useAuth();
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleConfirm = async () => {
    const token = loginInfo.token;
    try {
      const response = await apiCall('/user/verifypw', 'POST', password, token);
      alert("비밀번호 확인을 성공하였습니다.");
    } catch (err) {

    }

    if (password === 'your_password') { // 여기에 실제 비밀번호 확인 로직을 추가하세요
      closeModal();
      history('/list1');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  const handlePage1 = () => {
    openModal();
  };
  const handlePage2 = () => {
    history('/list3');
  };
  const handlePage3 = () => {
    history('/list2');
  };

  return (
    <div className='container_box'>
      <div className='containerItem1'>
        <div className='conItem1' onClick={handlePage1} />
        <span>MEMBERSHIP</span>
      </div>
      <div className='containerItem2'>
        <div className='conItem2' onClick={handlePage2} />
        <span>MYGAMES</span>
      </div>
      <div className='containerItem3'>
        <div className='conItem3' onClick={handlePage3} />
        <span>WishList</span>
      </div>
      <div className='containerItem4'>
        <div className='conItem4' onClick={handlePage3} />
        <span>Shopping List</span>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Password Confirmation"
        style={{
          overlay: {
            zIndex: 1000 // 원하는 z-index 값으로 설정하세요
          },
          content: {
            zIndex: 1001, // 원하는 z-index 값으로 설정하세요
            width: '400px', // 원하는 너비로 설정하세요
            height: '300px', // 원하는 높이로 설정하세요
            margin: 'auto' // 모달을 화면 중앙에 배치
          }
        }}
      >
        <h2>비밀번호 확인</h2>
        <input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={handlePasswordChange} />
        <button onClick={handleConfirm} style={{ marginRight: '10px', padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>확인</button>
        <button onClick={closeModal} style={{ padding: '10px 20px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '5px' }}>취소</button>
      </Modal>
    </div>
  );
};
function Mypage() {
  return (
    <div className='myPageMain'>
      <PageNation />
    </div>
  );
}

export { NavBarW };
export default Mypage;
