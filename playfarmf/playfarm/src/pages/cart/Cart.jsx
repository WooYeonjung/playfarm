// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import InfoService from "../../service/infoService";
// import "../../styles/Cart.css";
// import "../../styles/button.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

// export default function Cart() {
//     useEffect(() => {
//         window.scrollTo({
//             top: 0
//         })
//     }, []);

//     const [loginUserId, setLoginUserId] = useState('');
//     const [cartData, setCartData] = useState([]);
//     const [selectedItems, setSelectedItems] = useState([]);
//     const [totalPrice, setTotalPrice] = useState(0);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const userInfo = JSON.parse(localStorage.getItem("userData"));
//             if (userInfo && userInfo.userid) {
//                 setLoginUserId(userInfo.userid);
//                 const cartJSON = localStorage.getItem('cartJSON');
//                 if (cartJSON) {
//                     const parsedCartData = JSON.parse(cartJSON);
//                     setCartData(parsedCartData);
//                     const selectedItems = parsedCartData.map(item => ({ gameId: item.gameId, playtype: item.playtype }));
//                     setSelectedItems(selectedItems);
//                 } else {
//                     await InfoService.getCartData(userInfo.userid)
//                         .then(res => {
//                             setCartData(res);
//                             const selectedItems = res.map(item => ({ gameId: item.gameId, playtype: item.playtype }));
//                             setSelectedItems(selectedItems);
//                             localStorage.setItem('cartJSON', JSON.stringify(res));
//                         })
//                         .catch(err => console.log(err));
//                 }
//             }
//         };
//         fetchUserData();
//     }, []);

//     const allCheckHandler = (checked) => {
//         if (checked) {
//             setSelectedItems(cartData.map(item => ({ gameId: item.gameId, playtype: item.playtype })));
//         } else {
//             setSelectedItems([]);
//         }
//     }

//     const onChangeHandler = (checked, gameId, playtype) => {
//         if (checked) {
//             const newSelectedItems = [...selectedItems, { gameId, playtype }];
//             setSelectedItems(newSelectedItems);
//         } else {
//             const newSelectedItems = selectedItems.filter(item => !(item.gameId === gameId && item.playtype === playtype));
//             setSelectedItems(newSelectedItems);
//         }
//     }

//     useEffect(() => {
//         calculatePaymentInfo();
//     }, [selectedItems]);

//     const calculatePaymentInfo = () => {
//         let total = selectedItems.reduce((acc, selectedItem) => {
//             const item = cartData.find(item => item.gameId === selectedItem.gameId && item.playtype === selectedItem.playtype);
//             return item ? acc + item.price : acc;
//         }, 0);

//         setTotalPrice(total);
//     };

//     const deleteItem = (gameId, playtype) => {
//         let userConfirmed = window.confirm('이 상품을 삭제하시겠습니까?');
//         if (userConfirmed) {
//             try {
//                 const updatedCartData = cartData.filter(item => !(item.gameId === gameId && item.playtype === playtype));
//                 setCartData(updatedCartData);
//                 const updatedSelectedItems = selectedItems.filter(item => !(item.gameId === gameId && item.playtype === playtype));
//                 setSelectedItems(updatedSelectedItems);

//                 localStorage.setItem('cartJSON', JSON.stringify(updatedCartData));
//             } catch (error) {
//                 console.error("상품 삭제 중 에러 발생:", error);
//             }
//         }
//     }

//     const deleteAll = () => {
//         let userConfirmed = window.confirm('전체 상품을 삭제하시겠습니까?');
//         if (userConfirmed) {
//             try {
//                 setCartData([]);
//                 setSelectedItems([]);

//                 localStorage.removeItem('cartJSON');
//             } catch (error) {
//                 console.error("상품 삭제 중 에러 발생:", error);
//             }
//         }
//     }

//     const navigate = useNavigate();

//     const onPay = () => {
//         if (selectedItems === null || selectedItems.length === 0) {
//             alert('장바구니가 비어있습니다.');
//             return;
//         } else {
//             navigate("/payment", { state: { selectedGames: selectedItems } });
//         }
//     }
//     function imgClick(gameId) {
//         navigate(`/store/detail/${gameId}`)
//     }

