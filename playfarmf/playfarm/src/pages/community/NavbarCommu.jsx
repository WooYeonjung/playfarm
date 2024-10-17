import { useNavigate } from 'react-router-dom';
import '../../styles/NavbarCommu.css';

export default function NavbarCommu({ tab, postTypeOnclick, setSearch }) {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        setSearch('');
        navigate('/community' + path);
        postTypeOnclick(path.slice(1));
    }


    return (
        <nav className='community_navbar'>
            <h1>Community</h1>
            <ul>
                <li onClick={() => handleNavigation('/all')} className={`${tab.selectTab === 'all' ? 'visible' : ''}`}><span>전체</span></li>
                <li onClick={() => handleNavigation('/free')} className={`${tab.selectTab === 'free' ? 'visible' : ''}`}><span>자유</span></li>
                <li onClick={() => handleNavigation('/find')} className={`${tab.selectTab === 'find' ? 'visible' : ''}`}><span>유저찾기</span></li>
                <li onClick={() => handleNavigation('/question')} className={`${tab.selectTab === 'question' ? 'visible' : ''}`}><span>질문</span></li>
                <li onClick={() => handleNavigation('/fanart')} className={`${tab.selectTab === 'fanart' ? 'visible' : ''}`}><span>팬아트</span></li>
            </ul>
        </nav>
    );
}