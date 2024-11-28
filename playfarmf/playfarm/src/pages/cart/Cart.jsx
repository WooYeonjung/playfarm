import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import InfoService from "../../service/infoService";
import "../../styles/Cart.css";
import "../../styles/button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../service/context/AuthProvider';
import axios from "axios";
import { API_BASE_URL } from "../../service/app-config";


export default function Cart() {

    const { loginInfo, isLoggedIn, setLoginInfo } = useAuth();
    const [loginUserId, setLoginUserId] = useState('');
    const [cartData, setCartData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const navigate = useNavigate();
    // useEffect(() => {


    // }, []);
    useEffect(() => {

        window.scrollTo({
            top: 0
        });
        const fetchCartData = async () => {
            try {
                const token = loginInfo.token
                const response = await axios.get(`${API_BASE_URL}/cart/cartlist`, {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    }
                });
                // console.log(response.data)
                setCartData(response.data);
                const selectedItems = response.data.map(item => ({
                    gameId: item.gameId,
                    playtype: item.playtype, gameTitle: item.gameTitle, titleImg: item.titleImg,
                    price: item.price, discount: item.discount, discendDate: item.discendDate
                }));
                setSelectedItems(selectedItems);
            } catch (err) {
                if (cartData) {

                } else {
                    alert('장바구니 정보를 가져오지 못했습니다.');
                }

            }
        };
        // if()
        if (loginInfo) {
            fetchCartData();
        }
    }, [loginInfo]);

    // 전체선택
    const allCheckHandler = (checked) => {
        if (checked) {
            setSelectedItems(cartData.map(item => ({
                gameId: item.gameId,
                playtype: item.playtype, gameTitle: item.gameTitle, titleImg: item.titleImg,
                price: item.price, discount: item.discount, discendDate: item.discendDate
            })));
        } else {
            setSelectedItems([]);
        }
    }

    // 체크박스 상테 변화
    const onChangeHandler = (checked, gameId, playtype, gameTitle, titleImg, price, discount, discendDate) => {
        if (checked) {
            const newSelectedItems = [...selectedItems, { gameId, playtype, gameTitle, titleImg, price, discount, discendDate }];
            setSelectedItems(newSelectedItems);
        } else {
            const newSelectedItems = selectedItems.filter(item => !(item.gameId === gameId && item.playtype === playtype));
            setSelectedItems(newSelectedItems);
        }
    }

    useEffect(() => {
        calculatePaymentInfo();
    }, [selectedItems]);

    const calculatePaymentInfo = () => {
        let total = selectedItems.reduce((acc, selectedItem) => {
            const item = cartData.find(item => item.gameId === selectedItem.gameId && item.playtype === selectedItem.playtype &&
                item.gameTitle === selectedItem.gameTitle && item.titleImg === selectedItem.titleImg && selectedItem.price === item.price &&
                item.discount === selectedItem.discount && item.discendDate === selectedItem.discendDate
            );
            if (item) {
                const discountedPrice = item.discount > 0 && (item.discendDate !== null || new Date(item.discendDate) >= new Date()) ?
                    item.price - (item.price * item.discount / 100.0) : item.price;
                return acc + discountedPrice;
            }
            return acc;
        }, 0);

        setTotalPrice(total);
    };

    const deleteItem = async (gameId, playtype) => {
        let userConfirmed = window.confirm('이 상품을 삭제하시겠습니까?');
        // console.log(selectedItems);
        if (userConfirmed) {
            try {
                const token = loginInfo.token
                const response = await axios.delete(`${API_BASE_URL}/cart/cartdelete`, {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    data: selectedItems
                });
                alert(response.data);
                window.location.reload();

            } catch (error) {
                alert('상품 삭제 중 에러 발생가 발생하였습니다.');
            }
        }
    }

    const deleteAll = async () => {
        let userConfirmed = window.confirm('전체 상품을 삭제하시겠습니까?');
        if (userConfirmed) {
            try {

                const token = loginInfo.token
                const response = await axios.delete(`${API_BASE_URL}/cart/cartdelete`, {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                    data: selectedItems
                });
                alert(response.data);
                window.location.reload();
                setCartData([]);
                setSelectedItems([]);
            } catch (error) {
                console.error("상품 삭제 중 에러 발생:", error);
            }
        }
    }



    const onPay = () => {
        if (selectedItems === null || selectedItems.length === 0) {
            alert('장바구니가 비어있습니다.');
            return;
        } else {
            navigate("/payment", { state: { selectedGames: selectedItems } });
        }
    }
    function imgClick(gameId) {
        navigate(`/store/detail/${gameId}`)
    }
    //console.log(selectedItems)
    return (
        <div className="cart_container" style={{ height: "auto" }}>
            <div className='cart_title'>
                <h1>Cart</h1>
            </div>
            <div className="cartList_container">
                {cartData.length > 0 ? (
                    <>
                        <ul className="cartList_wrapper">
                            <li className="cartList_head">
                                <span><input className="input" onChange={e => allCheckHandler(e.target.checked)} checked={selectedItems.length === cartData.length} type="checkbox" value="all" aria-label="모든 상품 선택" /></span>
                                <span>Title</span>
                                <span>Price</span>
                                <span>Image</span>
                                <span>delete</span>
                            </li>
                            {cartData.map((item, index) => (
                                <li key={`${item.gameId}_${item.playtype}`} className="cartList_body">
                                    <span>
                                        <input className="input"
                                            onChange={e => onChangeHandler(e.target.checked, item.gameId, item.playtype,
                                                item.gameTitle, item.titleImg, item.price, item.discount, item.discendDate)}
                                            checked={selectedItems.some(selectedItem => selectedItem.gameId === item.gameId &&
                                                selectedItem.playtype === item.playtype)}
                                            type="checkbox"
                                            value={item.gameId}
                                            aria-label={`${item.title} 선택`}
                                        />
                                    </span>
                                    <p>{item.gameTitle}<br />{item.playtype === 'nin' && <span><img className="playtypeImg" src={`${API_BASE_URL}/resources/images/logo/service_nintendo_logo.jpg`}></img></span>}
                                        {item.playtype === 'ps' && <span><img className="playtypeImg" src={`${API_BASE_URL}/resources/images/logo/service_playstation_logo.jpg`}></img></span>}
                                        {item.playtype === 'pc' && <span><img className="playtypeImg" src={`${API_BASE_URL}/resources/images/logo/service_pc_logo.jpg`}></img></span>}
                                    </p>
                                    {item.discount > 0 && (item.discendDate !== null || new Date(item.discendDate) >= new Date()) ?
                                        <span>
                                            {(item.price - (item.price * item.discount / 100.0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        </span> : <span>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
                                    }
                                    {/* <span>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span> */}
                                    <span><img src={`${API_BASE_URL}/resources/images/game/${item.titleImg}`} alt={item.title} onClick={() => imgClick(item.gameId)} /></span>
                                    <button onClick={() => deleteItem(item.gameId, item.playtype)}><FontAwesomeIcon icon={faTrashCan} size="xl" /></button>
                                </li>
                            ))}
                            <div className="cartList_delete">
                                <button onClick={deleteAll}>전체 삭제</button>
                            </div>
                        </ul>
                    </>
                ) : (
                    <ul className="cartList_wrapper">
                        <li className="cartList_head">
                            <span><input className="input" onChange={e => allCheckHandler(e.target.checked)} checked={selectedItems.length === cartData.length} type="checkbox" value="all" aria-label="모든 상품 선택" /></span>
                            <span>Title</span>
                            <span>Price</span>
                            <span>Image</span>
                            <span>delete</span>
                        </li>
                        <div className="cartList_container cartList_empty">장바구니가 비어 있습니다.</div>
                    </ul>
                )}
                <div className="cartList_detail">
                    <div>
                        <div>
                            <h4>구매정보</h4>
                        </div>
                        <ul>
                            <li>총 금액</li>
                            <li>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
                        </ul>
                    </div>
                    <div>
                        <button className="purchase_btn_cart" onClick={onPay}><span>구매하기</span></button>
                    </div>
                </div>
            </div>
        </div>
    );
}
