import React from 'react';

// SearchBar 컴포넌트는 검색 기능을 제공하는 입력 상자를 렌더링합니다.
const SearchBar = ({ searchTerm, handleSearchChange }) => {
  return (
    <div className="search-container">
      {/* 입력 상자를 렌더링합니다. */}
      <input
        type="text" // 입력 상자의 타입을 텍스트로 설정합니다.
        id="search-input" // 고유 id 속성 추가
        name="search" // 고유 name 속성 추가
        placeholder="검색어를 입력하세요..." // 입력 상자에 나타날 힌트 텍스트를 설정합니다.
        value={searchTerm} // 검색어 상태를 입력 상자의 값으로 설정합니다. 이 값은 부모 컴포넌트에서 전달됩니다.
        onChange={handleSearchChange} // 입력 상자의 값이 변경될 때 호출될 함수를 설정합니다. 이벤트 객체는 핸들러 함수에 전달됩니다.
      />
    </div>
  );
};

export default SearchBar;