//     return (
//         <div className="cart_container" style={{ height: "auto" }}>
//             <div className='cart_title'>
//                 <h1>Cart</h1>
//             </div>
//             <div className="cartList_container">
//                 {cartData.length > 0 ? (
//                     <>
//                         <ul className="cartList_wrapper">
//                             <li className="cartList_head">
//                                 <span><input className="input" onChange={e => allCheckHandler(e.target.checked)} checked={selectedItems.length === cartData.length} type="checkbox" value="all" aria-label="모든 상품 선택" /></span>
//                                 <span>Title</span>
//                                 <span>Price</span>
//                                 <span>Image</span>
//                                 <span>delete</span>
//                             </li>
//                             {cartData.map((item, index) => (
//                                 <li key={`${item.gameId}_${item.playtype}`} className="cartList_body">
//                                     <span><input className="input" onChange={e => onChangeHandler(e.target.checked, item.gameId, item.playtype)} checked={selectedItems.some(selectedItem => selectedItem.gameId === item.gameId && selectedItem.playtype === item.playtype)} type="checkbox" value={item.gameId} aria-label={`${item.title} 선택`} /></span>
//                                     <p>{item.title}<br />{item.playtype === 'nintendo' && <span><img className="playtypeImg" src="/images/logo/service_nintendo_logo.jpg"></img></span>}
//                                         {item.playtype === 'playstation' && <span><img className="playtypeImg" src="/images/logo/service_playstation_logo.jpg"></img></span>}
//                                         {item.playtype === 'pc' && <span><img className="playtypeImg" src="/images/logo/service_pc_logo.jpg"></img></span>}
//                                     </p>
//                                     <span>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
//                                     <span><img src={require(`../../images/store/gameitem${parseInt(item.gameId)}.jpg`)} alt={item.title} onClick={() => imgClick(item.gameId)} /></span>
//                                     <button onClick={() => deleteItem(item.gameId, item.playtype)}><FontAwesomeIcon icon={faTrashCan} size="xl" /></button>
//                                 </li>
//                             ))}
//                             <div className="cartList_delete">
//                                 <button onClick={deleteAll}>전체 삭제</button>
//                             </div>
//                         </ul>
//                     </>
//                 ) : (
//                     <ul className="cartList_wrapper">
//                         <li className="cartList_head">
//                             <span><input className="input" onChange={e => allCheckHandler(e.target.checked)} checked={selectedItems.length === cartData.length} type="checkbox" value="all" aria-label="모든 상품 선택" /></span>
//                             <span>Title</span>
//                             <span>Price</span>
//                             <span>Image</span>
//                             <span>delete</span>
//                         </li>
//                         <div className="cartList_container cartList_empty">장바구니가 비어 있습니다.</div>
//                     </ul>
//                 )}
//                 <div className="cartList_detail">
//                     <div>
//                         <div>
//                             <h4>구매정보</h4>
//                         </div>
//                         <ul>
//                             <li>총 금액</li>
//                             <li>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</li>
//                         </ul>
//                     </div>
//                     <div>
//                         <button className="purchase_btn_cart" onClick={onPay}><span>구매하기</span></button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InfoService from "../../service/infoService";
import "../../styles/Cart.css";
import "../../styles/button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '../../service/context/AuthProvider';
import axios from "axios";
import { API_BASE_URL } from "../../service/app-config";


