import React, { useState } from "react";

const Step3 = ({ formData, setFormData, prevStep, nextStep }) => {
  const handleChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setFormData({ ...formData, name: value });
  };

  const [errMsg, setErrMsg] = useState();

  const hadleCheckDupName = () => {
    const nameCk = formData.name;

    if (!nameCk || (nameCk.length < 4 && nameCk.length > 10)) {
      alert('닉네임은 최소 4자 이상이어야 합니다.');
      return false;
    }

    const allowedSpecialChars = /[!@#$_+-]/;
    const containsAllowedSpeciChar = allowedSpecialChars.test(nameCk);

    // 허용되지 않는 특수문자 포함 여부 검사
    const disallowedSpecialChars = /[%*()={}\[\]:;"'<>,.?\/\\|~`]/;
    const containsDisallowedSpecialChar = disallowedSpecialChars.test(nameCk);

    if (containsDisallowedSpecialChar) {
      setErrMsg('- 지정된 특수문자는 사용불가능 합니다.');
      return false;
    }

    setErrMsg('');
    return true;
  }

  const handleKeyNext = (e) => {
    e.preventDefault();
    if (hadleCheckDupName()) {
      nextStep();
      console.log("닉네임 유효함, 폼을 제출합니다.");
    } else {
      console.log("닉네임이 유효하지 않음, 제출을 중단합니다.");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleKeyNext(e);
  }

  return (
    <div className="signUpMain">
      <div className='signUpCssBox'>
        <h1>
          <div className='Header_top_second logo'>
            <a href='/'>
              <h2>
                <span>P</span>
                <span>l</span>
                <span>a</span>
                <span>y</span>
                <span>F</span>
                <span>a</span>
                <span>r</span>
                <span>m</span>
              </h2>
            </a>
          </div>
        </h1>
        <form className="signUpCss" onSubmit={handleKeyNext}>
          <div className="signInput">
            <input
              type="text"
              value={formData.name}
              onChange={handleChange}
              onKeyDown={handleKeyDown} />
            <span>Name</span>
          </div>
          <div className='textDivBox'>
            <pre style={{ color: 'red' }}>{errMsg}                      </pre>
            <pre>- 최소 4 글자 / 최대 10 글자                               </pre>
            <pre>- '!', '@', '-', '_' 만 사용 가능합니다.                   </pre>
          </div>
          <div className="signUpBtn Btn2">
            <button type="button" onClick={prevStep}>이전</button>
            <button type="submit">다음</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Step3;
