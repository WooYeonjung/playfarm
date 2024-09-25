import '../../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../service/context/AuthProvider';  //--로그인 프로바이더 추가
import MainSlide from './MainSlide';
import SubSlide from './SubSlide';

function Login() {
  const { onLoginSubmit } = useAuth();
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const loginNavi = useNavigate();

  // useEffect(() => {
  //   const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  //   const storedUserData = localStorage.getItem('userData');

  //   if (storedIsLoggedIn === 'true' && storedUserData) {
  //     setIsLoggedIn(true);
  //     setUserData(JSON.parse(storedUserData));
  //     setUsername(JSON.parse(storedUserData).name); // 사용자 이름 설정
  //   }
  // }, []);

  // const users = JSON.parse(localStorage.getItem('usersJSON'));

  // provider 로 하기 추가
  const handleLogin = async (event) => {
    console.log(loginId);
    event.preventDefault();
    try {
      await onLoginSubmit(loginId, loginPw);
      alert("로그인 성공!");
      loginNavi('/');
    } catch (error) {
      if (error === 502) {
        alert("id 또는 password 가 다릅니다, 다시하세요 ~~");
      } else {
        alert("로그인 중 오류가 발생했습니다. 다시 시도해 주세요.");
      }
      console.error("Login error in Login component:", error);
    }
  };

  // const handleLogin = (event) => {
  //   event.preventDefault();
  //   const user = users.find((u) => u.userid === loginId && u.password === loginPw);
  //   if (user) {
  //     alert("로그인 성공!");
  //     loginNavi('/');
  //     setIsLoggedIn(true);
  //     setUsername(user.name); // 사용자의 이름을 저장
  //     setUserData(user);
  //     localStorage.setItem('isLoggedIn', 'true');
  //     localStorage.setItem('userData', JSON.stringify(user));
  //   } else {
  //     alert("아이디 또는 비밀번호가 일치하지 않습니다.");
  //   }
  // };

  return (
    <div className='LoginMain'>
      <div className='slideCon'>
        <div className='mainSlide'>
          <MainSlide />
        </div>
        <div className='subSlide'>
          <SubSlide />
        </div>
      </div>

      <form className='LoginBox' onSubmit={handleLogin}>
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
        <div className='box_id'>
          <input
            id='loginId'
            name='userId'
            type='text'
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <label htmlFor='loginId'><span>ID</span></label>
        </div>
        <div className='box_pw'>
          <input
            id='loginPw'
            type='password'
            name='password'
            value={loginPw}
            onChange={(e) => setLoginPw(e.target.value)}
          />
          <label htmlFor='loginPw'><span>Password</span></label>
        </div>
        <div>
          <button type='submit'>Login</button>
        </div>
        <div className='linkName'>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/find'>Find ID/PW</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
