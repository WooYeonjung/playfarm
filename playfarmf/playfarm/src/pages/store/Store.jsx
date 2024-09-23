import React, { useState, useEffect } from "react";
import GameListItem from "./GameListItem";
import GameCategory from "./GameCategory";
import NavbarStore from "./NavbarStore";
import '../../styles/Store.css';
import { useNavigate, useParams } from "react-router-dom";

export default function Store() {
    //navbar li navigate 받아오기
    const { storeNav } = useParams();

    // theme
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem('current_theme');
        return storedTheme ? storedTheme : 'light';
    });

    useEffect(() => {
        localStorage.setItem('current_theme', theme)
    }, [theme]);

    // search bar
    const [search, setSearch] = useState('');

    const handleSearchChange = (term) => {
        setSearch(term);
    };

    // navbar_category(playtype)
    const [category, setCategory] = useState(storeNav);
    const [tab, setTab] = useState({ selectTab: storeNav })

    const categoryOnclick = (playtype) => {
        setCategory(playtype);
        setTab({ selectTab: playtype });
    };

    // checkbox ischecked true 값 담아오기
    const [selectcheck, setSelectcheck] = useState({ playtype: [], tag: [] });

    // gameitem container click > details component
    const navigate = useNavigate();
    const onGameItemClick = (item) => {
        navigate(`/store/detail/${item.id}`);
    };

    return (
        <div className={`container ${theme}`}>
            <NavbarStore theme={theme} setTheme={setTheme}
                onSearchChange={handleSearchChange}
                categoryOnclick={categoryOnclick}
                tab={tab}
            />

            <div className="gamelist">
                <GameCategory
                    setSelectcheck={setSelectcheck}
                    category={category}
                    theme={theme} setTheme={setTheme}
                />
                <GameListItem search={search} category={category} selectcheck={selectcheck} onGameItemClick={onGameItemClick} />
            </div>
        </div>
    );
}
