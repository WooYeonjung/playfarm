import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../service/context/AuthProvider';
import '../../styles/InquiryForm.css';
import GenreCheckbox from './GenreCheckbox';
import FormInput from './FormInput';
import Modal from './Modal';
import axios from 'axios';
import { API_BASE_URL } from '../../service/app-config';

const InquiryForm = () => {
    const { loginInfo, setLoginInfo } = useAuth();  // loginInfo와 setLoginInfo를 가져옴
    const [formData, setFormData] = useState({
        email: '',
        inquiryType: '',
        title: '',
        content: '',
        platform: '',
        genres: [],
        userId: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [inquiryTypes, setInquiryTypes] = useState([]);  // 문의 유형 데이터 상태 추가
    const [platforms, setPlatforms] = useState([]);        // 게임 플랫폼 데이터 상태 추가
    const [genres, setGenres] = useState([]);             // 게임 장르 데이터 상태 추가
    const navigate = useNavigate();

    // 로그인 상태를 localStorage에서 확인하고, 없으면 logout 상태로 처리
    useEffect(() => {
        const storedLoginInfo = localStorage.getItem('loginInfo');
        if (storedLoginInfo) {
            setLoginInfo(JSON.parse(storedLoginInfo));
        }
    }, [setLoginInfo]);

    // 로그인 상태에 따른 formData 업데이트
    useEffect(() => {
        if (loginInfo) {
            setFormData((prevData) => ({
                ...prevData,
                email: loginInfo.email,
                userId: loginInfo.userId
            }));
        }
    }, [loginInfo]);

    // 서버에서 문의 유형, 플랫폼, 장르 데이터를 가져오는 useEffect
    useEffect(() => {
        const fetchData = async () => {
            try {
                const inquiryResponse = await axios.get(`${API_BASE_URL}/api/inquiry-codes/inquiry-types`);
                setInquiryTypes(inquiryResponse.data);

                const platformResponse = await axios.get(`${API_BASE_URL}/api/inquiry-codes/game-platforms`);  // 수정된 엔드포인트
                setPlatforms(platformResponse.data);

                const genreResponse = await axios.get(`${API_BASE_URL}/api/inquiry-codes/game-genres`);  // 수정된 엔드포인트
                setGenres(genreResponse.data);
            } catch (error) {
                console.error('서버에서 데이터를 받아오는 중 오류 발생:', error);
            }
        };

        fetchData();
    }, []);
    console.log(platforms);
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

        const { title, content, userId, inquiryType, platform, genres } = formData;

        const newInquiry = {
            userId: userId,
            inquiryType: inquiryType || '4',  // '기타'로 기본 값 설정
            title: title || 'Untitled',
            inquiryText: content || '',
            platformName: platform || 'Other',
            email: formData.email,
            gameGenre: genres,  // 장르 배열
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/api/inquiries`, newInquiry, {
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.status === 200) {
                setModalMessage("1:1 문의가 등록되었습니다.");
                setShowModal(true);
                navigate('/inquiry-view');
            } else {
                alert(`문의 제출에 실패했습니다: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Axios Error:', error);
            alert('서버와의 통신에 문제가 발생했습니다.');
        }
    }, [formData, loginInfo, navigate]);

    const closeModal = () => {
        setShowModal(false);
        navigate('/inquiry-view');
    };

    return (
        <div className="InquiryForm">
            <div className="form-container">
                <h2>1:1 문의</h2>

                <Link to="/inquiry-view" className="inquiry-view-link">개인문의확인</Link>

                {loginInfo ? (
                    <form onSubmit={handleSubmit}>
                        <FormInput
                            label="이메일"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            readOnly
                        />
                        <br />

                        {/* 문의 유형 추가 */}
                        <FormInput
                            label="문의 유형"
                            type="select"
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">선택하세요</option>
                            {inquiryTypes.length > 0 ? (
                                inquiryTypes.map((type) => (
                                    <option key={type.codeId} value={type.codeInfo}>{type.codeInfo}</option>
                                ))
                            ) : (
                                <option value="">문의 유형을 불러오는 중...</option>
                            )}
                        </FormInput>
                        <br />

                        <FormInput
                            label="제목"
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                        <br />

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

                        <FormInput
                            label="게임 플랫폼"
                            type="select"
                            name="platform"
                            value={formData.platform}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="">선택하세요</option>
                            {platforms.length > 0 ? (
                                platforms.map((platform) => (
                                    <option key={platform.codeId} value={platform.codeInfo}>{platform.codeInfo}</option>
                                ))
                            ) : (
                                <option value="">게임 플랫폼을 불러오는 중...</option>
                            )}
                        </FormInput>
                        <br />

                        <div className="genres">
                            <h3>게임 장르</h3>
                            <div className="genre-checkboxes">
                                {genres.length > 0 ? (
                                    genres.map((genre) => (
                                        <GenreCheckbox
                                            key={genre.codeId}
                                            genre={genre.codeInfo}
                                            checked={formData.genres.includes(genre.codeInfo)}
                                            onChange={() => toggleGenre(genre.codeInfo)}
                                            label={genre.codeInfo}
                                        />
                                    ))
                                ) : (
                                    <p>게임 장르를 불러오는 중...</p>
                                )}
                            </div>
                        </div>
                        <br />

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
