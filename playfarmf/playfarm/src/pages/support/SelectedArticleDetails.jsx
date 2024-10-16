import React from 'react';

const SelectedArticleDetails = ({ selectedArticle, setSelectedArticle }) => {
  const gameGenres = selectedArticle?.gameGenre?.length > 0
    ? selectedArticle.gameGenre.join(', ')
    : '게임 장르 정보 없음';

  return (
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
              <td>{gameGenres}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="close-button" onClick={() => setSelectedArticle(null)}>닫기</button>
    </div>
  );
};

export default SelectedArticleDetails;
