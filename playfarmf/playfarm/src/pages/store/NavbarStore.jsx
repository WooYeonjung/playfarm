import '../../styles/NavbarStore.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NavbarStore({ theme, setTheme, onSearchChange, categoryOnclick, tab }) {
    const navigate = useNavigate();

    // 검색어 기능
    const [search, setSearch] = useState('');
    // const onChangeSearch = (e) => { setSearch(e.target.value) }
    const handleChange = (e) => {
        setSearch(e.target.value);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    const handleSearch = () => {
        // 검색어 변경 시 상위 컴포넌트로 전달
        onSearchChange(search);
    };


    // theme 적용
    const toggleMode = () => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
    }

    // tag주소 넣어주기
    const handleNavigation = (path) => {
        setSearch(''); 
        onSearchChange('');
        navigate('/store' + path);
        categoryOnclick(path.slice(1)); // 슬래시를 제거한 후 카테고리 이름을 상위로 전달
    }

    return (
        <nav className='navbar' style={{ background: theme === 'light' ? '#fff' : '#000' }}>
            <h1 style={{ color: theme === 'light' ? '#000' : '#fff' }}>Store</h1>
            <ul>
                <li onClick={() => handleNavigation('/all')} className={`${tab.selectTab === 'all' ? 'visible' : ''}`}>
                    <span>All</span>
                </li>
                <li onClick={() => handleNavigation('/nintendo')} className={`${tab.selectTab === 'nintendo' ? 'visible' : ''}`}>
                    <span>Nintendo</span>
                </li>
                <li onClick={() => handleNavigation('/playstation')} className={`${tab.selectTab === 'playstation' ? 'visible' : ''}`}>
                    <span>Playstation</span>
                </li>
                <li onClick={() => handleNavigation('/pc')} className={`${tab.selectTab === 'pc' ? 'visible' : ''}`}>
                    <span>PC</span>
                </li>
            </ul>

            <div className='search_box'>
                <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                />
                <FontAwesomeIcon
                    className='search_icon'
                    onClick={handleSearch}
                    icon={faMagnifyingGlass}
                    style={{ color: theme === 'light' ? '#fff' : '#000' }}
                />
            </div>
            <FontAwesomeIcon
                onClick={() => { toggleMode() }}
                icon={theme === 'light' ? faMoon : faSun}
                size='xl'
                style={{ color: theme === 'light' ? '#000' : '#fff' }}
                className='toggle_icon'
            />
        </nav>
    );
}

export default NavbarStore;
