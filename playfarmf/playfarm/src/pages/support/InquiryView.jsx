import React, { useState, useEffect } from 'react';
import '../../styles/InquiryView.css';
import InquiryList from './InquiryList';
import SelectedArticleDetails from './SelectedArticleDetails';

const InquiryView = () => {
  // 상태 변수들 선언 및 초기화
  const [inquiryData, setInquiryData] = useState([]); // 문의 데이터 배열
  const [selectedArticle, setSelectedArticle] = useState(null); // 선택된 문의 항목
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 실행되는 부수 효과 함수
    // 로그인 상태를 localStorage에서 가져옵니다.
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus) {
      setIsLoggedIn(true); // 로그인 상태면 true로 설정
    } else {
      setIsLoggedIn(false); // 로그인 상태가 아니면 false로 설정
    }

    // 저장된 문의 데이터를 localStorage에서 가져옵니다.
    const storedData = JSON.parse(localStorage.getItem('inquiries')) || [];
    if (Array.isArray(storedData)) {
      // 가져온 데이터를 상태 변수에 설정하고, 각 문의 항목에 순번을 추가합니다.
      setInquiryData(
        storedData.map((article, index) => ({
          ...article,
          number: index + 1
        }))
      );
    } else {
      console.error('저장된 데이터가 배열이 아닙니다:', storedData);
      setInquiryData([]); // 데이터가 배열이 아닐 경우 빈 배열로 초기화합니다.
    }
  }, []);

  // 문의 항목을 클릭했을 때 실행되는 함수
  const handleArticleClick = (article) => {
    if (selectedArticle && selectedArticle.id === article.id) {
      setSelectedArticle(null); // 이미 선택된 문의를 다시 클릭하면 닫습니다.
    } else {
      setSelectedArticle(article); // 클릭한 문의를 엽니다.
    }
  };

  // 문의 항목 삭제 버튼을 클릭했을 때 실행되는 함수
  const handleDelete = (articleId) => {
    // 선택된 문의를 제외한 나머지 문의 데이터를 업데이트합니다.
    const updatedData = inquiryData.filter((article) => article.id !== articleId);
    // 업데이트된 데이터에 순번을 다시 매겨서 설정합니다.
    setInquiryData(
      updatedData.map((article, index) => ({
        ...article,
        number: index + 1
      }))
    );
    setSelectedArticle(null); // 선택된 문의 상태를 초기화합니다.
    localStorage.setItem('inquiries', JSON.stringify(updatedData)); // 업데이트된 데이터를 localStorage에 저장합니다.
  };

  return (
    <div className="InquiryView">
      <h2>1:1 문의</h2>
      {!isLoggedIn && <p className="login-message">로그인 후 이용해 주세요.</p>}
      {isLoggedIn && (
        <>
          {inquiryData.length === 0 ? (
            <p className="no-inquiries-message">문의 내용이 없습니다.</p>
          ) : (
            <InquiryList
              inquiryData={inquiryData}
              handleArticleClick={handleArticleClick}
              handleDelete={handleDelete}
            />
          )}

        </>
      )}
      {selectedArticle && (
        <SelectedArticleDetails
          selectedArticle={selectedArticle}
          setSelectedArticle={setSelectedArticle}
        />
      )}
    </div>
  );
};

export default InquiryView;
