import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/GameDetailsPage.css';
import LikedBtn from '../mypage/ItemLike';
import axios from 'axios';
import { useAuth } from '../../service/context/AuthProvider';

/** inView 이벤트 처리를 위한 훅 */
const useIntersectionObserver = (threshold) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold,
    });
    return [ref, inView];
};

/** 상세 정보 아이템 컴포넌트 */
const DetailItem = ({ src, name, content }) => {
    const [ref, inView] = useIntersectionObserver(0.4);

    return (
        <div className={`detail_item_container ${inView ? 'show' : ''}`} ref={ref} >
            <img className="detail_item_image" src={src} alt={name} />
            <div className='detail_item_name'>{name}</div>
            <div className='detail_item_content'>{content}</div>
        </div>
    );
};

/** 태그 리스트 컴포넌트 */
// const TagList = ({ tags, codeIds }) => (
//     <div className='info_tag_list'>
//         {tags.map((t, idx) => (
//             codeIds.indexOf(t) !== -1 && (
//                 <div key={idx} className='tag_item'>
//                     <span>{t}</span>
//                 </div>
//             )
//         ))}
//     </div>
// );

export default function GameDetailsPage({ gameId }) {
    const { id } = useParams();
    const navigatePayment = useNavigate();
    const [ref, inView] = useIntersectionObserver(0.1);
    const [gameDetail, setGameDetail] = useState([]);
    const [codeTag, setCodeTag] = useState([]);
    const [codePlaytype, setCodePlaytype] = useState([]);
    const [imageData, setImageData] = useState([]);
    const { isLoggedIn, loginInfo, onLogout } = useAuth();
    // Scroll to top on first render
    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0
    //     })
    // }, []);

    // useEffect(() => {
    //     const fetchGameDetail = async () => {
    //       try {
    //         const gameResponse = await axios.get(`/game/gamedetail/${id}`);
    //         if (JSON.stringify(gameDetail) !== JSON.stringify(gameResponse.data)) {
    //           setGameDetail(gameResponse.data);
    //         }
    //       } catch (error) {
    //         console.error('게임 세부 정보를 가져오는데 실패했습니다.', error);
    //       }
    //     };

    //     const fetchCodeData = async () => {
    //       try {
    //         const codeResponse = await axios.get('/code/codedv/tag');
    //         if (JSON.stringify(codeTag) !== JSON.stringify(codeResponse.data)) {
    //           setCodeTag(codeResponse.data);
    //         }
    //       } catch (error) {
    //         console.error('코드 데이터를 가져오는데 실패했습니다.', error);
    //       }
    //     };

    //     fetchGameDetail();
    //     fetchCodeData();
    //     console.log(gameDetail)
    //   }, [gameId, gameDetail, codeTag]);


    useEffect(() => {
        const fetchGameDetail = async () => {
            try {
                const gameResponse = await axios.get(`/game/gamedetail/${id}`);
                setGameDetail(gameResponse.data);
            } catch (error) {
                console.error('게임 세부 정보를 가져오는데 실패했습니다.', error);
            }
        };

        const fetchCodeData = async () => {
            try {
                const codeResponse = await axios.get('/code/codedv/tag');
                const playtypeResponse = await axios.get('/code/codedv/playtype');
                setCodeTag(codeResponse.data);
                setCodePlaytype(playtypeResponse.data);
            } catch (error) {
                console.error('코드 데이터를 가져오는데 실패했습니다.', error);
            }
        };

        const fetchImageData = async () => {
            try {
                const imageResponse = await axios.get(`/image/game/${id}`);
                setImageData(imageResponse.data);
            } catch (error) {
                console.error('이미지 데이터를 가져오는데 실패했습니다.', error);
            }
        }
        fetchGameDetail();
        fetchCodeData();
        fetchImageData();

    }, [gameId]);

    const codeIds = codeTag.map((item) => item.codeId);
    const imgName = imageData.map(image => image.originName);
    console.log(codePlaytype);
    console.log(imageData);
    console.log(codeIds)
    console.log(gameDetail)
    console.log(gameDetail[`modeDesc${id}`])
    console.log(`${gameDetail.modeDesc}${id}`)
    // const [gameTag, setGameTag] = useState([]);
    let gameTag;
    if (gameDetail !== null && gameDetail.length > 0) {
        // setGameTag(gameDetail.tag.split(', '));
        return gameTag = gameDetail.tag
    }
    console.log(gameTag)
    // let gameTag = gameDetail.tag;
    // if (!gameTag) {
    //     return;
    // } else {
    //     gameTag = gameTag.split(', ');
    //     return;
    //     // return gameTag;
    // }

    // const gameTag = gameDetail.tag.split(', ').map(tag => tag.trim());
    // console.log(gameTag.split(', '));
    // console.log(gameDetail)
    const item = gameDetail;
    // const item = games.find((item) => item.id === parseInt(id));
    // const item = gameDetail;
    // console.log(item);





    const addToCart = (item, type) => {
        if (!isLoggedIn || !loginInfo.userId) {
            let loginConfirm = window.confirm('로그인 후 이용 가능. 로그인 하시겠습니까?');
            if (loginConfirm) {
                navigatePayment('/login')
            }
            return; // 로그인 페이지로 이동하는 경우 함수 종료
        }

        let data = {
            "gameId": item.gameId,
            "userid": loginInfo.userId,
            "title": item.title,
            "playtype": type,
            "src": item.src_title,
            "price": item.price
        };

        const cartJSON = localStorage.getItem('cartJSON');
        let cartItems = cartJSON ? JSON.parse(cartJSON) : [];

        const itemExists = cartItems.some(cartItem => cartItem.gameId === data.gameId && cartItem.playtype === data.playtype);

        if (itemExists) {
            alert('이미 동일한 상품이 장바구니에 담겨 있습니다.');
        } else {
            cartItems.push(data);
            localStorage.setItem('cartJSON', JSON.stringify(cartItems));

            let cartConfirm = window.confirm('장바구니에 상품을 담았습니다! 장바구니로 이동 하시겠습니까?');
            if (cartConfirm) {
                navigatePayment('/cart');
            }
        }
    };

    const goPayment = (item, type) => {
        if (!isLoggedIn || !loginInfo.userId) {
            let loginConfirm = window.confirm('로그인 후 이용 가능. 로그인 하시겠습니까?');
            if (loginConfirm) {
                navigatePayment('/login')
            }
            return; // 로그인 페이지로 이동하는 경우 함수 종료
        }

        let data = {
            "gameId": item.id,
            "userid": loginInfo.userId,
            "title": item.title,
            "playtype": type,
            "src": item.src_title,
            "price": item.price
        };

        let payData = JSON.parse(localStorage.getItem('pay')) || [];
        const existingIndex = payData.findIndex(pay => pay.userid === loginInfo.userId);

        if (existingIndex === -1) {
            payData.push(data);
        } else {
            payData[existingIndex] = data;
        }

        localStorage.setItem('pay', JSON.stringify(payData));

        navigatePayment('/payment');
    };

    return (
        <>
            <section>
                <img className="game_title_image" src={`/images/game/${imgName[0]}`} alt={item.title} />
                <div className={`game_title_content ${inView ? 'show' : ''}`} ref={ref}>
                    {gameDetail.detailCon}
                </div>
            </section>
            <section className='detail_container'>
                {imageData.slice(1, 4).map((item, index) => (
                    <DetailItem
                        key={index}
                        src={`/images/game/${item.originName}`}
                        name={`${gameDetail[`modeName${index + 1}`]}`}
                        content={`${gameDetail[`modeDesc${index + 1}`]}`}
                    />
                ))}
            </section>
            <section className='main_container'>
                {/* <div className='purchase_container'>
                    {['nin', 'ps', 'pc'].map((type) => (
                        item.playtype.split(', ').include(type) && (
                            <div key={type} className='purchase_type_container'>
                                <img className='purchase_type_img' src={`/images/logo/service_${type}_logo.jpg`} alt={`${type} Logo`} />
                                <div className='btn_container'>
                                    <button className={`purchase_btn_${type}`} onClick={() => addToCart(item, type)}><span>장바구니</span></button>
                                    <button className={`purchase_btn_${type}`} onClick={() => goPayment(item, type)}><span>구매하기</span></button>
                                </div>
                            </div>
                        )
                    ))}
                </div> */}
                <div className='purchase_container'>
                    {codePlaytype.map((type) => (
                        gameDetail.playtype.includes(type.codeId) && (
                            <div key={type.codeDv} className='purchase_type_container'>
                                <img className='purchase_type_img' src={`/images/logo/service_${type.codeInfo}_logo.jpg`} alt={`${type.codeInfo} Logo`} />
                                <div className='btn_container'>
                                    <button className={`purchase_btn_${type.codeInfo}`} onClick={() => addToCart(item, type.codeDv)}><span>장바구니</span></button>
                                    <button className={`purchase_btn_${type.codeInfo}`} onClick={() => goPayment(item, type.codeDv)}><span>구매하기</span></button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <div className='info_container'>
                    <img className='info_img' src={`/images/game/${gameDetail.titleImg}`} alt={item.titleImg} />
                    <div className='info_game_name_container'>
                        <div className='info_game_name'>{gameDetail.gameTitle}</div>
                        {/* {isLoggedIn && loginInfo.userId && <LikedBtn item={item} />} */}
                    </div>
                    <div className='info_releasedate'>출시일 : {gameDetail.releaseDate}</div>
                    {/* <TagList tags={item.tag} codeIds={codeIds} /> */}
                </div>
            </section>
            <section className='requirements_container'>
                <h3>최소 요구 사항</h3>
                <hr />
                <div className='system_requirements_container'>
                    {['minimum', 'recommended'].map((type, index) => (
                        <div key={index} className={`system_requirements_${type}`}>
                            <div>{type === 'minimum' ? '최소' : '권장'}</div>
                            {item.OS && item.OS[index] && <div>운영 체제 : {item.OS[index]}</div>}
                            {item.Processor && item.Processor[index] && <div>프로세서 : {item.Processor[index]}</div>}
                            {item.Memory && item.Memory[index] && <div>메모리 : {item.Memory[index]}</div>}
                            {item.Graphics && item.Graphics[index] && <div>그래픽 : {item.Graphics[index]}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
