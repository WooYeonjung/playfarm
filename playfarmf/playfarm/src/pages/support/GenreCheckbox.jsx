import React from 'react';

const GenreCheckbox = ({ genre, checked, onChange }) => (
    <label>
        <input
            type="checkbox"
            checked={checked} // 체크 상태 설정
            onChange={onChange} // 변경 시 핸들러 호출
        />
        {genre} 
        {/* 장르 이름 표시 */}
    </label>
);

export default GenreCheckbox;
