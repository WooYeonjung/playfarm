import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import '../../styles/GameListItem.css';
import PagiNation from '../../pages/Pagination';
import { API_BASE_URL } from "../../service/app-config";

function GameItem({ game }) {
    return (
        <div>
            <img className="gameitem_image" src={`${API_BASE_URL}/resources/images/game/${game.titleImg}`} />
            {game.discount > 0 ? 
                <img className="gameitem_disImg" src="/images/logo/discount.gif" /> : null}
            <p className="gameitem_releasedate">{game.releaseDate}</p>
            <h2 className="gameitem_title">{game.gameTitle}</h2>
            {/* <p>{game.playtype}</p> */}
            {game.discount > 0 && (game.discendDate !== null || new Date(game.discendDate) >= new Date()) ? 
                <p className="gameitem_disprice">
                    {(game.price - (game.price * game.discount / 100.0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p> : null}
            {/* <p>{game.tag}</p> */}
            <p style={game.discount > 0 ? 
                {'text-decoration': 'line-through'} : null} className="gameitem_price">
                    &#8361;{game.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </p>
        </div>
    );
}

function GameListItem({ search, category, selectcheck, onGameItemClick }) {
    const [gameList, setGameList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // 페이지당 아이템 수

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('/game/gamelist');
                setGameList(response.data);
            } catch (error) {
                console.error('게임 데이터를 가져오지 못했습니다', error);
            }
        };
        fetchGames();
    }, []);


    console.log(gameList);

    // filter 적용
    const getFilteredGames = () => {
        let filteredGames = gameList;

        // navbar
        if (selectcheck.playtype.length > 0) {
            filteredGames = filteredGames.filter((item) =>
                selectcheck.playtype.some(playtype => item.playtype.includes(playtype))
            );
        } else {
            if (category !== 'all') {

                filteredGames = filteredGames.filter((item) => item.playtype.includes(category));
            }
        }

        // category tag
        if (selectcheck.tag.length > 0) {
            filteredGames = filteredGames.filter((item) =>
                selectcheck.tag.some(tag => item.tag.includes(tag))
            );
        }

        // search bar 
        if (search !== '') {
            filteredGames = filteredGames.filter((item) => item.gameTitle.toLowerCase().includes(search.toLowerCase()));
        }

        return filteredGames;
    };

    const filteredGames = getFilteredGames();
    const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

    // 현재 페이지에 해당하는 게임 목록을 가져오는 함수
    const getCurrentPageGames = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredGames.slice(startIndex, endIndex);
    };

    return (
        <div>
            <div className="gamelist_container">
                {filteredGames.length === 0 ? (
                    <p className="no_games_message">검색 조건에 맞는 게임이 없습니다.</p>
                ) : (
                    getCurrentPageGames().map((item, idx) => (
                        <div className="gameitem_container" key={idx} onClick={() => { onGameItemClick(item) }}>
                            <GameItem game={item} key={idx} />
                        </div>
                    ))
                )}
            </div>
            <>
                <PagiNation
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)} />
            </>
        </div>
    );
}

export default GameListItem;

// import { useContext, useState } from "react";
// import games from './gameListData';
// import '../../styles/GameListItem.css';
// import PagiNation from '../../pages/Pagination';

// function GameItem({ game }) {
//     return (
//         <div>
//             <img className="gameitem_image" src={require(`../../images/store/gameitem${parseInt(game.id)}.jpg`)} />
//             <p className="gameitem_releasedate">{game.releasedate}</p>
//             <h2 className="gameitem_title">{game.title}</h2>
//             {/* <p>{game.playtype}</p> */}
//             {/* <p>{game.tag}</p> */}
//             <p className="gameitem_price">&#8361;{game.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
//         </div>
//     );
// }

// function GameListItem({ search, category, selectcheck, onGameItemClick }) {
//     const [gameList, setGameList] = useState(games);
//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 9; // 페이지당 아이템 수

//     // filter 적용
//     const getFilteredGames = () => {
//         let filteredGames = gameList;

//         // navbar
//         if (selectcheck.playtype.length > 0) {
//             filteredGames = filteredGames.filter((item) =>
//                 selectcheck.playtype.some(playtype => item.playtype.includes(playtype))
//             );
//         } else {
//             if (category !== 'all') {

//                 filteredGames = filteredGames.filter((item) => item.playtype.includes(category));
//             }
//         }

//         // category tag
//         if (selectcheck.tag.length > 0) {
//             filteredGames = filteredGames.filter((item) =>
//                 selectcheck.tag.some(tag => item.tag.includes(tag))
//             );
//         }

//         // search bar
//         if (search !== '') {
//             filteredGames = filteredGames.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
//         }

//         return filteredGames;
//     };

//     const filteredGames = getFilteredGames();
//     const totalPages = Math.ceil(filteredGames.length / itemsPerPage);

//     // 현재 페이지에 해당하는 게임 목록을 가져오는 함수
//     const getCurrentPageGames = () => {
//         const startIndex = (currentPage - 1) * itemsPerPage;
//         const endIndex = startIndex + itemsPerPage;
//         return filteredGames.slice(startIndex, endIndex);
//     };

//     return (
//         <div>
//             <div className="gamelist_container">
//                 {filteredGames.length === 0 ? (
//                     <p className="no_games_message">검색 조건에 맞는 게임이 없습니다.</p>
//                 ) : (
//                     getCurrentPageGames().map((item, idx) => (
//                         <div className="gameitem_container" key={idx} onClick={() => { onGameItemClick(item) }}>
//                             <GameItem game={item} key={idx} />
//                         </div>
//                     ))
//                 )}
//             </div>
//             <>
//                 <PagiNation
//                     currentPage={currentPage}
//                     totalPages={totalPages}
//                     onPageChange={(page) => setCurrentPage(page)} />
//             </>
//         </div>
//     );
// }

// export default GameListItem;
