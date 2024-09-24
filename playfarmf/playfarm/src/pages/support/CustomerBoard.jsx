import React, { useState } from 'react';
import '../../styles/CustomerBoard.css';
import AccordionItem from './AccordionItem';
import SearchBar from './SearchBar';

// 초기화된 아코디언 아이템 데이터
const initialAccordionItems = [
  // 기타
  { title: '게임이 너무 재미없어요', content: '왜 그랬어요? 다음에는 꼭 잘 선택해요!', isOpen: false, category: '기타' },
  { title: '엄마한테 걸렸어요', content: '아빠한테 안 걸린 게 어딘가요? 아싸!!', isOpen: false, category: '기타' },
  { title: '친구랑 게임하다 싸웠어요', content: '그 맛에 게임하는 거예요!', isOpen: false, category: '기타' },
  { title: '아빠가 낚시 게임하다 엄마한테 혼나요', content: '그게 중요한 게 아니에요!! 고기 잡혔다!! 흔들어요!!!', isOpen: false, category: '기타' },
  { title: '같이 하는 게임인데 혼자 해요', content: '저 일 끝났는데 접속할게요!!', isOpen: false, category: '기타' },

  // 결제/환불
  { title: '게임 환불은 어떻게 하나요?', content: '지금은 문의가 많아 다음에 다시 걸어주시기 바랍니다.', isOpen: false, category: '결제/환불' },
  { title: '환불 요청은 어디에서 하나요?', content: '우리 웹사이트의 "환불 요청" 에서 가능합니다. 필요한 정보를 입력해주세요.', isOpen: false, category: '결제/환불' },
  { title: '환불 처리 기간은 얼마나 걸리나요?', content: '환불 요청 후 5~7일 이내에 처리됩니다. 확인 후 이메일로 안내드립니다.', isOpen: false, category: '결제/환불' },
  { title: '환불이 안 될 경우는 어떤 경우인가요?', content: '게임 사용 후 14일이 지난 경우 환불이 불가능합니다. 사용 규정을 확인해주세요.', isOpen: false, category: '결제/환불' },
  { title: '부분 환불도 가능한가요?', content: '특정 DLC나 추가 콘텐츠에 대해서는 부분 환불이 가능합니다. 자세한 사항은 고객 지원에 문의하세요.', isOpen: false, category: '결제/환불' },

  // 상품 문의
  { title: '게임에 대해 더 알고 싶어요', content: '저희 웹사이트에서 상품 정보를 확인하세요. 다양한 게임을 만나보세요!', isOpen: false, category: '상품 문의' },
  { title: '게임을 구입하면 추가 비용이 발생하나요?', content: '기본 가격 외에 추가 비용은 없습니다. 다만, 추가 콘텐츠는 별도 구매가 필요합니다.', isOpen: false, category: '상품 문의' },
  { title: '구매한 상품의 설치 방법이 궁금해요', content: '설치 방법은 매뉴얼을 참조하세요. 질문이 있으면 언제든지 문의해주세요.', isOpen: false, category: '상품 문의' },
  { title: '구입한 게임의 시스템 요구사항은 무엇인가요?', content: '각 게임의 페이지에서 최소 및 권장 시스템 요구사항을 확인하실 수 있습니다.', isOpen: false, category: '상품 문의' },
  { title: '게임을 선물할 수 있나요?', content: '네, 선물하기 기능을 사용하실 수 있습니다. 구매 후 친구에게 보내보세요!', isOpen: false, category: '상품 문의' },

  // 컴퓨터/기술
  { title: '게임이 잘 실행되지 않아요', content: '시스템 요구사항을 확인해보세요. 최신 드라이버 설치도 권장합니다.', isOpen: false, category: '컴퓨터/기술' },
  { title: '다운로드가 느려요', content: '인터넷 연결 상태를 확인해보세요. 가능하다면 유선 연결을 추천합니다.', isOpen: false, category: '컴퓨터/기술' },
  { title: '게임이 중간에 멈춰요', content: '장치 드라이버를 업데이트해보세요. 특정 소프트웨어 충돌이 원인일 수 있습니다.', isOpen: false, category: '컴퓨터/기술' },
  { title: '버그를 발견했어요, 어떻게 해야 하나요?', content: '고객 지원 팀에 문의해주세요. 문제를 해결할 수 있도록 도와드리겠습니다.', isOpen: false, category: '컴퓨터/기술' },
  { title: '게임을 재설치해야 하나요?', content: '문제가 계속되면 재설치를 고려해보세요. 백업 후 진행하는 것을 추천합니다.', isOpen: false, category: '컴퓨터/기술' }
];


const CustomerBoard = () => {
  const [accordionItems] = useState(initialAccordionItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleAccordion = index => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryClick = category => {
    setSelectedCategory(category);
  };

  const filteredAccordionItems = accordionItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="customer-board">
      <div className="faq-title-container">
        <h1 className="faq-title">자주 묻는 질문 (FAQ)</h1>
      </div>

      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <div className="button-container">
        <button className="query-button" onClick={() => handleCategoryClick('상품 문의')}>상품 문의</button>
        <button className="query-button" onClick={() => handleCategoryClick('결제/환불')}>결제/환불</button>
        <button className="query-button" onClick={() => handleCategoryClick('컴퓨터/기술')}>컴퓨터/기술</button>
        <button className="query-button" onClick={() => handleCategoryClick('기타')}>기타</button>
        <button className="query-button" onClick={() => handleCategoryClick(null)}>모두 보기</button>
      </div>

      <div className="accordion-items-container">
        {filteredAccordionItems.length > 0 ? (
          filteredAccordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              toggleAccordion={toggleAccordion}
            />
          ))
        ) : (
          <p className="no-results-message">검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerBoard;
