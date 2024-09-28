import React, { useEffect, useState } from 'react';
import '../../styles/Mypages.css';
import { NavBarW } from "./Mypages";
import { useNavigate } from 'react-router-dom';

const inputList = [
  { id: 'name', title: 'Name', contents: '- 특수문자 금지 / 변경 후 60일 뒤에 재변경 가능' },
  { id: 'userid', title: 'ID' },
  { id: 'password', title: 'Pw', contents: '- 변경 후 60일 뒤에 재변경 가능 / 8 ~ 16 자' },
  { id: 'userPwCh', title: 'Pw Check' },
  { id: 'email', title: 'E-mail' },
];

function List1() {
  const [formData, setFormData] = useState({
    id: '',
    userid: '',
    password: '',
    email: '',
    name: '',
  });

  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState('비밀번호는 8자 이상 16자 이하이며, 숫자, 특수문자를 포함해야 합니다.');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData !== null) {
      const user = JSON.parse(userData);
      setFormData({
        id: user.id || '',
        userid: user.userid || '',
        password: '',
        email: user.email || '',
        name: user.name || '',
      });
      console.log(user);
    }
  }, []);

  const containsWhitespace = /\s/;

  const validataPassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return passwordRegex.test(password) && !containsWhitespace.test(password);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && !containsWhitespace.test(email);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === 'passwordCheck') {
      setPasswordCheck(value);
    } else if (id !== 'userid') { // userid는 변경하지 않도록 설정
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== passwordCheck) {
      alert('비밀번호가 맞지 않습니다.');
      return;
    }

    if (!validataPassword(formData.password)) {
      alert('비밀번호는 8자 이상 16자 이하이며, 숫자, 특수문자를 포함해야 합니다.');
      return;
    }

    if (!validateEmail(formData.email)) {
      setEmailError('유효한 이메일 주소를 입력하세요.');
      return;
    }

    setPasswordError('');
    setEmailError('');

    // Update localStorage
    localStorage.setItem('usersJSON', JSON.stringify(formData));
    alert('회원 정보가 수정되었습니다.');
  };

  const removeLog = useNavigate();

  const handleDelete = () => {
    if (!window.confirm('정말로 탈퇴하시겠습니까?')) {
      return;
    }

    // Remove from localStorage
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    alert('탈퇴 처리가 완료되었습니다.');
    removeLog('/');
    // Redirect or perform any other actions after successful deletion
  };

  return (
    <div className='myPageMain'>
      <NavBarW />
      <div className="userInfoBox userInfoBox1">
        <h1>MEMBERSHIP</h1>
        <form className='userInfo' onSubmit={handleSubmit}>
          <div>
            <h4>Name</h4>
            <input
              id='name'
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <h4>ID</h4>
            <span style={{ paddingRight: '40%', fontWeight: '500' }}>{formData.userid}</span>
          </div>
          {/* <div>
            <h4>Pw</h4>
            <input
              id='password'
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
          </div>
          <div>
            <h4>Pw-Check</h4>
            <input
              id='passwordCheck'
              type="password"
              value={passwordCheck}
              onChange={handleChange}
              required
            />
          </div> */}
          <div>
            <h4>E-mail</h4>
            <input
              id='email'
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <p>{inputList[0].contents}</p>
          <p>{passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}</p>
          <div className="userInfoBtn">
            <button type='submit'>수정</button>
            <button type='button' onClick={handleDelete}>탈퇴</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default List1;
