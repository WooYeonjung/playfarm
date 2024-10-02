import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Mypages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faReceipt, faGamepad, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../service/context/AuthProvider';
import { apiCall } from '../../service/apiService';

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


const NavBarW = () => {

  const fontElement = [
    <FontAwesomeIcon icon={faUser} />,
    <FontAwesomeIcon icon={faGamepad} />,
    <FontAwesomeIcon icon={faReceipt} />,
    <FontAwesomeIcon icon={faThumbsUp} />
  ]

  return (
    <article className='page1'>
      <ul>
        <li><Link to={'/membership'}><span>{fontElement[0]}</span><span>Membership</span></Link></li>
        <li><Link to={'/list3'}><span>{fontElement[1]}</span><span>My Game</span></Link></li>
        <li><Link to={'/list2'}><span>{fontElement[3]}</span><span>Wish List</span></Link></li>
        <li><Link to={'/list4'}><span>{fontElement[2]}</span><span>Shopping List</span></Link></li>
        {/* <li key={4}><NavLink to={'/list4'}>{fontElement[3]} Wish List</NavLink></li> */}
      </ul>
    </article>
  );
}


const PageNation = () => {
  const { isLoggedIn, onLogout } = useAuth(); // useAuth 훅 사용
  const [myInfo, setMyInfo] = useState();
  const history = useNavigate();


  const userInfo = async (token) => {

    try {
      const response = await apiCall("/user", "GET", '', token);
      if (response) {
        setMyInfo(response);
      }
    } catch (err) {
      console.log(err);
    }
  }
  // 새로고침해도 정보 그대로 있음
  useEffect(() => {
    const storedLoginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
    // if (storedLoginInfo) {
    //   setLoginInfo(JSON.parse(storedLoginInfo));
    // }

    const token = storedLoginInfo.token;
    userInfo(token);

  }, []);



  const handlePage1 = () => {
    history('/membership');
  }
  const handlePage2 = () => {
    history('/list3');
  }
  const handlePage3 = () => {
    history('/list2');
  }

  return (
    <div className='container_box'>
      <div className='containerItem1' >
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
    </div>
  )
}

function Mypage() {


  return (
    <div className='myPageMain'>
      <PageNation />
    </div>
  )
}

export { NavBarW };
export default Mypage;

