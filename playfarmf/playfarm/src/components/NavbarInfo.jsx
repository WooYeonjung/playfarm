import { useState } from "react"
import '../styles/News.css';

const NavbarInfo = ({ onTabClick, selectTab }) => {

    // const [tab, setTab] = useState({ tabItem: infomation.newsData, selectTab: "news" })
    // function onTabClick(data) {
    //     // setTab({ ...tab, selectTab: data });  
    //     console.log(`*******${data}`)
    //     if (data === 'news') {
    //         setTab({
    //             tabItem: infomation.newsData,
    //             selectTab: data
    //         })
    //     } else if (data === 'events') {
    //         setTab({
    //             tabItem: infomation.eventsData,
    //             selectTab: data
    //         });
    //     } else {
    //         setTab({
    //             tabItem: infomation.noticeData,
    //             selectTab: data
    //         })
    //     }
    //     // return tab.tabItem;
    // }



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