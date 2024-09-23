import React from 'react';

const SelectedArticleDetails = ({ selectedArticle, setSelectedArticle }) => {
  return (
    <div className="selected-article">
      {/* 선택된 문의의 상세 정보 */}
      {/* <h3>{selectedArticle.title}</h3> */}
      <table>
        <tbody>
          <tr>
            <td><strong>이메일</strong></td>
            <td>{selectedArticle.email}</td>
          </tr>
          <tr>
            <td><strong>문의 유형</strong></td>
            <td>{selectedArticle.inquiryType}</td>
          </tr>
          <tr>
            <td><strong>문의 내용</strong></td>
            <td>{selectedArticle.content}</td>
          </tr>
          <tr>
            <td><strong>게임 플랫폼</strong></td>
            <td>{selectedArticle.platform}</td>
          </tr>
          <tr>
            <td><strong>게임 장르</strong></td>
            <td>{selectedArticle.genres.join(', ')}</td>
          </tr>
        </tbody>
      </table>
      {/* 선택된 문의 닫기 버튼 */}
      <button className="close-button" onClick={() => setSelectedArticle(null)}>닫기</button>
    </div>
  );
};

export default SelectedArticleDetails;