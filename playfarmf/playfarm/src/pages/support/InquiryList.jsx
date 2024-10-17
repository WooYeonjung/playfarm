import React from 'react';

const InquiryList = ({ inquiryData, handleArticleClick, handleDelete, selectedArticle }) => {
  return (
    <div className="article-grid">
      {inquiryData.length === 0 ? (
        <p>로딩 중...</p>
      ) : (
        inquiryData.map((article, index) => {
          // 날짜 처리
          const formattedDate = new Date(article.regDate);
          const displayDate = isNaN(formattedDate.getTime()) ? '등록일 없음' : formattedDate.toLocaleString();

          return (
            <div key={article.id}>
              <div
                className="article-card"
                onClick={() => handleArticleClick(article)}  // 클릭 시 상세보기
              >
                <div className="article-info">
                  <div><strong>번호</strong> {index + 1}</div>
                  <div><strong>제목</strong> {article.title}</div>
                  <div><strong>등록일</strong> {displayDate}</div>
                </div>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();  // 클릭 이벤트 전파 방지
                    handleDelete(article.id);  // 삭제 처리
                  }}
                >
                  삭제
                </button>
              </div>

              {/* 선택된 글만 세부 내용 보여주기 */}
              {selectedArticle && selectedArticle.id === article.id && (
                <div className="selected-article">
                  <div className="article-details-card">
                    <table>
                      <tbody>
                        <tr>
                          <td><strong>이메일</strong></td>
                          <td>{selectedArticle?.email || '정보 없음'}</td>
                        </tr>
                        <tr>
                          <td><strong>문의 유형</strong></td>
                          <td>{selectedArticle?.inquiryType || '정보 없음'}</td>
                        </tr>
                        <tr>
                          <td><strong>문의 내용</strong></td>
                          <td>{selectedArticle?.inquiryText || '정보 없음'}</td>
                        </tr>
                        <tr>
                          <td><strong>게임 플랫폼</strong></td>
                          <td>{selectedArticle?.platformName || '정보 없음'}</td>
                        </tr>
                        <tr>
                          <td><strong>게임 장르</strong></td>
                          <td>{selectedArticle?.gameGenre?.join(', ') || '게임 장르 정보 없음'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <button className="close-button" onClick={() => handleArticleClick(selectedArticle)}>닫기</button>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default InquiryList;
