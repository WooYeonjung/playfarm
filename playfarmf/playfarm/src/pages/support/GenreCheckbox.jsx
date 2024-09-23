import React from 'react';

// GenreCheckbox 컴포넌트 정의
const GenreCheckbox = ({ genre, checked, onChange }) => (
  // label 요소를 반환
  <label key={genre}>
    {/* 체크박스 input 요소 */}
    <input
      type="checkbox" // input 타입은 체크박스
      checked={checked} // 체크 상태는 checked props에 따라 결정됨
      onChange={onChange} // 체크 상태 변경 시 onChange 이벤트 핸들러 호출
    />
    {genre} {/* 장르 이름 텍스트 */}
  </label>
);

export default GenreCheckbox; // GenreCheckbox 컴포넌트를 외부로 내보냄