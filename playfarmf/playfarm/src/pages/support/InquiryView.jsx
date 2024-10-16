import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import InquiryList from './InquiryList';
import '../../styles/InquiryView.css';
import axios from 'axios';
import { useAuth } from '../../service/context/AuthProvider';

const InquiryView = () => {
  const navigate = useNavigate();
  const [inquiryData, setInquiryData] = useState([]);  // 문의 데이터 상태 관리
  const [selectedArticle, setSelectedArticle] = useState(null);  // 선택된 글 상태 관리
  const [loading, setLoading] = useState(true);  // 로딩 상태
  // const storedLoginInfo = localStorage.getItem('loginInfo');
  const { isLoggedIn, loginInfo } = useAuth();
  console.log(isLoggedIn)
  console.log(loginInfo)

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const fetchInquiryData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/inquiries');
        if (response.data && Array.isArray(response.data)) {
          setInquiryData(response.data);
        }
      } catch (error) {
        console.error('문의 데이터를 불러오는 중 오류가 발생했습니다:', error);
        alert('문의 데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiryData();
  }, [isLoggedIn]);

  const handleArticleClick = (article) => {
    // 이미 선택된 글이면 상세내용을 닫고, 그렇지 않으면 새로운 글을 열도록 상태 업데이트
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

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="InquiryView">
      <h2>1:1 문의</h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : inquiryData.length === 0 ? (
        <p className="no-inquiries-message">문의 내용이 없습니다.</p>
      ) : (
        <InquiryList
          inquiryData={inquiryData}
          handleArticleClick={handleArticleClick}
          handleDelete={handleDelete}
          selectedArticle={selectedArticle}  // 선택된 글 전달
        />
      )}
    </div>
  );
};

export default InquiryView;
