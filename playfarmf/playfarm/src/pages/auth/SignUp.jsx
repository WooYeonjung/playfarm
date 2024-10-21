
import '../../styles/SignUp.css';
import { apiCall } from '../../service/apiService';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../service/app-config';

function SignUp() {
  const [idErrMsg, setIdErrMsg] = useState('');
  const [pwErrMsg, setPwErrMsg] = useState('');
  const [pwcErrMsg, setPwcErrMsg] = useState('');
  const [nickNameErrMsg, setNickNameErrMsg] = useState('');
  const [isNickNameChecked, setIsNickNameChecked] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [isEmailErrMsg, setIsEmailErrMsg] = useState('');
  const [idCheckMsg, setIdCheckMsg] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [profileImg, setProfileImg] = useState('basicman.png');

  useEffect(() => {
    const today = new Date();
    const minYear = today.getFullYear() - 74; // 1950년 기준
    const maxYear = today.getFullYear() - 6; // 2018년 기준

    setMinDate(`${minYear}-01-01`);
    setMaxDate(`${maxYear}-12-31`);
  }, []);
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    passwordCheck: '',
    nickname: '',
    profilef: '',
    birthday: '',
    email: '',
    isAgreed: false,
  });
  const specialCharOrSpace = /[!@#$%^&*(),.?":{}|<> ]/;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.replace(/\s/g, '') });
  };
  const navigate = useNavigate();

  // id 유효성 및 중복체크 
  const handleCheckDuplicate = async (e) => {
    e.preventDefault();
    const url = `${API_BASE_URL}/user/idcheck/${formData.userId}`;
    // const data = { userId: formData.userId }
    if (!formData.userId || formData.userId.length < 5 || formData.userId.length > 10) {
      setIdErrMsg('아이디는 5자 이상 10자 이하로 입력해주세요.');
      return false;
    }
    if (specialCharOrSpace.test(formData.userId)) {
      setIdErrMsg('특수문자나 공백을 사용할 수 없습니다.');
      return false;
    }
    try {
      const reponse = await apiCall(url, 'GET');
      console.log(reponse);
      if (!reponse) {
        setIdErrMsg('');
        setIdCheckMsg('사용 가능한 아이디입니다.');
        setIsIdChecked(true);
      } else {
        setIdErrMsg('이미 사용 중인 아이디입니다.')
        setIdCheckMsg('');
        setIsIdChecked(false);

      }
    } catch (err) {
      alert('아이디 중복 확인 중 오류 발생');
      console.error('아이디 중복 확인 중 오류 발생:', err);
    }
  };

  // pw 확인 및 pwc 확인
  const handleCheckPassword = () => {
    const passCk = formData.password;
    const passSpecialChar = /[!@#$%^&]/.test(passCk);

    if (passCk.length < 5 || passCk.length > 15) {
      setPwErrMsg('비밀번호는 최소 5자 이상 15자 이하로 입력해주세요.');
      setFormData({ ...formData, password: '', passwordCheck: '' });
      return false;
    } else {
      setPwErrMsg('');
    }

    if (!passSpecialChar) {
      setPwErrMsg('비밀번호에는 특수문자가 하나 이상 필요합니다.');
      setFormData({ ...formData, password: '', passwordCheck: '' });
      return false;
    }
    if (formData.passwordCheck !== '') {
      if (formData.password !== formData.passwordCheck) {
        setPwcErrMsg('비밀번호가 일치하지 않습니다.');
        setFormData({ ...formData, passwordCheck: '' });
        return false;
      } else {
        setPwcErrMsg('비밀번호가 일치합니다.');
        return true;
      }

    }
    setErrMsg('');

  };


  // 닉네임
  const handleCheckDupName = async (e) => {
    const url = `${API_BASE_URL}/user/nickcheck/${formData.nickname}`;
    console.log(formData.nickname);
    if (!formData.nickname || formData.nickname.length < 3 || formData.nickname.length > 10) {
      setNickNameErrMsg('닉네임은 3자 이상 10자 이하로 입력해주세요.');
      return false;
    }

    const specialCharOrSpace = /[!@#$%^&*(),.?":{}|<> ]/;
    if (specialCharOrSpace.test(formData.nickname)) {
      setNickNameErrMsg('닉네임에는 특수문자나 공백을 사용할 수 없습니다.');
      return false;
    }

    try {
      const response = await apiCall(url, 'GET');
      console.log(response);
      if (!response) {
        setNickNameErrMsg('사용 가능한 닉네임입니다.');
        setIsNickNameChecked(true);
        return true;
      } else {
        setNickNameErrMsg('이미 사용 중인 닉네임입니다.');
        setIsNickNameChecked(false);

      }
    } catch (err) {
      setNickNameErrMsg('닉네임 중복 확인 중 오류 발생');
      console.error('닉네임 중복 확인 중 오류 발생:', err);
      return false;
    }

  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isAgreed: e.target.checked });
  };

  const handleCheckDupEm = async (e) => {
    const emailCk = formData.email;

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!validateEmail(emailCk)) {
      setEmailErrMsg('유효한 이메일 주소를 입력해주세요.');

      return false;
    }
    const url = `${API_BASE_URL}/user/emailcheck/${formData.email}`;
    try {
      const response = await apiCall(url, 'GET',);
      console.log(response);
      if (!response) {
        setEmailErrMsg('사용 가능한 이메일니다.');
        setIsEmailErrMsg('true')
        return true;
      } else {
        setEmailErrMsg('이미 사용 중인 이메일입니다.');
        setIsEmailErrMsg('false')

      }
    } catch (err) {
      setEmailErrMsg('이메일 중복 확인 중 오류 발생');
      console.error('이메일 중복 확인 중 오류 발생:', err);
      return false;
    }

  };

  const handleNextStep = async (e) => {
    // const data = { ...formData, formData }
    e.preventDefault();

    // const formDataToSend = new FormData(document.getElementById("joinForm"));
    const formDataToSend = new FormData(document.getElementById("joinForm"));
    if (!isIdChecked) {
      alert('아이디 중복 확인해야 합니다.');
      return;
    }
    if (!handleCheckPassword()) {
      alert("비밀번호가 유효하지 않습니다. 다시 시도하세요.");
      return;
    }
    if (!handleCheckDupName()) {
      alert("닉네임이 유효하지 않습니다. 다시 시도하세요.");
      return;
    }

    if (!handleCheckDupName()) {
      alert('이미 사용중인 이메일입니다.다시 시도하세요.');
      return;
    }

    if (!formData.isAgreed) {
      alert('개인정보 이용에 동의하셔야 합니다. 다시 시도하세요.');
      return;
    }

    try {
      const response = await apiCall('/user/join', 'POST', formDataToSend, null);

      if (response) {
        alert('회원가입에 성공하였습니다. 로그인 후 이용해주세요.');
        navigate(response);
      }
    } catch (err) {
      if (err === 502) {
        alert("회원가입에 실패하였습니다. 다시 시도하세요.");
        navigate('/signup');
      } else {
        console.log(`err=${err}`);
        navigate('/signup');
      }
    }

  };

  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter') {
  //     handleNextStep();
  //   }
  // };

  return (
    <>
      <div className="signUpContainer">
        <div className="signUpMain">

          <h1>SignUp</h1>

          <div className='signUpCssBox'>
            {/* <form className="signUpCss signUpCss2" id="joinForm" action="user/join" encType="multipart/form-data" onSubmit={handleNextStep}> */}
            <form className="signUpCss signUpCss2" id="joinForm" onSubmit={handleNextStep}>
              <div className='signInputWrapper'>
                <label htmlFor="userid">ID</label>
                <div className='signInput'>
                  <input
                    id="userid"
                    name="userId"
                    type="text"
                    value={formData.userId}
                    onChange={handleChange}
                    // onKeyDown={handleKeyDown}
                    onblur={handleCheckDuplicate}
                    minLength={5} maxLength={10} placeholder='ID는 5~10자의 문자를 입력하세요.' required />
                  <div className='errorMsg'>{isIdChecked ? idCheckMsg : idErrMsg}</div>
                </div>
                <button type="button" className="Btn1" onClick={handleCheckDuplicate}>중복확인</button>
                <label htmlFor="password">Password</label>
                <div className="signInput">
                  <input id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    placeholder='비밀번호는 5 ~ 15 자리를 입력하세요.'
                    minLength={5} maxLength={15}
                    onChange={handleChange}
                    //onKeyDown={handleKeyDown}
                    onBlur={handleCheckPassword} required />
                  <div className='errorMsg'>{pwErrMsg}</div>
                </div>

                <label htmlFor="passwordCheck">PWCheck</label>
                <div className="signInput">
                  <input id="passwordCheck"
                    name="passwordCheck"
                    type="password"
                    minLength={5} maxLength={15}
                    placeholder='비밀번호와 동일하게 입력하세요.'
                    value={formData.passwordCheck}
                    onChange={handleChange}
                    //  onKeyDown={handleKeyDown}
                    onBlur={handleCheckPassword} required />
                  <div className='errorMsg'>{pwcErrMsg}</div>
                </div>
                <label htmlFor="nickName">Nickname</label>
                <div className="signInput">
                  <input id="nickName"
                    name="nickname"
                    type="text"
                    value={formData.nickname}
                    placeholder='닉네임은 3 ~ 10 글자입니다.'
                    minLength={3} maxLength={10}
                    onChange={handleChange}
                    //  onKeyDown={handleKeyDown}
                    onBlur={handleCheckDupName}
                    required />
                  <div className='errorMsg'>{nickNameErrMsg}</div>
                </div>
                <label htmlFor="birthday">Birthday</label>
                <div className="signInput">
                  <input id="birthday"
                    name="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={handleChange}
                    //  onKeyDown={handleKeyDown} 
                    min={minDate} max={maxDate} required />
                </div>
                <span></span>
                <label htmlFor="email">E-mail</label>
                <div className="signInput">
                  <input id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    // onKeyDown={handleKeyDown}
                    onBlur={handleCheckDupEm} required />
                  <div className='errorMsg'>{emailErrMsg}</div>
                </div>
                <span></span>
                <label htmlFor="profilef">Profile</label>
                <div className="signInput">
                  {<input id="profile"
                    name="profilef"
                    type="file"
                    onChange={handleChange}
                  //onKeyDown={handleKeyDown}
                  />}
                </div>
                <span></span>
                <div className='textDivBox'>
                  <input
                    id="emailAgree"
                    type="checkbox"
                    checked={formData.isAgreed}
                    onChange={handleCheckboxChange}
                    required />
                  <label htmlFor="emailAgree">개인정보 이용에 동의하십니까</label>
                </div>
                <div className="termsBox">
                  <p>
                    본 약관은 귀하의 개인정보를 보호하고, 개인정보와 관련된 법률을 준수하기 위해 작성되었습니다.
                    귀하의 개인정보는 다음과 같은 목적으로 사용됩니다:
                    <ul>
                      <li>▶ 서비스 제공 및 운영</li>
                      <li>▶ 고객 지원 및 문의 응대</li>
                      <li>▶ 서비스 개선 및 사용자 경험 향상</li>
                      <li>▶ 법적 의무 준수</li>
                    </ul>
                    귀하는 언제든지 개인정보 제공을 거부할 수 있으며, 이 경우 서비스 이용에 제한이 있을 수 있습니다.
                    자세한 내용은 개인정보 처리방침을 참조하시기 바랍니다.
                  </p>
                </div>
                <div className="signUpBtn Btn2">
                  <button type="submit">가입</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;