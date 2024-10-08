import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/InquiryForm.css'; // CSS 스타일 import
import GenreCheckbox from './GenreCheckbox'; // 장르 체크박스 컴포넌트
import FormInput from './FormInput'; // 폼 입력 컴포넌트
import Modal from './Modal'; // 모달 컴포넌트
import { useAuth } from '../../service/context/AuthProvider'; // 인증 컨텍스트 import
import axios from 'axios'; // axios 라이브러리 import

const InquiryForm = () => {
    const { isLoggedIn, loginInfo } = useAuth(); // 로그인 상태 및 정보 가져오기
    const [formData, setFormData] = useState({ // 폼 데이터 상태
        email: '',
        inquiryType: '',
        title: '',
        inquiryText: '',
        platform: '',
        genres: []
    });

    const [showModal, setShowModal] = useState(false); // 모달 표시 상태
    const navigate = useNavigate(); // navigate 함수 가져오기

    useEffect(() => {
        // 사용자가 로그인하면 이메일을 폼 데이터에 설정
        if (isLoggedIn && loginInfo) {
            setFormData(prevData => ({
                ...prevData,
                email: loginInfo.email || '' // 로그인 정보에서 이메일 설정
            }));
        }
    }, [isLoggedIn, loginInfo]); // 로그인 상태 또는 정보가 변경될 때마다 실행

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target; // 입력값에서 name과 value 가져오기
        setFormData(prevData => ({
            ...prevData,
            [name]: value // 해당 name에 대한 값을 업데이트
        }));
    }, []);

    const toggleGenre = useCallback((genre) => {
        // 장르 체크박스 클릭 시 장르 배열 업데이트
        const updatedGenres = formData.genres.includes(genre)
            ? formData.genres.filter(g => g !== genre) // 장르가 이미 포함되어 있으면 제거
            : [...formData.genres, genre]; // 포함되어 있지 않으면 추가

        setFormData(prevData => ({
            ...prevData,
            genres: updatedGenres // 업데이트된 장르 설정
        }));
    }, [formData.genres]);

    const handleSubmit = useCallback(async (event) => {
        event.preventDefault(); // 기본 폼 제출 이벤트 방지

        if (!isLoggedIn) {
            alert('로그인 후 이용해 주세요.'); // 로그인 상태가 아닐 경우 경고
            return;
        }

        const userId = loginInfo.userId; // 사용자 ID 설정

        const newInquiry = {
            userId: userId,
            inquiryType: formData.inquiryType.trim(),
            title: formData.title.trim() || '제목 없음',
            inquiryText: formData.inquiryText.trim(),
            platformName: formData.platform.trim(),
            email: formData.email,
            gameGenre: formData.genres,
        };

        // 필수 필드 확인
        if (!newInquiry.inquiryType || !newInquiry.title || !newInquiry.inquiryText || !newInquiry.platformName || newInquiry.gameGenre.length === 0) {
            alert('모든 필드를 입력해 주세요. (문의 내용과 최소 하나의 장르는 필수입니다)');
            return;
        }

        try {
            // 서버에 새로운 문의 저장
            const response = await axios.post('/api/inquiries', newInquiry);
            console.log('서버에 저장된 데이터:', response.data);
            setShowModal(true); // 모달 표시
            // 폼 초기화
            setFormData({
                email: formData.email,
                inquiryType: '',
                title: '',
                inquiryText: '',
                platform: '',
                genres: []
            });
        } catch (error) {
            console.error('문의 저장 실패:', error.response ? error.response.data : error.message);
            alert('문의를 저장하는 데 실패했습니다: ' + (error.response ? error.response.data : error.message));
        }
    }, [isLoggedIn, formData, loginInfo]);

    const closeModal = () => {
        setShowModal(false); // 모달 닫기
        navigate('/inquiry-view'); // 문의 확인 페이지로 이동
    };

    return (
        <div className="InquiryForm">
            <Link to="/inquiry-view" className="inquiry-view-link">개인문의확인</Link>
            <div className="form-container">
                <h2>1:1 문의</h2>
                {isLoggedIn ? (
                    <form onSubmit={handleSubmit}>
                        {/* 이메일 입력 */}
                        <FormInput
                            label="이메일"
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            readOnly
                        />
                        <br />
                        {/* 문의 유형 선택 */}
                        <FormInput
                            label="문의 유형"
                            type="select"
                            name="inquiryType"
                            id="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">선택하세요</option>
                            <option value="상품 문의">상품 문의</option>
                            <option value="결제/환불">결제/환불</option>
                            <option value="컴퓨터/기술">컴퓨터/기술</option>
                            <option value="기타">기타</option>
                        </FormInput>
                        <br />
                        {/* 제목 입력 */}
                        <FormInput
                            label="제목"
                            type="text"
                            name="title"
                            id="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                        <br />
                        {/* 문의 내용 입력 */}
                        <FormInput
                            label="문의 내용"
                            type="textarea"
                            name="inquiryText"
                            id="inquiryText"
                            value={formData.inquiryText}
                            onChange={handleInputChange}
                            required
                            className="input-content"
                        />
                        <br />
                        {/* 게임 플랫폼 선택 */}
                        <FormInput
                            label="게임 플랫폼"
                            type="select"
                            name="platform"
                            id="platform"
                            value={formData.platform}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">선택하세요</option>
                            <option value="PC">PC</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="Nintendo Switch">Nintendo Switch</option>
                        </FormInput>
                        <br />
                        {/* 장르 선택 */}
                        <div className="genres">
                            <h3>게임 장르</h3>
                            <div className="genre-checkboxes">
                                {['액션', '어드벤처', '롤플레잉', '스포츠', '전략', 'FPS'].map((genre) => (
                                    <GenreCheckbox
                                        key={genre}
                                        genre={genre}
                                        checked={formData.genres.includes(genre)}
                                        onChange={() => toggleGenre(genre)}
                                    />
                                ))}
                            </div>
                        </div>
                        <br />
                        <button type="submit" className="center-button">등록하기</button>
                        <br />
                    </form>
                ) : (
                    <div className="login-message">로그인 후 이용해 주세요.</div> // 로그인하지 않은 경우 메시지 표시
                )}
            </div>
            <Modal showModal={showModal} closeModal={closeModal} /> 
            {/* 문의 등록 후 모달 표시 */}
        </div>
    );
};

export default InquiryForm;
