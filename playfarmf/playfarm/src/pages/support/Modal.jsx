import React from 'react';
import '../../styles/Modal.css';

// 모달 컴포넌트 정의
const Modal = ({ showModal, closeModal, onConfirm, message }) => {
  if (!showModal) return null;  // 모달이 표시되지 않으면 아무것도 렌더링하지 않음

  return (
      <div className="modal-overlay">
          <div className="modal-content">
              <p>{message}</p>
              <div className="modal-buttons">
                  <button onClick={closeModal}>취소</button>
                  <button onClick={onConfirm}>삭제</button>
              </div>
          </div>
      </div>
  );
};

export default Modal;
