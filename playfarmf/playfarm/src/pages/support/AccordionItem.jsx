import React from 'react';
import '../../styles/AccordionItem.css'; // 아코디언 아이템에 사용될 CSS 파일을 임포트합니다.

const AccordionItem = ({ item, index, openIndex, setOpenIndex }) => {
  // 현재 아이템이 열려 있는지 여부를 확인합니다.
  const isOpen = openIndex === index;

  // 아코디언을 토글하는 함수입니다.
  const toggleAccordion = () => {
    setOpenIndex(isOpen ? null : index); // 클릭한 아이템이 열려 있으면 닫고, 닫혀 있으면 열도록 설정합니다.
  };

  return (
    <div className="accordion-item">
      {/* 아코디언 아이템의 제목 부분입니다. 클릭 시 토글 기능이 동작합니다. */}
      <div className={`accordion-title ${isOpen ? 'open' : ''}`} onClick={toggleAccordion}>
        <span>{item.title}</span>
      </div>
      {/* 아코디언 아이템이 열려 있을 때 보여지는 내용 부분입니다. */}
      <div className={`accordion-content ${isOpen ? 'active' : ''}`}>
        <p>{item.content}</p>
      </div>
    </div>
  );
};

export default AccordionItem;