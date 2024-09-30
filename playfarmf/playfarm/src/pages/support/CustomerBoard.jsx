import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import '../../styles/CustomerBoard.css';
import AccordionItem from './AccordionItem';
import SearchBar from './SearchBar';

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

const CustomerBoard = () => {
  // 상태 변수를 정의
  const [accordionItems, setAccordionItems] = useState(initialAccordionItems); // 아코디언 아이템 목록
  const [searchTerm, setSearchTerm] = useState(''); // 검색어
  const [openIndex, setOpenIndex] = useState(null); // 열린 아코디언 아이템의 인덱스
  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리
  const [error, setError] = useState(null); // 에러 메시지
  const [containerHeight, setContainerHeight] = useState('auto'); // 아코디언 컨테이너 높이

  // 카테고리 매핑
  const categoryMapping = {
    '상품 문의': 'prodInq',
    '결제/환불': 'payRef',
    '컴퓨터/기술': 'techSup',
    '기타': 'oth',
  };

  // 컴포넌트가 처음 렌더링될 때 FAQ 데이터를 가져옴
  useEffect(() => {
    const fetchAccordionItems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/faqs'); // API 호출
        if (Array.isArray(response.data)) {
          setAccordionItems(response.data); // 응답 데이터로 상태 업데이트
        } else {
          throw new Error('데이터 형식이 잘못되었습니다.'); // 데이터 형식 오류 처리
        }
      } catch (err) {
        console.error('Error fetching data:', err); // 에러 로그
        setAccordionItems(initialAccordionItems); // 초기 데이터로 설정
      }
    };

    fetchAccordionItems(); // 데이터 가져오기 호출
  }, []); // 빈 배열을 통해 최초 렌더링 시에만 호출

  // 검색 입력값 변경 처리
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // 입력값 상태 업데이트
  };

  // 카테고리 버튼 클릭 처리
  const handleCategoryClick = async (category) => {
    const apiEndpoint = categoryMapping[category]; // 선택된 카테고리에 해당하는 API 엔드포인트
    setSelectedCategory(apiEndpoint); // 선택된 카테고리 상태 업데이트

    try {
      const response = await axios.get(`http://localhost:8080/api/faqs/${apiEndpoint}`); // 카테고리 API 호출
      if (Array.isArray(response.data)) {
        setAccordionItems(response.data); // 응답 데이터로 상태 업데이트
        setError(null); // 에러 초기화
        setContainerHeight(''); // 높이 초기화
        setTimeout(() => {
          const container = document.querySelector('.accordion-items-container');
          setContainerHeight(`${container.scrollHeight}px`); // 동적으로 높이 설정
        }, 0);
      } else {
        throw new Error('데이터 형식이 잘못되었습니다.'); // 데이터 형식 오류 처리
      }
    } catch (err) {
      console.error('Error fetching category data:', err); // 에러 로그
      setAccordionItems(initialAccordionItems); // 초기 데이터로 설정
      setError('데이터를 가져오는 데 실패했습니다.'); // 에러 메시지 설정
    }
  };

  // 검색 및 카테고리 필터링 처리
  const filteredAccordionItems = useMemo(() => {
    return accordionItems.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()); // 검색어와 일치하는지 확인
      const matchesCategory = selectedCategory ? item.faqType === selectedCategory : true; // 선택된 카테고리와 일치하는지 확인
      return matchesSearch && matchesCategory; // 두 조건 모두 만족해야 함
    });
  }, [accordionItems, searchTerm, selectedCategory]); // 의존성 배열

  return (
    <div className="customer-board">
      <div className="faq-title-container">
        <h1 className="faq-title">자주 묻는 질문 (FAQ)</h1>
      </div>

      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} /> {/* 검색 바 컴포넌트 */}

      <div className="button-container">
        {/* 카테고리 버튼들 */}
        <button className="query-button" onClick={() => handleCategoryClick('상품 문의')}>상품 문의</button>
        <button className="query-button" onClick={() => handleCategoryClick('결제/환불')}>결제/환불</button>
        <button className="query-button" onClick={() => handleCategoryClick('컴퓨터/기술')}>컴퓨터/기술</button>
        <button className="query-button" onClick={() => handleCategoryClick('기타')}>기타</button>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}

      <div className="accordion-items-container" style={{ height: containerHeight }}>
        {filteredAccordionItems.length > 0 ? (
          // 필터링된 아코디언 아이템이 있을 경우
          filteredAccordionItems.map((item, index) => (
            <AccordionItem
              key={item.id} // 고유 키
              item={item}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex} // 아코디언 아이템 상태 업데이트
            />
          ))
        ) : (
          // 검색 결과가 없을 경우 표시할 부분
          null
        )}
      </div>
    </div>
  );
};

export default CustomerBoard; // 컴포넌트 내보내기
