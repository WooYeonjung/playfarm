import React from "react";

const Step2 = ({ formData, setFormData, nextStep, prevStep }) => {
  const handleChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    setFormData({ ...formData, password: value });
  }

  const hadleCheckDupPw = () => {
    const passCk = formData.password;

    if (passCk.length < 6 && passCk.length > 15) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return false;
    }

    const passUppercase = /[A-Z]/.test(passCk);
    if (!passUppercase) {
      alert('비밀번호에는 대문자가 최소 하나 이상 필요합니다.');
      return false;
    }

    const passSpecialChar = /[!@#$%^&]/.test(passCk);
    if (!passSpecialChar) {
      alert('비밀번호에는 특수문자가 하나 이상 필요합니다.');
      return false;
    }

    return true;
  }

  const handleKeyNext = (e) => {
    e.preventDefault();
    if (hadleCheckDupPw()) {
      nextStep();
      //  console.log("비밀번호 유효함, 폼을 제출합니다.");
    } else {
      //console.log("비밀번호가 유효하지 않음, 제출을 중단합니다.");
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleKeyNext(e);
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
        {/* <div className='signUpLogo'>
        </div> */}
        <form className="signUpCss" onSubmit={handleKeyNext}>
          <div className="signInput">
            <input
              type="password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={handleKeyDown} />
            <span>Password</span>
          </div>
          <div className='textDivBox'>
            <pre>- 최소 4 글자 / 최대 12 글자</pre>
            <pre>- 대문자 / 소문자 구분      </pre>
            <pre>- 특수문자 포함.            </pre>
          </div>
          <div className="signUpBtn Btn2">
            <button type="button" onClick={prevStep}>이전</button>
            <button type="submit">다음</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Step2;