// import '../../styles/SignUp.css';
// import React, { useState } from 'react';
// import Step1 from './Step1';
// import Step2 from './Step2';
// import Step3 from './Step3';
// import Step4 from './Step4';

// function SignUp() {

//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     userid: '',
//     password: '',
//     email: '',
//     name: '',
//     isAgreed: '',
//   });

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };


//   const handleKeyNext = (e) => {
//     if (e.key === 'Enter') nextStep();
//   }

//   switch (step) {
//     case 1:
//       return <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} handleKeyNext={handleKeyNext} />
//     case 2:
//       return <Step2 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} handleKeyNext={handleKeyNext} />
//     case 3:
//       return <Step3 formData={formData} setFormData={setFormData} nextStep={nextStep} prevStep={prevStep} handleKeyNext={handleKeyNext} />
//     case 4:
//       return <Step4 formData={formData} setFormData={setFormData} prevStep={prevStep} />
//     default:
//       return <div>Something went wrong</div>;
//   }
// }

// export default SignUp;



//----회원가입 하나로 합치기
// import '../../styles/SignUp.css';
// import React, { useState } from 'react';


// function SignUp() {

//   const [idErrMsg, setIdErrMsg] = useState('');
//   const [idCheckMsg, setIdCheckMsg] = useState('');
//   const [isIdChecked, setIsIdChecked] = useState(false);
//   const [errMsg, setErrMsg] = useState();

//   const [formData, setFormData] = useState({
//     userid: '',
//     password: '',
//     name: '',
//     nickname: '',
//     profilef: '',
//     birthday: '',
//     email: '',
//     isAgreed: '',
//   });
//   const handleChange = (e) => {
//     const value = e.target.value.replace(/\s/g, '');
//     setFormData({ ...formData, userid: value })
//   }


//   const handleCheckDuplicate = (e) => {
//     e.preventDefault();
//     const storedUsers = JSON.parse(localStorage.getItem('usersJSON')) || [];

//     if (!formData.userid || formData.userid.length < 5 || formData.userid.length > 15) {
//       alert('아이디는 5자 이상 15자 이하로 입력해주세요.');
//       return false;
//     }

//     const foundUser = storedUsers.find(user => user.userid === formData.userid);

//     if (foundUser) {
//       setIdErrMsg('이미 사용 중인 아이디입니다.');
//       setIdCheckMsg('');
//       setIsIdChecked(false);
//     } else {
//       setIdErrMsg('');
//       setIdCheckMsg('사용 가능한 아이디입니다.');
//       setIsIdChecked(true);
//     }
//   }


//   const hadleCheckDupPw = () => {
//     const passCk = formData.password;

//     if (passCk.length < 6 && passCk.length > 15) {
//       alert('비밀번호는 최소 6자 이상이어야 합니다.');
//       return false;
//     }

//     const passUppercase = /[A-Z]/.test(passCk);
//     if (!passUppercase) {
//       alert('비밀번호에는 대문자가 최소 하나 이상 필요합니다.');
//       return false;
//     }

//     const passSpecialChar = /[!@#$%^&]/.test(passCk);
//     if (!passSpecialChar) {
//       alert('비밀번호에는 특수문자가 하나 이상 필요합니다.');
//       return false;
//     }

//     return true;
//   }
//   const hadleCheckDupName = () => {
//     const nameCk = formData.name;

//     if (!nameCk || (nameCk.length < 4 && nameCk.length > 10)) {
//       alert('닉네임은 최소 4자 이상이어야 합니다.');
//       return false;
//     }

//     const allowedSpecialChars = /[!@#$_+-]/;
//     const containsAllowedSpeciChar = allowedSpecialChars.test(nameCk);

//     // 허용되지 않는 특수문자 포함 여부 검사
//     const disallowedSpecialChars = /[%*()={}\[\]:;"'<>,.?\/\\|~`]/;
//     const containsDisallowedSpecialChar = disallowedSpecialChars.test(nameCk);

//     if (containsDisallowedSpecialChar) {
//       setErrMsg('- 지정된 특수문자는 사용불가능 합니다.');
//       return false;
//     }

//     setErrMsg('');
//     return true;
//   }
//   const handleCheckboxChange = (e) => {
//     setFormData({ ...formData, isAgreed: e.target.checked });
//   };

//   // const navigate = useNavigate();

//   const handleCheckDupEm = () => {
//     const emailCk = formData.email;

//     const validateEmail = (email) => {
//       // 간단한 이메일 형식 유효성 검사
//       const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       return regex.test(email);
//     };

//     if (!validateEmail(emailCk)) {
//       alert('유효한 이메일 주소를 입력해주세요.');
//       return false;
//     }

