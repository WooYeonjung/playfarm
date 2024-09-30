import React from 'react';
import '../../styles/AccordionItem.css';

// 아코디언 아이템 컴포넌트
const AccordionItem = ({ item, index, openIndex, setOpenIndex }) => {
  // 현재 아코디언 아이템이 열려 있는지 확인
  const isOpen = openIndex === index;

  // 아코디언 열기/닫기 토글 함수
  const toggleOpen = () => {
    setOpenIndex(isOpen ? null : index); // 현재 상태에 따라 인덱스 변경
  };

  return (
    <div className="accordion-item">
      {/* 아코디언 제목: 클릭 시 열기/닫기 */}
      <div className={`accordion-title ${isOpen ? 'open' : ''}`} onClick={toggleOpen}>
        {item.title}
      </div>

      {/* 아코디언 내용: 열렸을 때만 표시 */}
      <div className={`accordion-content ${isOpen ? 'active' : ''}`}>
        {item.content}
      </div>
    </div>
  );
};

export default AccordionItem; // 컴포넌트 내보내기
