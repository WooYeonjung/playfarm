import React from 'react';
import '../../styles/Modal.css'; // CSS 스타일 import

const Modal = ({ showModal, closeModal }) => {
  return (
    showModal && ( // 모달이 표시될 조건
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span> 
          {/* 모달 닫기 버튼 */}
          <p>1:1 문의가 등록되었습니다.</p> 
          {/* 등록 완료 메시지 */}
        </div>
      </div>
    )
  );
};

export default Modal;
