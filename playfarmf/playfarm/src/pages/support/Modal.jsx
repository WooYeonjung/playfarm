import React from 'react';
import '../../styles/Modal.css';

// 모달 컴포넌트 정의
const Modal = ({ showModal, closeModal }) => {
  // showModal prop이 true일 때 모달을 보여줌
  return (
    showModal && ( // showModal이 true인 경우에만 렌더링
      <div className="modal">
        <div className="modal-content">
          {/* 모달 닫기 버튼 */}
          <span className="close" onClick={closeModal}>&times;</span>
          {/* 모달 내용 */}
          <p>1:1 문의가 등록되었습니다.</p>
        </div>
      </div>
    )
  );
};

export default Modal;
