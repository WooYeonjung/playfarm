import '../../styles/SignUp.css';
import React, { useState } from "react";

const Step1 = ({ formData, setFormData, nextStep }) => {
  const handleChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setFormData({ ...formData, userid: value })
  }

  const [idErrMsg, setIdErrMsg] = useState('');
  const [idCheckMsg, setIdCheckMsg] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);

  const handleCheckDuplicate = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('usersJSON')) || [];

    if (!formData.userid || formData.userid.length < 5 || formData.userid.length > 15) {
      alert('아이디는 5자 이상 15자 이하로 입력해주세요.');
      return false;
    }
    debugger
    const foundUser = storedUsers.find(user => user.userid === formData.userid);

    if (foundUser) {
      setIdErrMsg('이미 사용 중인 아이디입니다.');
      setIdCheckMsg('');
      setIsIdChecked(false);
    } else {
      setIdErrMsg('');
      setIdCheckMsg('사용 가능한 아이디입니다.');
      setIsIdChecked(true);
    }
  }

  const handleNextStep = (e) => {
    e.preventDefault(); // 이벤트 기본 동작을 막음
    if (isIdChecked) {
      nextStep();
    } else {
      alert('아이디 중복 확인을 통과해야 합니다.');
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNextStep(e); // 이벤트 객체 전달
    }
  }

  return (
    <div className="signUpMain">
      <div className='signUpCssBox'>
        <h1><div className='Header_top_second logo'>
          <a href='/'>
            <h2><span>P</span>
              <span>l</span>
              <span>a</span>
              <span>y</span>
              <span>F</span>
              <span>a</span>
              <span>r</span>
              <span>m</span>
            </h2>
          </a>
        </div></h1>
        <form className="signUpCss signUpCss2" onSubmit={handleNextStep}>
          <div className='signInput'>
            <input
              type="text"
              value={formData.userid}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              maxLength={15} />
            <span>ID</span>
          </div>
          <div className='textDivBox'>
            <pre>- 이메일 주소를 아이디로 사용하지 마세요      </pre>
            <pre>- 최소 5자 최대 15자의 문자를 사용해주세요.   </pre>
            <pre>- 특수문자 / 공백 을 사용하지 마세요.         </pre>
          </div>
          <button type="button" onClick={handleCheckDuplicate}>중복확인</button>
          <button type="submit">다음</button>
          <div className={isIdChecked ? 'checkMsg' : 'errorMsg'}>{isIdChecked ? idCheckMsg : idErrMsg}</div>
        </form>
      </div>
    </div>
  )
}

export default Step1;

