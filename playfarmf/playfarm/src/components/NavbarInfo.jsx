import { useState } from "react"
import '../styles/News.css';

const NavbarInfo = ({ onTabClick, selectTab }) => {




    return (
        <div className='newTab_wrapper'>
            <h1>Infomation</h1>
            <ul className="newTab">
                <li onClick={() => onTabClick('news')} className={`${selectTab === 'news' ? 'visible' : ''}`}><span>News</span></li>
                <li onClick={() => onTabClick('event')} className={`${selectTab === 'event' ? 'visible' : ''}`}><span>Event</span></li>
                <li onClick={() => onTabClick('notice')} className={`${selectTab === 'notice' ? 'visible' : ''}`}><span>Notice</span></li>
            </ul>
        </div>
    )
}




export default NavbarInfo;