//     return true;
//   }
//   const handleNextStep = (e) => {
//     e.preventDefault(); // 이벤트 기본 동작을 막음
//     if (!isIdChecked) {
//       alert('아이디 중복 확인을 통과해야 합니다.');
//     }
//     if (!hadleCheckDupPw()) {
//       console.log("비밀번호가 유효하지 않음, 제출을 중단합니다.");
//     }
//     if (hadleCheckDupName()) {
//       console.log("닉네임이 유효하지 않음, 제출을 중단합니다.");
//     }
//   }
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter') {
//       handleNextStep(e); // 이벤트 객체 전달
//     }
//     if (!formData.isAgreed) {
//       alert('개인정보 이용에 동의하셔야 합니다.');
//       return;
//     }
//     if (handleCheckDupEm()) {
//       const storedUsers = JSON.parse(localStorage.getItem('usersJSON')) || [];
//       const emailExists = storedUsers.some(user => user.email === formData.email);

//       if (emailExists) {
//         alert('이미 사용 중인 이메일입니다.');
//         return;
//       }

//       const updatedUsers = [...storedUsers, formData];
//       localStorage.setItem('usersJSON', JSON.stringify(updatedUsers));

//       // 업데이트 후 데이터 확인용 콘솔 로그 추가
//       console.log('Updated users:', updatedUsers);

//       console.log('데이터가 성공적으로 저장되었습니다:', formData);
//       alert('환영합니다~!!');
//       // navigate('/login');
//     } else {
//       console.log("이메일이 유효하지 않음, 제출을 중단합니다.");
//     }
//   }

//   return (
//     <div className="signUpMain">
//       <div className='signUpCssBox'>
//         <form className="signUpCss signUpCss2" onSubmit={handleNextStep}>
//           <div className='signInputWrapper'>
//             <label for="userid">ID</label>
//             <div className='signInput'>
//               <input
//                 id="userid"
//                 type="text"
//                 value={formData.userid}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown}
//                 minLength={5} maxLength={15} placeholder='최소 5자 최대 15자의 문자입력, 특수문자&공백 사용 x' />
//               <div className={isIdChecked ? 'checkMsg' : 'errorMsg'}>{isIdChecked ? idCheckMsg : idErrMsg}</div>
//             </div>
//             <button type="button" classNamw="Btn1" onClick={handleCheckDuplicate}>중복확인</button>
//             <label for="password">Password</label>
//             <div className="signInput">
//               <input id="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown} />
//             </div>
//             <span></span>
//             <label for="pwcheck">PWCheck</label>
//             <div className="signInput">
//               <input id="pwcheck"
//                 type="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown} />
//             </div>
//             <span></span>
//             <label for="nickName">NickName</label>
//             <div className="signInput">
//               <input id="nickName"
//                 type="text"
//                 value={formData.name}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown} />
//             </div>
//             <span></span>
//             <label for="birthday">Birthday</label>
//             <div className="signInput">
//               <input id="birthday"
//                 type="date"
//                 value={formData.birthday}
//                 onChange={handleChange}
//                 onKeyDown={handleKeyDown} />
//             </div>
//             <span></span>
//             <label for="nickName">E-mail</label>
//             <div className="signInput">
//               <input type="email" value={formData.email} onChange={handleChange} onKeyDown={handleKeyDown} />
//             </div>
//             <span></span>
//             <label for="profile">Profile</label>
//             <div className="signInput">
//               <input type="file" value={formData.profile} onChange={handleChange} onKeyDown={handleKeyDown} />
//             </div>
//             <span></span>
//             <div className='textDivBox'>
//               <input
//                 id="emailAgree"
//                 type="checkbox"
//                 checked={formData.isAgreed || false}
//                 onChange={handleCheckboxChange}
//                 required
//               />
//               <label htmlFor="emailAgree" style={{ color: 'white' }}>개인정보 이용에 동의하십니까</label>
//             </div>
//             <div className="signUpBtn Btn2">
//               <button type="submit">다음</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default SignUp;
// import { faCircle } from '@fortawesome/free-solid-svg-icons';
import '../../styles/SignUp.css';
import React, { useState } from 'react';

