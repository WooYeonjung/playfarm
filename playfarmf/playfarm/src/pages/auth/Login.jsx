import '../../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../service/context/AuthProvider';  //--로그인 프로바이더 추가
import MainSlide from './MainSlide';
import SubSlide from './SubSlide';

function Login() {
  const { onLoginSubmit, reassignContext } = useAuth();
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const { reassign, setReassign, reassignData, setReassignData, handleReassignSubmit } = reassignContext;


  const handleLogin = (event) => {
    event.preventDefault();
    onLoginSubmit(loginId, loginPw)
      .then(() => {
      })
      .catch((error) => {
        console.error("Login error in Login component:", error);
      });
  };


  const modalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const modalContentStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const formGroupStyle = {
    marginBottom: '15px',
    marginTop: '15px',
    width: '100%'

  };

  const labelStyle = {
    display: 'inline-block',
    width: '70px',
    fontWeight: 'bold'
  };

  const inputStyle = {
    // width: 'calc(100% - 80px)',
    padding: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: '1px solid #ccc',
    borderRadius: '3px'
  };

  const buttonStyle = {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '10px 15px',
    marginRight: '10px',
    cursor: 'pointer',
    borderRadius: '3px'
  };
  const formGroupStyle2 = {
    display: 'flex',
    marginBottom: '15px',
    marginTop: '15px',
    width: '100%',
    justifyContent: 'space-between'

  }


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
            required />
          <label htmlFor='loginId'><span>ID</span></label>
        </div>
        <div className='box_pw'>
          <input
            id='loginPw'
            type='password'
            name='password'
            value={loginPw}
            onChange={(e) => setLoginPw(e.target.value)}
            required />
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
      {reassign && (
        <div style={modalStyle}>

          <div style={modalContentStyle}>

            <form onSubmit={(e) => handleReassignSubmit(e)}>
              <h2>계정 확인</h2>
              <div style={formGroupStyle}>
                <label style={labelStyle}>ID</label>
                <input
                  type="text"
                  name="userId"
                  value={reassignData.userId}
                  onChange={(e) => setReassignData({ ...reassignData, userId: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={formGroupStyle}>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={reassignData.email}
                  onChange={(e) => setReassignData({ ...reassignData, email: e.target.value })}
                  style={inputStyle}
                  required
                />
              </div>
              <div style={formGroupStyle2}>
                <button type="submit" style={buttonStyle}>확인</button>
                <button type="button" style={buttonStyle} onClick={() => setReassign(false)}>닫기</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
