import React from 'react';

const FormInput = ({ label, type, name, value, onChange, required, readOnly, className, children }) => {
  const inputProps = {
    type,
    name,
    value,
    onChange,
    required,
    readOnly,
    className
  };

  return (
    <label>
      <span>{label}</span>
      {type === 'textarea' ? ( // 텍스트 영역 처리
        <textarea {...inputProps} />
      ) : type === 'select' ? ( // 선택 상자 처리
        <select {...inputProps}>
          {children} 
          {/* 자식 요소로 옵션 전달 */}
        </select>
      ) : (
        <input {...inputProps} /> // 일반 입력 처리
      )}
    </label>
  );
};

export default FormInput;
