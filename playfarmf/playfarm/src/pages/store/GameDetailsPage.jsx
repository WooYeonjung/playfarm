import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate, useParams } from "react-router-dom";
import games from "./gameListData";
import '../../styles/GameDetailsPage.css';
import LikedBtn from '../mypage/ItemLike';
import axios from 'axios';

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
const TagList = ({ tags }) => (
    <div className='info_tag_list'>
        {tags.map((t, idx) => (
            <div key={idx} className='tag_item'>
                <span>{t}</span>
            </div>
        ))}
    </div>
);

export default function GameDetailsPage({ gameId }) {
    // Scroll to top on first render
    useEffect(() => {
        window.scrollTo({
            top: 0
        })
    }, []);

    const [gameDetail, setGameDetail] = useState([]);
    useEffect(() => {
        const fetchGameDetail = async () => {
            try {
                const response = await axios.get(`/game/gamedetail/${id}`);
                setGameDetail(response.data);
            } catch (error) {
                console.error('게임 세부 정보를 가져오는 데 실패했습니다:', error);
            }
        };
        fetchGameDetail();
    }, [gameId]);

    console.log(gameDetail);
    const { id } = useParams();
    const item = games.find((item) => item.id === parseInt(id));
    // const item = gamedetail;
    // console.log(item);

    const [ref, inView] = useIntersectionObserver(0.1);
    const navigatePayment = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem("userData"));

    const addToCart = (item, type) => {
        if (!userInfo || !userInfo.userid) {
            let loginConfirm = window.confirm('로그인 후 이용 가능. 로그인 하시겠습니까?');
            if (loginConfirm) {
                navigatePayment('/login')
            }
            return; // 로그인 페이지로 이동하는 경우 함수 종료
        }

        let data = {
            "gameId": item.id,
            "userid": userInfo.userid,
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
        if (!userInfo || !userInfo.userid) {
            let loginConfirm = window.confirm('로그인 후 이용 가능. 로그인 하시겠습니까?');
            if (loginConfirm) {
                navigatePayment('/login')
            }
            return; // 로그인 페이지로 이동하는 경우 함수 종료
        }

        let data = {
            "gameId": item.id,
            "userid": userInfo.userid,
            "title": item.title,
            "playtype": type,
            "src": item.src_title,
            "price": item.price
        };

        let payData = JSON.parse(localStorage.getItem('pay')) || [];
        const existingIndex = payData.findIndex(pay => pay.userid === userInfo.userid);

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
                <img className="game_title_image" src={`/images/game/title${gameDetail.gameId}.jpg`} alt={item.title} />
                <div className={`game_title_content ${inView ? 'show' : ''}`} ref={ref}>
                    {gameDetail.detailCon}
                </div>
            </section>
            <section className='detail_container'>
                {['detail1', 'detail2', 'detail3'].map((detail, index) => (
                    <DetailItem
                        key={index}
                        src={item[`src_${detail}`]}
                        name={item[`${detail}_name`]}
                        content={item[`${detail}_content`]}
                    />
                ))}
            </section>
            <section className='main_container'>
                <div className='purchase_container'>
                    {['nintendo', 'playstation', 'pc'].map((type) => (
                        item.playtype.includes(type) && (
                            <div key={type} className='purchase_type_container'>
                                <img className='purchase_type_img' src={`/images/logo/service_${type}_logo.jpg`} alt={`${type} Logo`} />
                                <div className='btn_container'>
                                    <button className={`purchase_btn_${type}`} onClick={() => addToCart(item, type)}><span>장바구니</span></button>
                                    <button className={`purchase_btn_${type}`} onClick={() => goPayment(item, type)}><span>구매하기</span></button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <div className='info_container'>
                    <img className='info_img' src={`/images/game/gameitem${gameDetail.gameId}.jpg`} alt={item.title} />
                    <div className='info_game_name_container'>
                        <div className='info_game_name'>{gameDetail.gameTitle}</div>
                        {userInfo && userInfo.userid && <LikedBtn item={item} />}
                    </div>
                    <div className='info_releasedate'>출시일 : {gameDetail.releaseDate}</div>
                    <TagList tags={item.tag} />
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
