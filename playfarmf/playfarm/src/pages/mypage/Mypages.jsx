import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/Mypages.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faReceipt, faGamepad, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
// import ReactDOM from 'react-dom';


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
        <li><Link to={'/list1'}><span>{fontElement[0]}</span><span>Membership</span></Link></li>
        <li><Link to={'/list3'}><span>{fontElement[2]}</span><span>My Game</span></Link></li>
        <li><Link to={'/list2'}><span>{fontElement[1]}</span><span>Wish List</span></Link></li>
        {/* <li key={4}><NavLink to={'/list4'}>{fontElement[3]} Wish List</NavLink></li> */}
      </ul>
    </article>
  );
}

const PageNation = () => {

  const history = useNavigate();

  const handlePage1 = () => {
    history('/list1');
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
