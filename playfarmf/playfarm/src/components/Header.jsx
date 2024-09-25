import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/Header.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faHeadset, faBars, faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons'
import Outlink from '../pages/mainHome/OutLink';
import OutLinkList from '../pages/mainHome/OutLinkList'
import { useAuth } from '../service/context/AuthProvider';
import { useState } from 'react';

export default function Header({ showOutLink, clickOutLink, outLinkClose }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, onLogout } = useAuth(); // useAuth 훅 사용
    const [loginId, setLoginId] = useState(''); // 추가
    //const [isLoggedIn, setIsLoggedIn] = useState(false); // 추가
    const [userData, setUserData] = useState(null); // 추가
    const navigate = useNavigate();
    // const logOutNavi = useNavigate('/');

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const toggleMenuLeave = () => {
        setIsMenuOpen(false)
    }

    // 추가
    const handleLogout = () => {
        onLogout();
        navigate('/');
    }
    const Logedout = () => {
        // console.log(isLoggedIn);
        if (isLoggedIn) {
            return (
                <>
                    <Link to='/mypages'> <li><FontAwesomeIcon className="arcodianIcon" icon={faUser} size='sm' />MyPage</li></Link>
                    <Link to='/cart'><li><FontAwesomeIcon className="arcodianIcon" icon={faCartShopping} size='sm' />Cart</li></Link>
                    <li onClick={handleLogout}><FontAwesomeIcon className="arcodianIcon" icon={faHeadset} size='sm' />LogOut</li>
                </>
            )
        } else {
            return (
                <>

                    <Link to='/login'><li><FontAwesomeIcon className="arcodianIcon" icon={faHeadset} size='sm' />Login</li></Link>
                    <Link to='/mypages'> <li><FontAwesomeIcon className="arcodianIcon" icon={faUser} size='sm' />MyPage</li></Link>
                    <Link to='/cart'> <li><FontAwesomeIcon className="arcodianIcon" icon={faCartShopping} size='sm' />Cart</li></Link>
                </>
            )
        }
    }

    return (
        <>
            <header>
                <div className="Header_container">
                    <div className="Header_top">
                        <div className='Header_top_first'>
                            <div className="outlink header__outlink">
                                <Outlink clickOutLink={clickOutLink} />
                            </div>
                        </div>
                        <div className='Header_top_second logo'>
                            <a href='/'>
                                <h2><span>P</span><span>l</span><span>a</span><span>y</span><span>F</span><span>a</span><span>r</span><span>m</span> </h2>
                            </a>
                        </div>
                        <div className='Header_top_third' onClick={toggleMenu} >
                            <span><FontAwesomeIcon icon={faBars} size='lg' /></span>
                        </div>
                        <ul className={`menu ${isMenuOpen ? 'open' : ''}`} onMouseLeave={toggleMenuLeave}>
                            <Logedout /> {/* 추가) 원래 메뉴바 있던 자리입니당 */}
                        </ul>
                    </div>
                    <div className="Header_bottom">
                        <ul>
                            <NavLink to='/'><li><span>Home</span></li></NavLink>
                            <NavLink to='/store/all'><li><span>Store</span></li></NavLink>
                            <NavLink to='/info'> <li><span>Infomation</span></li></NavLink>
                            <NavLink to='/community/all'>  <li><span>Community</span></li></NavLink>
                            <NavLink to='/contact'><li><span>Support</span></li></NavLink>
                        </ul>
                    </div>
                </div>
            </header >
            <div className={`outLinkMenu ${showOutLink}?'show' : ''  `} >
                <div className="xbtn"><button onClick={outLinkClose}><FontAwesomeIcon className="xbtnIcon " icon={faCircleXmark} size="xl" style={{ color: 'white', }} /></button></div>
                <div className='outLinkTitle'>Product</div>
                <div className='outLinkImg_wrapper'>
                    <OutLinkList />
                </div>
            </div >

        </>
    )
}