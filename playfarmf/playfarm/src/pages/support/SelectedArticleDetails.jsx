import React from 'react';
import '../../styles/SelectedArticleDetails.css'; // CSS 스타일 import

const SelectedArticleDetails = ({ selectedArticle, setSelectedArticle, handleDelete }) => {
  if (!selectedArticle) {
    return <div>선택된 문의가 없습니다.</div>; // 선택된 문의가 없을 경우 메시지
  }

  return (
    <div>
      <table className="inquiry-table">
        <tbody>
          <tr>
            <td><strong>이메일</strong></td>
            <td>{selectedArticle.email || '정보 없음'}</td> 
            {/* 이메일 표시 */}
          </tr>
          <tr>
            <td><strong>문의 유형</strong></td>
            <td>{selectedArticle.inquiryType || '정보 없음'}</td>
            {/* 문의 유형 표시   */}
          </tr>
          <tr>
            <td><strong>문의 내용</strong></td>
            <td>{selectedArticle.inquiryText || '정보 없음'}</td>
            {/* 문의 내용 표시   */}
          </tr>
          <tr>
            <td><strong>게임 플랫폼</strong></td>
            <td>{selectedArticle.platformName || '정보 없음'}</td> 
            {/* 게임 플랫폼 표시  */}
          </tr>
          <tr>
            <td><strong>게임 장르</strong></td>
            <td>
              {Array.isArray(selectedArticle.genres) && selectedArticle.genres.length > 0 
                ? selectedArticle.genres.join(', ') // 장르가 있을 경우 표시
                : selectedArticle.genres === undefined 
                  ? '정보 없음' 
                  : '장르가 없습니다'}
            </td>
          </tr>
        </tbody>
      </table>
      <button className="delete-button" onClick={() => handleDelete(selectedArticle.id)}>삭제하기</button> 
                                                                                        {/* 삭제 버튼 */}
      <button className="close-button" onClick={() => setSelectedArticle(null)}>닫기</button> 
                                                                                        {/* 닫기 버튼 */}
    </div>
  );
};

export default SelectedArticleDetails;
