import React from 'react';

// FormInput 컴포넌트는 다양한 입력 유형을 처리하기 위한 재사용 가능한 컴포넌트입니다.
const FormInput = ({ label, type, name, value, onChange, required, readOnly, className, children }) => {
  // input 요소에 적용할 props를 하나의 객체로 정의합니다.
  const inputProps = {
    type,         // 입력 유형 (text, textarea, select 등)
    name,         // 입력 필드의 이름
    value,        // 입력 필드의 값
    onChange,     // 입력 값이 변경될 때 호출될 콜백 함수
    required,     // 필수 입력 여부
    readOnly,     // 읽기 전용 여부
    className     // 입력 필드에 적용할 추가 클래스
  };

  return (
    <label>
      <span>{label}</span>
      {/* 입력 유형에 따라 적절한 입력 요소를 렌더링합니다. */}
      {type === 'textarea' ? (
        <textarea {...inputProps} />  // textarea일 경우 textarea 요소를 렌더링하고 inputProps를 전달합니다.
      ) : type === 'select' ? (
        <select {...inputProps}>
          {children}  {/* select 요소의 자식으로 옵션들을 렌더링합니다. */}
        </select>
      ) : (
        <input {...inputProps} />  // 기본적으로 input 요소를 렌더링하고 inputProps를 전달합니다.
      )}
    </label>
  );
};

export default FormInput;
