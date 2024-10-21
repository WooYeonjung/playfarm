import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../../styles/CustomerBoard.css';
import AccordionItem from './AccordionItem';
import SearchBar from './SearchBar';
import FaqPagination from './FaqPagination';
import { API_BASE_URL } from '../../service/app-config';

// 초기 아코디언 아이템 목록
const initialAccordionItems = [
  { title: '게임이 너무 재미없어요', content: '왜 그랬어요? 다음에는 꼭 잘 선택해요!', id: 1, faqType: 'oth' },
  { title: '엄마한테 걸렸어요', content: '아빠한테 안 걸린 게 어딘가요? 아싸!!', id: 2, faqType: 'oth' },
  { title: '친구랑 게임하다 싸웠어요', content: '그 맛에 게임하는 거예요!', id: 3, faqType: 'oth' },
  { title: '아빠가 낚시 게임하다 엄마한테 혼나요', content: '그게 중요한 게 아니에요!! 고기 잡혔다!! 흔들어요!!!', id: 4, faqType: 'oth' },
  { title: '같이 하는 게임인데 혼자 해요', content: '저 일 끝났는데 접속할게요!!', id: 5, faqType: 'oth' },
  { title: '게임 환불은 어떻게 하나요?', content: '지금은 문의가 많아 다음에 다시 걸어주시기 바랍니다.', id: 6, faqType: 'payRef' },
  { title: '환불 요청은 어디에서 하나요?', content: '우리 웹사이트의 "환불 요청" 에서 가능합니다. 필요한 정보를 입력해주세요.', id: 7, faqType: 'payRef' },
  { title: '환불 처리 기간은 얼마나 걸리나요?', content: '환불 요청 후 5~7일 이내에 처리됩니다. 확인 후 이메일로 안내드립니다.', id: 8, faqType: 'payRef' },
  { title: '환불이 안 될 경우는 어떤 경우인가요?', content: '게임 사용 후 14일이 지난 경우 환불이 불가능합니다. 사용 규정을 확인해주세요.', id: 9, faqType: 'payRef' },
  { title: '부분 환불도 가능한가요?', content: '특정 DLC나 추가 콘텐츠에 대해서는 부분 환불이 가능합니다. 자세한 사항은 고객 지원에 문의하세요.', id: 10, faqType: 'payRef' },
  { title: '게임에 대해 더 알고 싶어요', content: '저희 웹사이트에서 상품 정보를 확인하세요. 다양한 게임을 만나보세요!', id: 11, faqType: 'prodInq' },
  { title: '게임을 구입하면 추가 비용이 발생하나요?', content: '기본 가격 외에 추가 비용은 없습니다. 다만, 추가 콘텐츠는 별도 구매가 필요합니다.', id: 12, faqType: 'prodInq' },
  { title: '구매한 상품의 설치 방법이 궁금해요', content: '설치 방법은 매뉴얼을 참조하세요. 질문이 있으면 언제든지 문의해주세요.', id: 13, faqType: 'prodInq' },
  { title: '구입한 게임의 시스템 요구사항은 무엇인가요?', content: '각 게임의 페이지에서 최소 및 권장 시스템 요구사항을 확인하실 수 있습니다.', id: 14, faqType: 'prodInq' },
  { title: '게임을 선물할 수 있나요?', content: '네, 선물하기 기능을 사용하실 수 있습니다. 구매 후 친구에게 보내보세요!', id: 15, faqType: 'prodInq' },
  { title: '게임이 잘 실행되지 않아요', content: '시스템 요구사항을 확인해보세요. 최신 드라이버 설치도 권장합니다.', id: 16, faqType: 'techSup' },
  { title: '다운로드가 느려요', content: '인터넷 연결 상태를 확인해보세요. 가능하다면 유선 연결을 추천합니다.', id: 17, faqType: 'techSup' },
  { title: '게임이 중간에 멈춰요', content: '장치 드라이버를 업데이트해보세요. 특정 소프트웨어 충돌이 원인일 수 있습니다.', id: 18, faqType: 'techSup' },
  { title: '버그를 발견했어요, 어떻게 해야 하나요?', content: '고객 지원 팀에 문의해주세요. 문제를 해결할 수 있도록 도와드리겠습니다.', id: 19, faqType: 'techSup' },
  { title: '게임을 재설치해야 하나요?', content: '문제가 계속되면 재설치를 고려해보세요. 백업 후 진행하는 것을 추천합니다.', id: 20, faqType: 'techSup' }
];

// 한 페이지에 표시할 항목 수
const ITEMS_PER_PAGE = 5;