function SignUp() {
  const [idErrMsg, setIdErrMsg] = useState('');
  const [idCheckMsg, setIdCheckMsg] = useState('');
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [formData, setFormData] = useState({
    userid: '',
    password: '',
    passwordCheck: '',
    name: '',
    nickname: '',
    profile: '',
    birthday: '',
    email: '',
    isAgreed: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.replace(/\s/g, '') });
  };

  const handleCheckDuplicate = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('usersJSON')) || [];

    if (!formData.userid || formData.userid.length < 5 || formData.userid.length > 10) {
      alert('아이디는 5자 이상 10자 이하로 입력해주세요.');
      return false;
    }

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
  };

  const handleCheckDupPw = () => {
    const passCk = formData.password;

    if (passCk.length < 6 || passCk.length > 15) {
      alert('비밀번호는 최소 6자 이상이어야 합니다.');
      return false;
    }

    // const passUppercase = /[A-Z]/.test(passCk);
    // if (!passUppercase) {
    //   alert('비밀번호에는 대문자가 최소 하나 이상 필요합니다.');
    //   return false;
    // }

    const passSpecialChar = /[!@#$%^&]/.test(passCk);
    if (!passSpecialChar) {
      alert('비밀번호에는 특수문자가 하나 이상 필요합니다.');
      return false;
    }

    if (formData.password !== formData.passwordCheck) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }

    return true;
  };

  const handleCheckDupName = () => {
    const nameCk = formData.name;

    if (!nameCk || nameCk.length < 4 || nameCk.length > 10) {
      alert('닉네임은 4 ~ 10 글자입니다.');
      return false;
    }

    const allowedSpecialChars = /[!@#$_+-]/;
    const containsAllowedSpeciChar = allowedSpecialChars.test(nameCk);

    const disallowedSpecialChars = /[%*()={}\[\]:;"'<>,.?\/\\|~`]/;
    const containsDisallowedSpecialChar = disallowedSpecialChars.test(nameCk);

    if (containsDisallowedSpecialChar) {
      setErrMsg('- 지정된 특수문자는 사용불가능 합니다.');
      return false;
    }

    const storedUsers = JSON.parse(localStorage.getItem('usersJSON')) || [];
    const foundUser = storedUsers.find(user => user.name === formData.name);

    if (foundUser) {
      alert('이미 사용 중인 닉네임입니다.');
      return false;
    }

    setErrMsg('');
    return true;
  };

  const handleCheckboxChange = (e) => {
    setFormData({ ...formData, isAgreed: e.target.checked });
  };

  const handleCheckDupEm = () => {
    const emailCk = formData.email;

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!validateEmail(emailCk)) {
      alert('유효한 이메일 주소를 입력해주세요.');
      return false;
    }

    return true;
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (!isIdChecked) {
      alert('아이디 중복 확인을 통과해야 합니다.');
      return;
    }
    if (!handleCheckDupPw()) {
      console.log("비밀번호가 유효하지 않음, 제출을 중단합니다.");
      return;
    }
    if (!handleCheckDupName()) {
      console.log("닉네임이 유효하지 않음, 제출을 중단합니다.");
      return;
    }
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

      console.log('Updated users:', updatedUsers);
      console.log('데이터가 성공적으로 저장되었습니다:', formData);
      alert('환영합니다~!!');
      // navigate('/login');
    } else {
      console.log("이메일이 유효하지 않음, 제출을 중단합니다.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleNextStep(e);
    }
  };

  return (
    <>
      <div className="signUpContainer">
        <div className="signUpMain">
         
          <h1>SignUp</h1>
        
          <div className='signUpCssBox'>
            <form className="signUpCss signUpCss2" onSubmit={handleNextStep}>
              <div className='signInputWrapper'>
                <label htmlFor="userid">ID</label>
                <div className='signInput'>
                  <input
                    id="userid"
                    name="userid"
                    type="text"
                    value={formData.userid}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    minLength={5} maxLength={10} placeholder='최소 5자 최대 10자의 문자입력, 특수문자&공백 사용 x' />
                  <div className={isIdChecked ? 'checkMsg' : 'errorMsg'}>{isIdChecked ? idCheckMsg : idErrMsg}</div>
                </div>
                <button type="button" className="Btn1" onClick={handleCheckDuplicate}>중복확인</button>
                <label htmlFor="password">Password</label>
                <div className="signInput">
                  <input id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    minLength={5} maxLength={15}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />
                </div>
                <span></span>
                <label htmlFor="passwordCheck">PWCheck</label>
                <div className="signInput">
                  <input id="passwordCheck"
                    name="passwordCheck"
                    type="password"
                    minLength={5} maxLength={15}
                    value={formData.passwordCheck}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />
                </div>
                <span></span>
                <label htmlFor="nickName">NickName</label>
                <div className="signInput">
                  <input id="nickName"
                    name="name"
                    type="text"
                    value={formData.name}
                    minLength={4} maxLength={10}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />
                </div>
                <span></span>
                <label htmlFor="birthday">Birthday</label>
                <div className="signInput">
                  <input id="birthday"
                    name="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />
                </div>
                <span></span>
                <label htmlFor="email">E-mail</label>
                <div className="signInput">
                  <input id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />
                </div>
                <span></span>
                <label htmlFor="profile">Profile</label>
                <div className="signInput">
                  <input id="profile"
                    name="profile"
                    type="file"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown} />
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
                  <button type="submit">다음</button>
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