import React, { useState } from 'react';
import '../../styles/CustomerBoard.css'; // CustomerBoard 컴포넌트에 사용될 CSS 파일을 임포트합니다.
import AccordionItem from './AccordionItem'; // 아코디언 아이템을 렌더링하는 AccordionItem 컴포넌트를 임포트합니다.
import SearchBar from './SearchBar'; // 검색 기능을 제공하는 SearchBar 컴포넌트를 임포트합니다.

// 초기화된 아코디언 아이템 데이터
const initialAccordionItems = [
  { title: '게임이 너무 재미없어요', content: '왜 그랬어요. 다음엔 잘 선택해요!! 알았죠?!', isOpen: false },
  { title: '게임 환불은 어떻게 하나요?', content: '지금은 문의가 많아 다음에 다시 걸어주시기 바랍니다!!', isOpen: false },
  { title: '엄마한테 걸렸어요', content: '아빠한테 안 걸린 게 어딘가요. 아싸!!', isOpen: false },
  { title: '게임하면 시간이 너무 빨리 가요', content: '전 근무 중인데 시간이 너무 안가네요.', isOpen: false },
  { title: '친구랑 게임하다 싸웠어요', content: '그 맛에 게임하는 거예요', isOpen: false }
];

const CustomerBoard = () => {
  // 상태 변수 선언 및 초기화
  const [accordionItems] = useState(initialAccordionItems); // 아코디언 아이템 데이터를 상태로 관리합니다.
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 상태로 관리합니다.
  const [openIndex, setOpenIndex] = useState(null); // 현재 열린 아코디언 아이템의 인덱스를 상태로 관리합니다.

  // 아코디언 아이템을 토글하는 함수
  const toggleAccordion = index => {
    setOpenIndex(openIndex === index ? null : index); // 클릭된 아이템의 인덱스를 열린 인덱스로 설정하여 아코디언 효과를 구현합니다.
  };

  // 검색어 변경 핸들러 함수
  const handleSearchChange = event => {
    setSearchTerm(event.target.value); // 입력된 검색어를 검색어 상태로 설정합니다.
  };

  // 검색어에 따라 필터링된 아코디언 아이템 목록을 생성합니다.
  const filteredAccordionItems = accordionItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) // 대소문자 구분 없이 검색어가 포함된 아이템만 필터링합니다.
  );

  return (
    <div className="customer-board">
      <div className="faq-title-container">
        <h1 className="faq-title">자주 묻는 질문 (FAQ)</h1>
      </div>

      {/* 검색 바 컴포넌트를 렌더링합니다. */}
      <SearchBar searchTerm={searchTerm} handleSearchChange={handleSearchChange} />

      <div className="accordion-items-container">
        {/* 필터링된 아코디언 아이템 목록을 렌더링합니다. */}
        {filteredAccordionItems.length > 0 ? (
          filteredAccordionItems.map((item, index) => (
            <AccordionItem
              key={index}
              item={item}
              index={index}
              openIndex={openIndex} // 현재 열린 아이템의 인덱스를 전달합니다.
              setOpenIndex={setOpenIndex} // 열린 아이템의 인덱스를 설정하는 함수를 전달합니다.
              toggleAccordion={toggleAccordion} // 아코디언 아이템을 토글하는 함수를 전달합니다.
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