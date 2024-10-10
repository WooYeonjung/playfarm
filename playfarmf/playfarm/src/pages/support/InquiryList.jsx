import React, { useEffect } from 'react';

const InquiryList = ({ inquiryData, handleArticleClick, handleDelete }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // 부드럽게 스크롤
    });
  }, [])

  return (
    <div className="article-grid">
      {/* 문의 항목들을 나타내는 그리드 */}
      {inquiryData.map((article) => (
        <div key={article.id} className="article-card" onClick={() => handleArticleClick(article)}>
          <div className="article-info">
            {/* 문의 항목 정보 */}
            <div><strong>번호</strong> {article.number}</div>
            <div><strong>제목</strong> {article.title}</div>
            <div><strong>등록일</strong> {article.date}</div>
          </div>
          {/* 문의 항목 삭제 버튼 */}
          <button
            className="delete-button"
            onClick={(e) => {
              e.stopPropagation(); // 이벤트 버블링 방지하여 부모 요소로의 전파를 막습니다.
              handleDelete(article.id); // 문의 삭제 함수를 호출하고 해당 문의의 ID를 전달합니다.
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