export default function Cart() {
    useEffect(() => {
        window.scrollTo({
            top: 0
        })
    }, []);
    const { loginInfo, setLoginInfo } = useAuth();
    const [loginUserId, setLoginUserId] = useState('');
    const [cartData, setCartData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {

        const fetchCartData = async () => {
            try {
                const token = loginInfo.token
                const response = await axios.get("/cart/cartlist", {
                    headers:
                    {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token,
                        // 'Host': '<calculated when request is sent>',
                        // 'User-Agent': 'PostmanRuntime/7.42.0',
                        // 'Accept': '*/*',
                        // 'Accept-Encoding': 'gzip, deflate, br',
                        // 'Connection': 'keep-alive'



                    }
                });
                console.log(response.data);
                setCartData(response.data);
                const selectedItems = response.map(item => ({ gameId: item.gameId, playtype: item.playtype }));
                setSelectedItems(selectedItems);
            } catch (err) {
                console.log('장바구니 정보를 가져오지 못했습니다.');
            }

        };
        // if()
        fetchCartData();
    }, []);


    // const fetchUserData = async () => {
    //     const userInfo = JSON.parse(localStorage.getItem("userData"));
    //     if (userInfo && userInfo.userid) {
    //         setLoginUserId(userInfo.userid);
    //         const cartJSON = localStorage.getItem('cartJSON');
    //         if (cartJSON) {
    //             const parsedCartData = JSON.parse(cartJSON);
    //             setCartData(parsedCartData);
    //             const selectedItems = parsedCartData.map(item => ({ gameId: item.gameId, playtype: item.playtype }));
    //             setSelectedItems(selectedItems);
    //         } else {
    //             await InfoService.getCartData(userInfo.userid)
    //                 .then(res => {
    //                     setCartData(res);
    //                     const selectedItems = res.map(item => ({ gameId: item.gameId, playtype: item.playtype }));
    //                     setSelectedItems(selectedItems);
    //                     localStorage.setItem('cartJSON', JSON.stringify(res));
    //                 })
    //                 .catch(err => console.log(err));
    //         }
    //     }
    // };
    const allCheckHandler = (checked) => {
        if (checked) {
            setSelectedItems(cartData.map(item => ({ gameId: item.gameId, playtype: item.playtype })));
        } else {
            setSelectedItems([]);
        }
    }

    const onChangeHandler = (checked, gameId, playtype) => {
        if (checked) {
            const newSelectedItems = [...selectedItems, { gameId, playtype }];
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
            const item = cartData.find(item => item.gameId === selectedItem.gameId && item.playtype === selectedItem.playtype);
            return item ? acc + item.price : acc;
        }, 0);

        setTotalPrice(total);
    };

    const deleteItem = (gameId, playtype) => {
        let userConfirmed = window.confirm('이 상품을 삭제하시겠습니까?');
        if (userConfirmed) {
            try {
                const updatedCartData = cartData.filter(item => !(item.gameId === gameId && item.playtype === playtype));
                setCartData(updatedCartData);
                const updatedSelectedItems = selectedItems.filter(item => !(item.gameId === gameId && item.playtype === playtype));
                setSelectedItems(updatedSelectedItems);

                localStorage.setItem('cartJSON', JSON.stringify(updatedCartData));
            } catch (error) {
                console.error("상품 삭제 중 에러 발생:", error);
            }
        }
    }

    const deleteAll = () => {
        let userConfirmed = window.confirm('전체 상품을 삭제하시겠습니까?');
        if (userConfirmed) {
            try {
                setCartData([]);
                setSelectedItems([]);

                localStorage.removeItem('cartJSON');
            } catch (error) {
                console.error("상품 삭제 중 에러 발생:", error);
            }
        }
    }

    const navigate = useNavigate();

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
                                    <span><input className="input" onChange={e => onChangeHandler(e.target.checked, item.gameId, item.playtype)} checked={selectedItems.some(selectedItem => selectedItem.gameId === item.gameId && selectedItem.playtype === item.playtype)} type="checkbox" value={item.gameId} aria-label={`${item.title} 선택`} /></span>
                                    <p>{item.gameTitle}<br />{item.playtype === 'nin' && <span><img className="playtypeImg" src="/images/logo/service_nintendo_logo.jpg"></img></span>}
                                        {item.playtype === 'ps' && <span><img className="playtypeImg" src="/images/logo/service_playstation_logo.jpg"></img></span>}
                                        {item.playtype === 'pc' && <span><img className="playtypeImg" src="/images/logo/service_pc_logo.jpg"></img></span>}
                                    </p>
                                    <span>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</span>
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
