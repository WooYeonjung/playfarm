import React from "react";
import { useNavigate } from "react-router-dom";

const Step4 = ({ formData, setFormData, prevStep }) => {
  const handleChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setFormData({ ...formData, email: value });
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isAgreed: e.target.checked });
  };

  const navigate = useNavigate();

  const handleCheckDupEm = () => {
    const emailCk = formData.email;

    const validateEmail = (email) => {
      // 간단한 이메일 형식 유효성 검사
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!validateEmail(emailCk)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return false;
    }

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.isAgreed) {
      alert('개인정보 이용에 동의하셔야 합니다.');
      return;
    }
    if (handleCheckDupEm()) {
      const storedUsers = JSON.parse(localStorage.getItem('usersJSON')) || [];
      const emailExists = storedUsers.some(user => user.email === formData.email);

      if (emailExists) {
        alert('이미 사용 중인 이메일입니다.');
        return;
      }

      const updatedUsers = [...storedUsers, formData];
      localStorage.setItem('usersJSON', JSON.stringify(updatedUsers));

      // 업데이트 후 데이터 확인용 콘솔 로그 추가
      // console.log('Updated users:', updatedUsers);

      // console.log('데이터가 성공적으로 저장되었습니다:', formData);
      alert('환영합니다~!!');
      navigate('/login');
    } else {
      // console.log("이메일이 유효하지 않음, 제출을 중단합니다.");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit(e);
  }

  return (
    <div className="signUpMain">
      <div className='signUpCssBox'>
        <h1>
          <div className='Header_top_second logo'>
            <a href='/'>
              <h2><span>P</span>
                <span>l</span>
                <span>a</span>
                <span>y</span>
                <span>F</span>
                <span>a</span>
                <span>r</span>
                <span>m</span></h2>
            </a>
          </div>
        </h1>
        <form className="signUpCss" onSubmit={handleSubmit}>
          <div className="signInput">
            <input type="email" value={formData.email} onChange={handleChange} onKeyDown={handleKeyDown} />
            <span>E-mail</span>
          </div>
          <div className='textDivBox'>
            <input
              id="emailAgree"
              type="checkbox"
              checked={formData.isAgreed || false}
              onChange={handleCheckboxChange}
              required
            />
            <label htmlFor="emailAgree"> 개인정보 이용에 동의하십니까</label>
          </div>
          <div className="signUpBtn Btn2">
            <button type="button" onClick={prevStep}>이전</button>
            <button type="submit">제출</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step4;
