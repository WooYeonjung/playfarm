// admin 비번 admin0000

// React 라이브러리에서 필요한 요소들을 불러옵니다.
import React from 'react';
import '../../styles/Board.css'; // Board.css 스타일 시트를 가져옵니다.
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // FontAwesomeIcon을 가져옵니다.
import { faHouse, faHeadset, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'; // 몇 가지 FontAwesome 아이콘을 가져옵니다.
import { Link } from 'react-router-dom'; // react-router-dom의 Link 컴포넌트를 가져옵니다.

// CustomerCenter 함수형 컴포넌트를 선언합니다.
const CustomerCenter = () => {
  return (
    <div className="parent">
      {/* 첫 번째 링크 - 고객센터 */}
      <div className="div1"><h3><FontAwesomeIcon icon={faHouse} /> 고객센터</h3></div>

      {/* 두 번째 링크 - 1:1 문의 */}
      <Link to={'/InquiryForm'} className="div2"><div><h3><FontAwesomeIcon icon={faHeadset} /> 1:1문의</h3></div></Link>

      {/* 세 번째 링크 - 닌텐도 스토어 링크 */}
      <Link to={'/store/nin'} className="div3"><div></div></Link>

      {/* 네 번째 링크 - PC 스토어 링크 */}
      <Link to={'/store/pc'} className="div4"><div></div></Link>

      {/* 다섯 번째 링크 - 플레이스테이션 스토어 링크 */}
      <Link to={'/store/ps'} className="div5"><div></div></Link>

      {/* 여섯 번째 링크 - 자주 묻는 질문 (FAQ) */}
      <Link to={'/customerboard'} className="div6"><div><h3><FontAwesomeIcon icon={faQuestionCircle} /> 자주묻는 질문 (FAQ)</h3></div></Link>
    </div>
  );
};

// CustomerCenter 컴포넌트를 외부로 내보냅니다.
export default CustomerCenter;