const CustomerBoard = () => {
  // 상태 정의
  const [accordionItems, setAccordionItems] = useState(initialAccordionItems); // FAQ 목록
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [openIndex, setOpenIndex] = useState(null); // 열려 있는 아코디언 인덱스
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리
  const [error, setError] = useState(null); // 에러 메시지
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지

  // 카테고리 매핑
  const categoryMapping = {
    '상품 문의': 'prodInq',
    '결제/환불': 'payRef',
    '컴퓨터/기술': 'techSup',
    '기타': 'oth',
  };

  // 컴포넌트가 마운트될 때 FAQ 데이터를 가져오는 useEffect
  useEffect(() => {
    const fetchAccordionItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/faqs`);
        if (Array.isArray(response.data)) {
          setAccordionItems(response.data);
        } else {
          throw new Error('데이터 형식이 잘못되었습니다.');
        }
      } catch (err) {
        alert('Error fetching data:');
        setAccordionItems(initialAccordionItems); // 초기 데이터로 설정
      }
    };

    fetchAccordionItems();
  }, []);

  // 검색어 변경 시 호출되는 함수
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // 카테고리 클릭 시 호출되는 함수
  const handleCategoryClick = async (category) => {
    const apiEndpoint = categoryMapping[category]; // 카테고리에 맞는 API 엔드포인트
    setSelectedCategory(apiEndpoint); // 선택된 카테고리 설정
    setCurrentPage(1); // 페이지를 1로 초기화

    try {
      const response = await axios.get(`${API_BASE_URL}/api/faqs/${apiEndpoint}`);
      if (Array.isArray(response.data)) {
        setAccordionItems(response.data);
        setError(null); // 에러 초기화
      } else {
        throw new Error('데이터 형식이 잘못되었습니다.');
      }
    } catch (err) {
      console.error('Error fetching category data:', err);
      setAccordionItems(initialAccordionItems); // 초기 데이터로 설정
      setError('데이터를 가져오는 데 실패했습니다.');
    }
  };

  // 모두 보기 클릭 시 호출되는 함수
  const handleShowAll = async () => {
    setSelectedCategory(null); // 카테고리 초기화
    setSearchTerm(''); // 검색어 초기화
    setCurrentPage(1); // 페이지를 1로 초기화

    try {
      const response = await axios.get(`${API_BASE_URL}/api/faqs`); // 모든 데이터 요청
      if (Array.isArray(response.data)) {
        setAccordionItems(response.data);
        setError(null); // 에러 초기화
      } else {
        throw new Error('데이터 형식이 잘못되었습니다.');
      }
    } catch (err) {
      console.error('Error fetching all data:', err);
      setAccordionItems(initialAccordionItems); // 초기 데이터로 설정
      setError('모든 데이터를 가져오는 데 실패했습니다.');
    }
  };

  // 필터링된 FAQ 항목 계산
  const filteredAccordionItems = useMemo(() => {
    return accordionItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()); // 검색어와 일치하는지 확인
      const matchesCategory = selectedCategory ? item.faqType === selectedCategory : true; // 카테고리와 일치하는지 확인
      return matchesSearch && matchesCategory; // 둘 다 일치하는 경우에만 포함
    });
  }, [accordionItems, searchTerm, selectedCategory]);

  // 보여줄 항목 결정
  const itemsToShow = filteredAccordionItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filteredAccordionItems.length / ITEMS_PER_PAGE); // 총 페이지 수 계산

  return (
    <div className="customer-board">
      <div className="faq-title-container">
        <h1 className="faq-title">자주 묻는 질문 (FAQ)</h1>
      </div>

      {/* 검색 바 컴포넌트 */}
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      {/* 카테고리 선택 버튼들 */}
      <div className="button-container">
        <button className="query-button" onClick={() => handleCategoryClick('상품 문의')}>상품 문의</button>
        <button className="query-button" onClick={() => handleCategoryClick('결제/환불')}>결제/환불</button>
        <button className="query-button" onClick={() => handleCategoryClick('컴퓨터/기술')}>컴퓨터/기술</button>
        <button className="query-button" onClick={() => handleCategoryClick('기타')}>기타</button>

        {/* 모두 보기 버튼 */}
        <button className="query-button" onClick={handleShowAll}>
          모두 보기
        </button>
      </div>

      {/* 에러 메시지 출력 */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 아코디언 항목 출력 */}
      <div className="accordion-items-container">
        {itemsToShow.length > 0 ? (
          itemsToShow.map((item, index) => (
            <AccordionItem
              key={item.id}
              item={item}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
            />
          ))
        ) : (
          <p>결과가 없습니다.</p> // 항목이 없는 경우 메시지 출력
        )}
      </div>

      {/* 페이지네이션 컴포넌트 */}
      {totalPages > 1 && (
        <FaqPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage} // 페이지 변경 함수 전달
        />
      )}
    </div>
  );
};

export default CustomerBoard; // 컴포넌트 내보내기