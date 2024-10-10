import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../styles/InquiryForm.css';
import GenreCheckbox from './GenreCheckbox';
import FormInput from './FormInput';
import Modal from './Modal'; // 모달 컴포넌트 추가

const InquiryForm = () => {
  // 상태 변수 선언 및 초기화
  const [formData, setFormData] = useState({
    email: '',           // 이메일 입력 상태 변수
    inquiryType: '',     // 문의 유형 선택 상태 변수
    title: '',           // 제목 입력 상태 변수
    content: '',         // 문의 내용 입력 상태 변수
    platform: '',        // 게임 플랫폼 선택 상태 변수
    genres: []           // 선택된 게임 장르 배열 상태 변수
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 변수
  const [showModal, setShowModal] = useState(false); // 모달 보이기 상태 변수

  // 페이지 로드 시 실행되는 useEffect
  useEffect(() => {
    // localStorage에서 userData 가져오기
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      const user = JSON.parse(userData);
      // 이메일 정보를 폼 데이터에 적용
      setFormData(prevData => ({
        ...prevData,
        email: user.email || ''
      }));
      setIsLoggedIn(true); // 로그인 상태로 변경
    } else {
      setIsLoggedIn(false); // 로그인 상태가 아님
    }
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  // 입력 값 변경 시 호출되는 함수
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    // 해당 입력 값에 대한 상태 업데이트
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  }, [setFormData]);

  // 장르 선택/해제 시 호출되는 함수
  const toggleGenre = useCallback((genre) => {
    // 기존 장르 배열에 해당 장르가 있는지 확인
    const updatedGenres = formData.genres.includes(genre)
      ? formData.genres.filter(g => g !== genre) // 이미 선택된 장르일 경우 제거
      : [...formData.genres, genre]; // 선택되지 않은 장르일 경우 추가
    // 장르 정보 업데이트
    setFormData(prevData => ({
      ...prevData,
      genres: updatedGenres
    }));
  }, [formData.genres, setFormData]);

  // 폼 제출 시 실행되는 함수
  const handleSubmit = useCallback((event) => {
    event.preventDefault(); // 폼 기본 동작 방지
    // 비로그인 상태에서 제출 시 경고 메시지 출력 후 종료
    if (!isLoggedIn) {
      alert('로그인 후 이용해 주세요.');
      return;
    }
    // 새로운 문의 항목 생성
    const newArticle = {
      ...formData,
      id: Date.now(), // 고유 ID 생성
      date: new Date().toLocaleString() // 현재 날짜 및 시간
    };
    // localStorage에서 저장된 데이터 가져오기
    const storedData = JSON.parse(localStorage.getItem('inquiries')) || [];
    // 새로운 항목을 추가하여 업데이트된 데이터 생성
    const updatedData = [...storedData, newArticle];
    // localStorage에 업데이트된 데이터 저장
    localStorage.setItem('inquiries', JSON.stringify(updatedData));
    console.log('저장된 데이터:', updatedData);

    // 모달 보이기
    setShowModal(true);

    // 폼 데이터 초기화 (이메일 유지, 나머지 초기화)
    setFormData(prevData => ({
      ...prevData,
      inquiryType: '',     // 문의 유형 초기화
      title: '',           // 제목 초기화
      content: '',         // 문의 내용 초기화
      platform: '',        // 게임 플랫폼 초기화
      genres: []           // 선택된 게임 장르 배열 초기화
    }));
  }, [isLoggedIn, formData, setShowModal]); // 의존성 배열에 추가

  // 모달 닫기 함수
  const navigate = useNavigate();
  const closeModal = () => {
    setShowModal(false);
    navigate('/inquiry-view');

  };

  return (
    <div className="InquiryForm">
      {/* 문의 확인 페이지로 이동하는 링크 */}
      <Link to="/inquiry-view" className="inquiry-view-link">
        개인문의확인
      </Link>
      <div className="form-container">
        <h2>1:1 문의</h2>
        {/* 로그인 상태에 따른 폼 표시 */}
        {isLoggedIn ? (
          <form onSubmit={handleSubmit}>
            {/* 이메일 입력란 */}
            <FormInput
              label="이메일"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              readOnly // 읽기 전용 설정
            />
            <br />
            {/* 문의 유형 선택란 */}
            <FormInput
              label="문의 유형"
              type="select"
              name="inquiryType"
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
            {/* 제목 입력란 */}
            <FormInput
              label="제목"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <br />
            {/* 문의 내용 입력란 */}
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
            {/* 게임 플랫폼 선택란 */}
            <FormInput
              label="게임 플랫폼"
              type="select"
              name="platform"
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
            {/* 게임 장르 선택란 */}
            <div className="genres">
              <h3>게임 장르</h3>
              <div className="genre-checkboxes">
                {/* 장르 목록을 반복하여 체크박스로 표시 */}
                {['액션', '어드벤처', '롤플레잉', '스포츠', '전략', 'FPS', '기타'].map((genre) => (
                  <GenreCheckbox
                    key={genre}
                    genre={genre}
                    checked={formData.genres.includes(genre)}
                    onChange={() => toggleGenre(genre)} // 장르 선택/해제 처리 함수 호출
                  />
                ))}
              </div>
            </div>
            <br />
            {/* 폼 제출 버튼 */}
            <button type="submit" className="center-button">등록하기</button>
            <br />
          </form>
        ) : (
          // 로그인 되지 않은 상태에서의 경고 메시지
          <p className="warning-message">로그인 후 이용해 주세요.</p>
        )}
      </div>
      {/* 모달 컴포넌트 */}
      <Modal showModal={showModal} closeModal={closeModal} />
    </div>
  );
};

export default InquiryForm;
