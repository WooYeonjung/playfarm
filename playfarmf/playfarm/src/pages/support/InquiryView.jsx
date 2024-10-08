import React, { useState, useEffect } from 'react';
import '../../styles/InquiryView.css'; // CSS 스타일 import
import InquiryList from './InquiryList'; // 문의 목록 컴포넌트
import SelectedArticleDetails from './SelectedArticleDetails'; // 선택된 문의 상세보기 컴포넌트
import { useAuth } from '../../service/context/AuthProvider'; // 인증 컨텍스트 import

const InquiryView = () => {
  const { isLoggedIn } = useAuth(); // 로그인 상태 가져오기
  const [inquiryData, setInquiryData] = useState([]); // 문의 데이터 상태
  const [selectedArticle, setSelectedArticle] = useState(null); // 선택된 문의 상태

  useEffect(() => {
    const fetchInquiries = async () => {
      if (!isLoggedIn) return; // 로그인 상태일 때만 데이터 호출

      try {
        const response = await fetch('/api/inquiries'); // API에서 문의 데이터 가져오기
        if (!response.ok) {
          throw new Error('문의 데이터 로딩 실패');
        }
        const data = await response.json(); // JSON 형식으로 변환
        setInquiryData(data); // 상태 업데이트
      } catch (error) {
        console.error(error); // 오류 출력
      }
    };

    fetchInquiries(); // 문의 데이터 호출
  }, [isLoggedIn]); // 로그인 상태가 변경될 때마다 실행

  const handleArticleClick = (article) => {
    // 문의 클릭 시 선택된 문의 상태 업데이트
    if (selectedArticle && selectedArticle.id === article.id) {
      setSelectedArticle(null); // 이미 선택된 문의면 해제
    } else {
      setSelectedArticle(article); // 새로운 문의 선택
    }
  };

  const handleDelete = async (articleId) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/inquiries/${articleId}`, {
          method: 'DELETE' // DELETE 요청
        });

        if (!response.ok) {
          throw new Error('문의 삭제 실패');
        }

        const updatedData = inquiryData.filter((article) => article.id !== articleId); // 삭제 후 데이터 업데이트
        setInquiryData(updatedData); // 상태 업데이트
        setSelectedArticle(null); // 선택된 문의 해제
      } catch (error) {
        console.error(error); // 오류 출력
        alert('삭제하는 동안 문제가 발생했습니다.'); // 오류 메시지
      }
    }
  };

  return (
    <div className="InquiryView">
      <h2>1:1 문의</h2>
      {!isLoggedIn && <p className="login-message">로그인 후 이용해 주세요.</p>} 
      {/* 로그인하지 않은 경우 메시지 표시 */}
      {isLoggedIn && (
        <>
          {inquiryData.length === 0 ? (
            <p className="no-inquiries-message">문의 내용이 없습니다.</p> // 문의가 없는 경우 메시지
          ) : (
            <InquiryList
              inquiryData={inquiryData.map((article, index) => ({ // 문의 목록을 번호와 함께 렌더링
                ...article,
                number: index + 1, // 번호 추가
              }))}
              handleArticleClick={handleArticleClick} // 클릭 핸들러 전달
              handleDelete={handleDelete} // 삭제 핸들러 전달
            />
          )}
        </>
      )}
      {selectedArticle && (
        <SelectedArticleDetails
          selectedArticle={selectedArticle} // 선택된 문의 전달
          setSelectedArticle={setSelectedArticle} // 선택된 문의 설정 함수 전달
          handleDelete={handleDelete} // 삭제 핸들러 전달
        />
      )}
    </div>
  );
};

export default InquiryView;
