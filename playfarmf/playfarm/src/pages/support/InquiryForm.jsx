import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../service/context/AuthProvider';
import '../../styles/InquiryForm.css';
import GenreCheckbox from './GenreCheckbox';
import FormInput from './FormInput';
import Modal from './Modal';
import axios from 'axios';

const InquiryForm = () => {
    const { loginInfo } = useAuth();  // setLoginInfo를 제거하고 loginInfo만 사용
    const [formData, setFormData] = useState({
        email: '',  // 초기값을 빈 문자열로 설정
        inquiryType: '',  // 문의 유형의 codeid 값을 저장
        title: '',
        content: '',
        platform: '',  // 게임 플랫폼의 codeid 값을 저장
        genres: [],  // 체크된 장르의 codeid 값을 배열로 저장
        userId: ''  // 로그인된 유저 정보
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();

    // 고정된 데이터
    const inquiryTypes = [
        { codeid: '1', codeinfo: '상품 문의' },
        { codeid: '2', codeinfo: '결제/환불' },
        { codeid: '3', codeinfo: '컴퓨터/기술' },
        { codeid: '4', codeinfo: '기타' }
    ];

    const platforms = [
        { codeid: 'PC', codeinfo: 'PC' },
        { codeid: 'PS', codeinfo: 'PlayStation' },
        { codeid: 'NS', codeinfo: 'Nintendo Switch' }
    ];

    const genres = [
        { codeid: 'Action', codeinfo: 'Action' },
        { codeid: 'Adventure', codeinfo: 'Adventure' },
        { codeid: 'Horror', codeinfo: 'Horror' },
        { codeid: 'RPG', codeinfo: 'RPG' },
        { codeid: 'Simulation', codeinfo: 'Simulation' },
        { codeid: 'Strategy', codeinfo: 'Strategy' },
        { codeid: 'Survival', codeinfo: 'Survival' }
    ];

    // useEffect로 로그인 정보 가져오기
    useEffect(() => {
        if (loginInfo) {
            setFormData((prevData) => ({
                ...prevData,
                email: loginInfo.email,  // 로그인 정보로 이메일 자동 세팅
                userId: loginInfo.userId  // 로그인 정보로 유저 아이디 세팅
            }));
        }
    }, [loginInfo]);

    // 입력값 처리
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }, []);

    // 장르 체크박스 토글 처리
    const toggleGenre = useCallback((genre) => {
        setFormData((prevData) => {
            const updatedGenres = prevData.genres.includes(genre)
                ? prevData.genres.filter((g) => g !== genre)
                : [...prevData.genres, genre];
            return { ...prevData, genres: updatedGenres };
        });
    }, []);

    // 폼 제출 처리
    const handleSubmit = useCallback(async (event) => {
        event.preventDefault();

        if (!loginInfo) {
            alert('로그인 후 이용해 주세요.');
            return;
        }

        const { title, content } = formData;

        // 로컬 스토리지에서 마지막 문의 내역을 가져와서 중복 여부를 확인
        const previousInquiry = JSON.parse(localStorage.getItem('lastInquiry')) || {};

        // 제목과 내용이 동일한지 확인
        if (previousInquiry.title === title && previousInquiry.content === content) {
            alert('같은 제목과 내용으로 문의가 이미 등록되었습니다.');
            return;
        }

        const newInquiry = {
            userId: formData.userId,
            inquiryType: formData.inquiryType || '기타',  // inquiryType은 codeid로 전송
            title: title || 'Untitled',
            inquiryText: content || '',
            platformName: formData.platform || 'Other',  // platform은 codeid로 전송
            email: formData.email,
            gameGenre: formData.genres,  // 장르는 배열로 전송
        };

        try {
            const response = await axios.post('http://localhost:8080/api/inquiries', newInquiry, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                setModalMessage("1:1 문의가 등록되었습니다.");
                setShowModal(true);

                // 로컬 스토리지에 마지막 문의를 저장
                localStorage.setItem('lastInquiry', JSON.stringify({ title, content }));

                // 폼 제출 후 '개인문의확인' 페이지로 이동
                navigate('/inquiry-view');
            } else {
                alert(`문의 제출에 실패했습니다: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Axios Error:', error);
            alert('서버와의 통신에 문제가 발생했습니다.');
        }
    }, [formData, loginInfo, navigate]);

    // 모달 닫기
    const closeModal = () => {
        setShowModal(false);
        navigate('/inquiry-view');
    };

    return (
        <div className="InquiryForm">
            <div className="form-container">
                <h2>1:1 문의</h2>

                {/* 문의 확인 페이지로 이동하는 링크 */}
                <Link to="/inquiry-view" className="inquiry-view-link">
                    개인문의확인
                </Link>

                {loginInfo ? (
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="이메일"
                            type="email"
                            name="email"
                            value={formData.email}  // 로그인된 이메일 자동으로 입력
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
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">선택하세요</option>
                            {inquiryTypes.map((type) => (
                                <option key={type.codeid} value={type.codeid}>
                                    {type.codeinfo}
                                </option>
                            ))}
                        </FormInput>
                        <br />

                        {/* 제목 입력 */}
                        <FormInput
                            label="제목"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                        <br />

                        {/* 문의 내용 입력 */}
                        <FormInput
                            label="문의 내용"
                            type="textarea"
                            name="content"
                            value={formData.content}
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
                            value={formData.platform}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">선택하세요</option>
                            {platforms.map((platform) => (
                                <option key={platform.codeid} value={platform.codeid}>
                                    {platform.codeinfo}
                                </option>
                            ))}
                        </FormInput>
                        <br />

                        {/* 게임 장르 체크박스 */}
                        <div className="genres">
                            <h3>게임 장르</h3>
                            <div className="genre-checkboxes">
                                {genres.map((genre) => (
                                    <GenreCheckbox
                                        key={genre.codeid}
                                        genre={genre.codeid}
                                        checked={formData.genres.includes(genre.codeid)}
                                        onChange={() => toggleGenre(genre.codeid)}
                                    />
                                ))}
                            </div>
                        </div>
                        <br />

                        {/* 등록하기 버튼 */}
                        <button type="submit" className="center-button">등록하기</button>
                        <br />
                    </form>
                ) : (
                    <p className="warning-message">로그인 후 이용해 주세요.</p>
                )}
            </div>

            <Modal
                showModal={showModal}
                closeModal={closeModal}
                message={modalMessage}
            />
        </div>
    );
};

export default InquiryForm;
