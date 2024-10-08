import React, { useEffect } from 'react';


const InquiryList = ({ inquiryData, handleArticleClick, handleDelete }) => {
  useEffect(() => {
    window.scrollTo({ // 페이지 스크롤 최상단으로 이동
      top: 0,
      behavior: 'smooth' 
    });
  }, []);

  return (
    <div className="article-grid">
      {inquiryData.map((article, index) => ( // 문의 목록 렌더링
        <div 
          key={article.id} // 각 문의의 고유 ID
          className="article-card" 
          onClick={() => handleArticleClick(article)} // 클릭 시 핸들러 호출
        >
          <div className="article-info">
            <div style={{ textAlign: 'center' }}>
              <strong>번호</strong> {index + 1} 
              {/* 번호 표시 */}
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong>제목</strong> {article.title}  
              {/* 제목 표시 */}
            </div>
            <div style={{ textAlign: 'center' }}>
              <strong>등록일</strong> {new Date(article.regDate).toLocaleString()} 
              {/* 등록일 표시 */}
            </div>
          </div>
          <button
            className="delete-button"
            style={{ marginTop: '-8px' }}
            onClick={(e) => {
              e.stopPropagation(); // 클릭 전파 방지
              handleDelete(article.id); // 삭제 핸들러 호출
            }}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
};

export default InquiryList;
