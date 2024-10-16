import React from 'react';
import '../../styles/FaqPagination.css'; // CSS 스타일 추가

// 페이지네이션 컴포넌트 정의
const FaqPagination = ({ currentPage, totalPages, onPageChange }) => {
  // 페이지 변경 핸들러
  const handlePageChange = (page) => {
    // 유효한 페이지인지 확인
    if (page < 1 || page > totalPages) return; 
    onPageChange(page); // 페이지 변경 호출
  };

  return (
    <div className="pagination">
      {/* 이전 페이지 버튼 */}
      <button 
        onClick={() => handlePageChange(currentPage - 1)} 
        disabled={currentPage === 1} // 현재 페이지가 1이면 비활성화
      >
        이전
      </button>

      {/* 페이지 번호 버튼 생성 */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button 
          key={index + 1} // 각 버튼의 고유 키 설정
          onClick={() => handlePageChange(index + 1)} // 페이지 변경 호출
          className={currentPage === index + 1 ? 'active' : ''} // 현재 페이지에 활성 클래스 추가
        >
          {index + 1} 
          {/* // 페이지 번호 표시 */}
        </button>
      ))}

      {/* 다음 페이지 버튼 */}
      <button 
        onClick={() => handlePageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} // 현재 페이지가 마지막 페이지이면 비활성화
      >
        다음
      </button>
    </div>
  );
};

export default FaqPagination; // 컴포넌트 내보내기
