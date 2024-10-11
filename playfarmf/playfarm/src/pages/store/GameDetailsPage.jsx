import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from "react-router-dom";
import '../../styles/GameDetailsPage.css';
import LikedBtn from '../mypage/ItemLike';
import axios from 'axios';
import { useAuth } from '../../service/context/AuthProvider';
import { API_BASE_URL } from '../../service/app-config';

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
const TagList = ({ tags, codeTag }) => (
    <div className='info_tag_list'>
        {codeTag.map((t, idx) => (
            tags && tags.includes(t.codeId) && (
                <div key={idx} className='tag_item'>
                    <span>{t.codeInfo}</span>
                </div>
            )
        ))}
    </div>
);

export default function GameDetailsPage({ gameId }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [ref, inView] = useIntersectionObserver(0.1);
    const [gameDetail, setGameDetail] = useState([]);
    const [rqmData, setRqmData] = useState([]);
    const [codeTag, setCodeTag] = useState([]);
    const [codePlaytype, setCodePlaytype] = useState([]);
    const [imageData, setImageData] = useState([]);
    const [purchaseData, setPurchaseData] = useState([]);
    const { isLoggedIn, loginInfo, onLogout } = useAuth();

    useEffect(() => {
        window.scrollTo({
            top: 0
        })

        const fetchGameDetail = async () => {
            try {
                const gameResponse = await axios.get(`/game/gamedetail/${id}`);
                const requirementResponse = await axios.get(`/game/requirement/${id}`);
                setGameDetail(gameResponse.data); 
                setRqmData(requirementResponse.data);
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

        const fetchPurchasedGame = async () => {
            try {
                const purchasedList = await axios.get('/purchase/gamelist', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + loginInfo.token,
                    }
                })
                setPurchaseData(purchasedList.data);
            } catch (error) {
                console.error('구매 게임 데이터를 가져올 수 없습니다.', error);
            }
        }
        fetchGameDetail();
        fetchCodeData();
        fetchImageData();
        fetchPurchasedGame();
    }, [gameId]);

    const imgName = imageData.map(image => image.originName);
    console.log(loginInfo.token)
    console.log(purchaseData)
    console.log(gameDetail[`modeDesc${id}`])

    const item = gameDetail;

    const addToCart = (item, type) => {
        if (!isLoggedIn || !loginInfo.userId) {
            let loginConfirm = window.confirm('로그인 후 이용 가능. 로그인 하시겠습니까?');
            if (loginConfirm) {
                navigate('/login')
            }
            return;
        }

        const isPurchased = purchaseData.some(purchase => purchase.gameId === item.gameId && purchase.playtype === type);
        if (isPurchased) {
            let gameConfirm = window.confirm('이미 구매한 게임입니다. 게임하러 가시겠습니까?');
            if (gameConfirm) {
                navigate('/list3')
            }
            return;
        }

        let cartData = {
            // "userId": loginInfo.userId,
            "gameId": item.gameId,
            "discount": item.discount,
            "discendDate": item.discendDate,
            "playtype": type
        };

        const token = loginInfo.token;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }; console.log(type);
        axios.post("/cart", cartData, { headers: headers }, token)
            .then(res => {
                let cartConfirm = window.confirm(res.data);
                if (cartConfirm) {
                    navigate('/cart');
                }
            }).catch(err => {
                alert(err.response.data);
            });



        // const cartJSON = localStorage.getItem('cartJSON');
        // let cartItems = cartJSON ? JSON.parse(cartJSON) : [];

        // const itemExists = cartItems.some(cartItem => cartItem.gameId === data.gameId && cartItem.playtype === data.playtype);

        // if (itemExists) {
        //     alert('이미 동일한 상품이 장바구니에 담겨 있습니다.');
        // } else {
        //     cartItems.push(data);
        //     localStorage.setItem('cartJSON', JSON.stringify(cartItems));

        //     let cartConfirm = window.confirm('장바구니에 상품을 담았습니다! 장바구니로 이동 하시겠습니까?');
        //     if (cartConfirm) {
        //         navigatePayment('/cart');
        //     }
        // }
    };

    const goPayment = (item, type) => {
        if (!isLoggedIn || !loginInfo.userId) {
            let loginConfirm = window.confirm('로그인 후 이용 가능. 로그인 하시겠습니까?');
            if (loginConfirm) {
                navigate('/login')
            }
            return;
        }

        const isPurchased = purchaseData.some(purchase => purchase.gameId === item.gameId && purchase.playtype === type);
        if (isPurchased) {
            let gameConfirm = window.confirm('이미 구매한 게임입니다. 게임하러 가시겠습니까?');
            if (gameConfirm) {
                navigate('/list3')
            }
            return;
        }

        let buyData = {
            "userId": loginInfo.userId,
            "gameId": item.gameId,
            "playtype": type
        };

        try {
            const response = axios.post('/game/buy', buyData);
        } catch (error) {
            console.error('구매 정보를 알 수 없습니다', error.message);
        }
        //바로 payment페이지로 보내야함. 
        // let payData = JSON.parse(localStorage.getItem('pay')) || [];
        // const existingIndex = payData.findIndex(pay => pay.userid === loginInfo.userId);

        // if (existingIndex === -1) {
        //     payData.push(data);
        // } else {
        //     payData[existingIndex] = data;
        // }

        // localStorage.setItem('pay', JSON.stringify(payData));

        navigate('/payment');
    };

    return (
        <>
            <section>
                <img className="game_title_image" src={`${API_BASE_URL}/resources/images/game/${imgName[0]}`} alt={item.title} />
                <div className={`game_title_content ${inView ? 'show' : ''}`} ref={ref}>
                    {gameDetail.detailCon}
                </div>
            </section>
            <section className='detail_container'>
                {imageData.slice(1, 4).map((item, index) => (
                    <DetailItem
                        key={index}
                        src={`${API_BASE_URL}/resources/images/game/${item.originName}`}
                        name={`${gameDetail[`modeName${index + 1}`]}`}
                        content={`${gameDetail[`modeDesc${index + 1}`]}`}
                    />
                ))}
            </section>
            <section className='main_container'>
                <div className='purchase_container'>
                    {codePlaytype.map((type) => (
                        gameDetail.playtype && gameDetail.playtype.includes(type.codeId) && (
                            <div key={type.codeDv} className='purchase_type_container'>
                                <img className='purchase_type_img' src={`${API_BASE_URL}/resources/images/logo/service_${type.codeInfo}_logo.jpg`} alt={`${type.codeInfo} Logo`} />
                                <div className='btn_container'>
                                    <button className={`purchase_btn_${type.codeInfo}`} onClick={() => addToCart(item, type.codeId)}><span>장바구니</span></button>
                                    <button className={`purchase_btn_${type.codeInfo}`} onClick={() => goPayment(item, type.codeId)}><span>구매하기</span></button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <div className='info_container'>
                    <img className='info_img' src={`${API_BASE_URL}/resources/images/game/${gameDetail.titleImg}`} alt={item.titleImg} />
                    <div className='info_game_name_container'>
                        <div className='info_game_name'>{gameDetail.gameTitle}</div>
                        {isLoggedIn && loginInfo.userId && <LikedBtn item={item} />}
                    </div>
                    <div className='info_releasedate'>출시일 : {gameDetail.releaseDate}</div>
                    <TagList tags={item.tag} codeTag={codeTag} />
                </div>
            </section>
            <section className='requirements_container'>
                <h3>최소 요구 사항</h3>
                <hr />
                <div className='system_requirements_container'>
                    {rqmData.map((type, index) => (
                        <div key={index} className={`system_requirements_${type.division}`}>
                            <div style={{ fontWeight: 'bold' }}>{type.division === 'min' ? '최소' : '권장'}</div>
                            {type.opsys && <div>운영 체제 : {type.opsys}</div>}
                            {type.proc && <div>프로세서 : {type.proc}</div>}
                            {type.memory && <div>메모리 : {type.memory}</div>}
                            {type.graphics && <div>그래픽 : {type.graphics}</div>}
                            {type.scard && <div>사운드 카드 : {type.scard}</div>}
                            {type.dver && <div>DirectX 버전 : {type.dver}</div>}
                            {type.storage && <div>저장 공간 : {type.storage}</div>}
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
