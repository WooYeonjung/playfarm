import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import InfoService from "../../service/infoService";
import '../../styles/Payment.css';
import axios from "axios";
import { useAuth } from '../../service/context/AuthProvider';
import { API_BASE_URL } from "../../service/app-config";

export default function Payment() {
    const { isLoggedIn, loginInfo, onLogout } = useAuth();
    const [payData, setPayData] = useState([]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [acknowledgeWarning, setAcknowledgeWarning] = useState(false);
    const [payTypeCode, setPayTypeCode] = useState([]);
    const [playtypeCode, setPlaytypeCode] = useState([]);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo({
            top: 0
        });

        const fetchCodeData = async () => {
            try {
                const payCodeResponse = await axios.get(`${API_BASE_URL}/code/codedv/paytype`);
                setPayTypeCode(payCodeResponse.data);

                const playTypeCodeResponse = await axios.get(`${API_BASE_URL}/code/codedv/playtype`);
                setPlaytypeCode(playTypeCodeResponse.data);
            } catch (error) {
                alert('코드 데이터를 가져오지 못했습니다.');
            }
        };

        fetchCodeData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            if (isLoggedIn && loginInfo.userId) {
                const selectedGames = location.state?.selectedGames;

                if (selectedGames && selectedGames.length > 0) {
                    // 장바구니에서 선택한 게임들만 필터링하여 가져오는 로직
                    const formattedGames = selectedGames.map(game => {
                        const matchedPlaytype = playtypeCode.find(code => code.codeId === game.playtype);
                        const playtype = matchedPlaytype ? matchedPlaytype.codeInfo : null;
                        return {
                            gameId: game.gameId,
                            playtype: playtype,
                            gameTitle: game.gameTitle,
                            titleImg: game.titleImg,
                            price: game.price,
                            discount: game.discount,
                            discendDate: game.discendDate
                        };
                    });
                    setPayData(formattedGames);
                } else {
                    // pay data 가져오는 로직
                    try {
                        const buyResponse = await axios.get(`${API_BASE_URL}/purchase/buy`, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + loginInfo.token,
                            }
                        });
                        const buyData = buyResponse.data;
                        const matchedPlaytype = playtypeCode.find(code => code.codeId === buyData.playtype);
                        const playtype = matchedPlaytype ? matchedPlaytype.codeInfo : null;

                        setPayData([{
                            ...buyData,
                            playtype: playtype
                        }]);
                    } catch (error) {
                        alert('구매 정보를 찾을 수 없습니다.');
                    }
                }
            }
        };

        fetchUserData();
    }, [isLoggedIn, loginInfo.userId, playtypeCode, location.state]);

    const handlePayment = async () => {
        // if (!isPaymentButtonEnabled) return;

        // const totalPrice = payData.reduce((total, item) => total + item.price, 0);
        const totalPrice = payData.reduce((total, item) => {
            const gameData = item.game ? item.game : item;
            const price = (gameData.discount > 0 && (gameData.discendDate !== null && new Date(gameData.discendDate) >= new Date()))
                ? gameData.price - (gameData.price * gameData.discount / 100)
                : gameData.price;

            return total + price;
        }, 0);

        const payMethodCode = payTypeCode.find(type => type.codeInfo === selectedPaymentMethod);


        const purchaseData = {
            userId: loginInfo.userId,
            totalPrice: totalPrice,
            payMethod: payMethodCode.codeId,
            listDetails: payData.map(item => {
                const payData = item.game ? item.game : item;
                const playtypeMatch = playtypeCode.find(type => type.codeInfo === item.playtype);
                const discountPrice = (payData.price - (payData.price * payData.discount / 100.0));
                const originalPrice = payData.price;

                return {
                    purchId: {
                        purchId: null,
                        gameId: payData.gameId,
                        playtype: playtypeMatch ? playtypeMatch.codeId : null
                    },
                    price: payData.discount > 0 && (payData.discendDate !== null || new Date(payData.discendDate) >= new Date()) ?
                        discountPrice : originalPrice
                    // purchaselist: null
                }
            })
        };
        try {
            await axios.post(`${API_BASE_URL}/purchase/completed`, purchaseData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + loginInfo.token,
                }
            });

            //ESLint 규칙 비활성화
            // eslint-disable-next-line no-restricted-globals
            const paymentConfirm = confirm('결제가 완료되었습니다! 지금 게임하러 가시겠습니까?');
            if (paymentConfirm) {
                navigate('/mygame')
            } else {
                navigate('/')
            }

            //모달 라이브러리 사용. import와 install 필요!
            // confirmAlert({
            //     title: '결제 완료',
            //     message: '결제가 완료되었습니다! 지금 게임하러 가시겠습니까?',
            //     buttons: [
            //         {
            //             label: '예',
            //             onClick: () => navigate('/list3')
            //         },
            //         {
            //             label: '아니오',
            //             onClick: () => navigate('/')
            //         }
            //     ]
            // });
            // import { confirmAlert } from 'react-confirm-alert'; // npm install react-confirm-alert
            // import 'react-confirm-alert/src/react-confirm-alert.css';
        } catch (error) {
            console.error('결제 처리 중 오류가 발생했습니다.', error);
        }

        // eslint-disable-next-line no-restricted-globals
        // let paymentConfirm = confirm('결제가 완료되었습니다! 지금 게임하러 가시겠습니까?');
        // if (paymentConfirm) {
        //     navigate('/list3')
        // } else {
        //     navigate('/')
        // }
        // return;
    };

    const isPaymentButtonEnabled = acknowledgeWarning && selectedPaymentMethod !== '';
    let method = selectedPaymentMethod;

    return (
        <div>
            <h1 className="payment_h1">Payment</h1>
            <div className="payment_container">
                <div className="paymentList_container">
                    <div className="paymentList_wrapper">
                        <div className="paymentList_head">
                            <div>Image</div>
                            <div>Title</div>
                            <div>Playtype</div>
                            <div>Price</div>
                        </div>
                        {/* {payData.length > 1 ? payData.map((item) => (
                            <div key={item.id} className="paymentList_body">
                                <div className="paymentList_img"><img src={`/images/game/${item.titleImg}`} alt={item.title} /></div>
                                <div className="paymentList_title">{item.gameTitle}</div>
                                <div className="paymentList_playtype">
                                    <img
                                        src={`${API_BASE_URL}/resources/images/logo/service_${item.playtype}_logo.jpg`}
                                        alt={`${item.playtype} logo`}
                                    />
                                </div>
                                {(item.discount > 0 && (item.discendDate !== null || new Date(item.discendDate) >= new Date())) ?
                                    <div className="paymentList_price">
                                        {(item.price - (item.price * item.discount / 100.0))
                                            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div> : <div className="paymentList_price">{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                }
                            </div>
                        )) : payData.map((item) => (
                            <div key={item.game.gameId} className="paymentList_body">
                                <div className="paymentList_img"><img src={`/images/game/${item.game.titleImg}`} alt={item.title} /></div>
                                <div className="paymentList_title">{item.game.gameTitle}</div>
                                <div className="paymentList_playtype">
                                    <img src={`/images/logo/service_${item.playtype}_logo.jpg`} alt={`${item.playtype} logo`} />
                                </div>
                                {(item.game.discount > 0 && (item.game.discendDate !== null || new Date(item.game.discendDate) >= new Date())) ?
                                    <div className="paymentList_price">
                                        {(item.game.price - (item.game.price * item.game.discount / 100.0))
                                            .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </div> : <div className="paymentList_price">{item.game.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
                                }
                            </div>
                        ))} */}
                        {payData.map((item) => {
                            const gameData = item.game ? item.game : item;
                            // const isMultiple = payData.length > 1;
                            // const gameData = isMultiple ? item : item.game; // gameData를 상황에 따라 다르게 설정
                            const discountPrice = (gameData.price - (gameData.price * gameData.discount / 100.0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                            const originalPrice = gameData.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

                            return (
                                <div key={gameData.gameId} className="paymentList_body">
                                    <div className="paymentList_img">
                                        <img src={`${API_BASE_URL}/resources/images/game/${gameData.titleImg}`} alt={gameData.gameTitle} />
                                    </div>
                                    <div className="paymentList_title">{gameData.gameTitle}</div>
                                    <div className="paymentList_playtype">
                                        <img src={`${API_BASE_URL}/resources/images/logo/service_${item.playtype}_logo.jpg`} alt={`${item.playtype} logo`} />
                                    </div>
                                    {(gameData.discount > 0 && (gameData.discendDate !== null || new Date(gameData.discendDate) >= new Date())) ? (
                                        <div className="paymentList_price">{discountPrice}</div>
                                    ) : (
                                        <div className="paymentList_price">{originalPrice}</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="paymentList_detail">
                        <div>
                            <h4>결제정보</h4>
                            <div>{`${method}`}</div>
                        </div>
                        <div>
                            <p>수량</p><p>{payData.length}</p>
                        </div>
                        <div>
                            <p>총 금액</p>
                            <p>
                                {payData.reduce((total, item) => {
                                    const gameData = item.game ? item.game : item;

                                    const price = (gameData.discount > 0 && (gameData.discendDate !== null && new Date(gameData.discendDate) >= new Date()))
                                        ? gameData.price - (gameData.price * gameData.discount / 100)
                                        : gameData.price;

                                    return total + price;
                                }, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <h2>Payment Method</h2>
                    <div className="paymentMethod_container">
                        <div className="choose_paymentMethod">
                            <p>Please select a payment method</p>
                            <select
                                className="payment_selectbox"
                                value={selectedPaymentMethod}
                                onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                            >
                                <option value="payment method" disabled={selectedPaymentMethod !== ''}>결제 방식</option>
                                {payTypeCode.map((item) => (
                                    <option value={item.codeInfo}>{item.codeInfo}</option>
                                ))}

                                {/* <option value="visa">Visa</option>
                                <option value="mastercard">MasterCard</option>
                                <option value="mobile">Mobile Payment</option>
                                <option value="toss">Toss</option>
                                <option value="kakaopay">KakaoPay</option> */}
                            </select>
                        </div>
                        <div className="warning_message">
                            <div className="checkbox-wrapper">
                                <span className="checkbox">
                                    <input
                                        type="checkbox"
                                        checked={acknowledgeWarning}
                                        onChange={(e) => setAcknowledgeWarning(e.target.checked)}
                                    />
                                    <svg>
                                        <use href="#checkbox-30" className="checkbox"></use>
                                    </svg>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}>
                                    <symbol id="checkbox-30" viewBox="0 0 22 22">
                                        <path fill="none" stroke="currentColor" d="M5.5,11.3L9,14.8L20.2,3.3l0,0c-0.5-1-1.5-1.8-2.7-1.8h-13c-1.7,0-3,1.3-3,3v13c0,1.7,1.3,3,3,3h13c1.7,0,3-1.3,3-3v-13c0-0.4-0.1-0.8-0.3-1.2" />
                                    </symbol>
                                </svg>
                            </div>
                            <div>
                                <p><strong>다운로드 구입</strong>에 관한 주의 사항을 확인했습니다. (다운로드 상품은 실물로 배송되지 않는 상품입니다.)</p>
                                <div>
                                    <p>- Nintendo Switch 소프트웨어를 다운로드하기 위해서는 국가/지역이 대한민국인 성인(19세가 되는 해의 1월 1일부터 해당)의 [닌텐도 어카운트]가 필요합니다.</p>
                                    <p>- 다운로드 상품의 경우 구매하신 닌텐도 어카운트로 [지금 다운로드]를 클릭하면 해당 콘텐츠가 구매하신 닌텐도 어카운트로 다운로드됩니다. 다운로드 번호로는 전송되지 않으며, [지금 다운로드] 후에는 환불이 불가능합니다.</p>
                                    <p>- 해당 페이지에서 구입하신 다운로드 상품은 양도가 불가하며, 구입하신 계정에서만 사용이 가능합니다.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={!isPaymentButtonEnabled}
                        className={`payment_button ${isPaymentButtonEnabled ? 'active' : 'disabled'}`}
                    >
                        <span>결제하기</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
