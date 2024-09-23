import React, { useState, useEffect } from 'react';
import '../../styles/Find.css';

const Find = () => {
  const [activeTab, setActiveTab] = useState('findId');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [inputUserId, setInputUserId] = useState('');

  // useEffect(() => {
  //   const handleUnload = () => {
  //     // 사용자가 Find 페이지를 벗어날 때 foundUserId를 제거
  //     localStorage.removeItem('foundUserId');
  //   };

  //   // 이벤트 리스너 등록
  //   window.addEventListener('beforeunload', handleUnload);

  //   // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener('beforeunload', handleUnload);
  //   };
  // }, []); // 빈 배열을 넣어 한 번만 실행되도록 설정

  const handleFindId = (e) => {
    e.preventDefault();

    // 가짜 데이터 (실제 서버 요청 대신 사용)
    const fakeData = JSON.parse(localStorage.getItem('usersJSON'));

    const foundUser = fakeData.find(user => user.email === email);

    if (foundUser) {
      setUserId(foundUser.userid);
      setMessage('');
      // 사용자 ID를 로컬 스토리지에 저장
      localStorage.setItem('foundUserId', foundUser.userid);
    } else {
      setMessage('User not found');
      setUserId('');
      // 사용자 ID가 없으면 로컬 스토리지에서 제거
      localStorage.removeItem('foundUserId');
    }
  }

  const handleFindPw = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('usersJSON')) || [];
    const email = e.target.email.value; // 폼에서 이메일 값을 가져옴
    const userId = inputUserId; // 폼에서 아이디 값을 가져옴

    const foundUser = storedUsers.find(user => user.userid === userId && user.email === email);

    if (foundUser) {
      setUserPw(foundUser.password);
      setMessage('');
      // 사용자 비밀번호를 로컬 스토리지에 저장
      localStorage.setItem('foundUserPw', foundUser.password);
    } else {
      setMessage('User not found');
      setUserPw('');
      // 사용자 비밀번호가 없으면 로컬 스토리지에서 제거
      localStorage.removeItem('foundUserPw');
    }
  }


  const openTab = (tabName) => {
    setActiveTab(tabName);
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
                  {message && <p style={{ color: 'red' }}>{message}</p>}
                </form>
              </div>
            )}
            {activeTab === 'findPw' && (
              <div id='findPw' className='tabContent2'>
                {/* <h2></h2> */}
                <form onSubmit={handleFindPw}>
                  <input
                    type='text'
                    id='userid'
                    name='userid'
                    value={inputUserId}
                    onChange={(e) => setInputUserId(e.target.value)}
                    required
                  />
                  <span>ID</span>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    required
                  />
                  <span>E-mail</span>
                  <button type='submit'>FIND</button>
                  {userPw && <p style={{ color: 'white' }}>사용자 PW : {userPw}</p>}
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
