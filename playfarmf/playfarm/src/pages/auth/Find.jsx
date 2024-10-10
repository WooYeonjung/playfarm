import React, { useState, useEffect, useRef } from 'react';
import '../../styles/Find.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Find = () => {
  const [activeTab, setActiveTab] = useState('findId');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const navigator = useNavigate();
  // const [inputUserId, setInputUserId] = useState('');

  function emailCofirm() {
    const emailCk = email;

    const validateEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    if (!validateEmail(emailCk)) {
      alert('유효한 이메일 주소를 입력해주세요.');

      return false;
    } else {
      return true;
    }

  }
  const handleFindId = async (e) => {
    e.preventDefault();


    if (emailCofirm()) {
      try {
        const response = await axios.get(`/user/findid/${email}`);
        if (response) {
          setUserId(response.data);
          setMessage('');
        }
      } catch (err) {
        if (err.response.status === 502) {
          setMessage(err.response.data);
          setUserId('');
        } else {
          setMessage(err.response.data);
          setUserId('');
        }
      }
    }
  }
  const userIdRef = useRef(null);
  const specialCharOrSpace = /[!@#$%^&*(),.?":{}|<> ]/;
  function idCheck() {
    if (specialCharOrSpace.test(userId)) {
      alert('아이디에는 특수문자나 공백을 사용할 수 없습니다.');
      if (userIdRef.current) {
        userIdRef.current.focus();
      }
      return false;
    } else {
      return true;
    }
  }

  const handleFindPw = async (e) => {
    e.preventDefault();
    const requestData = { 'email': email, 'userId': userId }
    if (emailCofirm() && idCheck()) {
      try {
        const response = await axios.post(`/user/findpw`, requestData);
        setUserId('');
        setMessage('');
        alert(response.data);
        navigator('/login');

      } catch (err) {
        alert(err.response.data);
        setUserId('');
        setEmail('');
      }
    }

  }


  const openTab = (tabName) => {
    setActiveTab(tabName);
    setEmail('');
    setUserId('');
  }

  return (
    <div className='findCss'>
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
      <div className='findMainCon'>
        <div className='findMain'>
          <div>
            <button
              className={`tabLinks ${activeTab === 'findId' ? 'active' : ''}`}
              onClick={() => openTab('findId')}
            >
              <h4>아이디 찾기</h4>
            </button>
            <button
              className={`tabLinks ${activeTab === 'findPw' ? 'active' : ''}`}
              onClick={() => openTab('findPw')}
            >
              <h4>비밀번호 찾기</h4>
            </button>
          </div>
          <div>
            {activeTab === 'findId' && (
              <div id='findId' className='tabContent'>
                {/* <h2></h2> */}
                <form onSubmit={handleFindId}>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span>E-mail</span>
                  <button type='submit'>FIND</button>
                  {userId && <p style={{ color: 'white' }}>사용자 ID : {userId}</p>}
                  {userId && <p><Link to='/login' style={{ color: 'white', textDecorationLine: 'underline' }}>로그인 하시겠습니까? </Link></p>}
                  {message && <p style={{ color: 'red' }}>{message}</p>}
                </form>
              </div>
            )}

            {activeTab === 'findPw' && (
              <div id='findPw' className='tabContent2'>
                {/* <h2></h2> */}
                <form onSubmit={handleFindPw}>
                  <input
                    ref={userIdRef}
                    type='text'
                    id='userid'
                    name='userId'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                  />
                  <span>ID</span>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <span>E-mail</span>
                  <button type='submit'>FIND</button>
                  {message && <p style={{ color: 'red' }}>{message}</p>}
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Find;
