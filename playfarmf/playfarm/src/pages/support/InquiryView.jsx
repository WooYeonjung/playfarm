import React, { useEffect, useState, useCallback } from 'react';
import InquiryList from './InquiryList';
import '../../styles/InquiryView.css';
import axios from 'axios';
import { useAuth } from '../../service/context/AuthProvider';
import { Link } from 'react-router-dom';

const InquiryView = () => {
  const { isLoggedIn, loginInfo } = useAuth();  // 로그인 상태 및 사용자 정보 가져오기
  const [inquiryData, setInquiryData] = useState([]);  // 문의 데이터 상태 관리
  const [selectedArticle, setSelectedArticle] = useState(null);  // 선택된 글 상태 관리
  const [loading, setLoading] = useState(false);  // 로딩 상태 관리
  const [error, setError] = useState(null);  // 오류 상태 관리

  // 서버에서 로그인된 사용자의 문의 데이터를 가져오는 함수
  const fetchInquiryData = useCallback(async () => {
    if (!loginInfo?.userId) {
      console.error("로그인 정보가 없습니다.");
      return;
    }

    try {
      setLoading(true);
      setError(null);  // 오류 상태 초기화
      const response = await axios.get(`http://localhost:8080/api/inquiries/user/${loginInfo.userId}`);

      // 응답 데이터가 있고, 배열 형식일 때
      if (response.data && Array.isArray(response.data)) {
        setInquiryData(response.data);  // 정상적으로 데이터 업데이트
      } else {
        throw new Error("서버에서 올바른 데이터를 반환하지 않았습니다.");  // 데이터 형식 오류
      }
    } catch (error) {
      console.error('문의 데이터를 불러오는 중 오류가 발생했습니다:', error);
      setError('문의 데이터를 불러오는 중 오류가 발생했습니다.');  // 오류 메시지
    } finally {
      setLoading(false);
    }
  }, [loginInfo?.userId]);
console.log(inquiryData);
  // 로그인 상태가 변경될 때마다 실행
  useEffect(() => {
    if (isLoggedIn) {
      fetchInquiryData();  // 로그인 상태일 때만 문의 데이터를 가져옴
    }
  }, [isLoggedIn, fetchInquiryData]);

  const handleArticleClick = (article) => {
    setSelectedArticle(prev => (prev && prev.id === article.id) ? null : article);
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error("Invalid ID");
      return;
    }

    if (window.confirm("정말로 이 문의를 삭제하시겠습니까?")) {
      try {
        const response = await axios.delete(`http://localhost:8080/api/inquiries/${id}`);
        if (response.status === 200) {
          setInquiryData(prevData => prevData.filter(article => article.id !== id));
          alert('문의가 삭제되었습니다.');
        }
      } catch (error) {
        console.error('삭제 중 오류가 발생했습니다:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="InquiryView">
      <h2>1:1 문의</h2>

      {/* 로그인 상태가 아닌 경우 메시지 및 로그인 페이지로 링크 추가 */}
      {!isLoggedIn ? (
        <div className="center-message">
          <p>로그인 후 이용해 주세요.</p>
          <Link to="/login" className="login-link">로그인 페이지로 이동</Link>
        </div>
      ) : (
        <>
          {/* 로딩 중일 때 로딩 메시지 출력 */}
          {loading && (
            <div className="center-message">
              <p>로딩 중...</p>
            </div>
          )}

          {/* 오류 메시지 출력 */}
          {error && (
            <div className="center-message error-message">
              <p>{error}</p>
            </div>
          )}

          {/* 문의 데이터 목록이 비어있을 때 안내 메시지 출력 */}
          {inquiryData.length === 0 && !loading && !error ? (
            <div className="center-message">
              <p>등록된 문의가 없습니다.</p>
            </div>
          ) : (
            <InquiryList
              inquiryData={inquiryData}
              handleArticleClick={handleArticleClick}
              handleDelete={handleDelete}
              selectedArticle={selectedArticle}
              loading={loading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default InquiryView;
