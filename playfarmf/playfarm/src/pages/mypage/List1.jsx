
import React, { useEffect, useState } from 'react';
import '../../styles/Mypages.css';
import { NavBarW } from "./Mypages";
import { Navigate, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../service/app-config';
import { useAuth } from '../../service/context/AuthProvider';
import { apiCall } from '../../service/apiService';

function List1() {
  const [nickNameErrMsg, setNickNameErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const { loginInfo, setLoginInfo } = useAuth();
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    profilef: '',
    email: '',
    nickname: '',
    profile: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value.replace(/\s/g, '') });
  }
  // 사진 변경 시 미리 보여주기 위함
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilef: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 새로고침해도 정보 그대로 있음
  useEffect(() => {
    const storedLoginInfo = sessionStorage.getItem('loginInfo');
    if (storedLoginInfo) {

      setLoginInfo(JSON.parse(storedLoginInfo));
    }
  }, []);
 
  useEffect(() => {
    if (loginInfo) {
      setFormData({
        userId: loginInfo.userId || '',
        email: loginInfo.email || '',
        nickname: loginInfo.nickname || '',
        profile: loginInfo.profile || ''
      });
      setPreview(`${API_BASE_URL}/resources/images/user/${loginInfo.profile || 'basicman.png'}`);
    }

  }, [loginInfo])
  const containsWhitespace = /\s/;
  // 닉네임
  const handleCheckDupName = async (e) => {
    const url = `/user/nickcheck/${formData.nickname}`;
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
        return true;
      } else {
        setNickNameErrMsg('이미 사용 중인 닉네임입니다.');
      }
    } catch (err) {
      setNickNameErrMsg('닉네임 중복 확인 중 오류 발생');
      console.error('닉네임 중복 확인 중 오류 발생:', err);
      return false;
    }
  };

  //email 중복 체크 
  const handleCheckDupEm = async (e) => {
    const emailCk = formData.email;
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && !containsWhitespace.test(email);
    };

    if (!validateEmail(emailCk)) {
      setEmailErrMsg('유효한 이메일 주소를 입력해주세요.');

      return false;
    }
    const url = `/user/emailcheck/${formData.email}`;
    try {
      const response = await apiCall(url, 'GET',);
      console.log(response);
      if (!response) {
        setEmailErrMsg('사용 가능한 이메일니다.');
        return true;
      } else {
        setEmailErrMsg('이미 사용 중인 이메일입니다.');
      }
    } catch (err) {
      setEmailErrMsg('이메일 중복 확인 중 오류 발생');
      console.error('이메일 중복 확인 중 오류 발생:', err);
      return false;
    }

  };
  const handleSubmit = (e) => {
    e.preventDefault();


    // Update localStorage
    localStorage.setItem('usersJSON', JSON.stringify(formData));
    alert('회원 정보가 수정되었습니다.');
  };

  function cancleCilck() {
    navigate(-1);
  }
  return (
    <div className='myPageMain'>
      <NavBarW />
      <div className="userInfoBox userInfoBox1">
        <h1>MEMBERSHIP</h1>
        <form className='userInfo' onSubmit={handleSubmit}>
          <div>
            {/* <label htmlFor="profilef">Profile</label> */}
            <img src={preview} />
            <input
              name='profilef'
              id='profilef'
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label htmlFor="userId" style={{ fontWeight: 'bold' }}>ID</label>
            <input
              name='userId'
              id='userId'
              type="text"
              value={formData.userId}
              readOnly
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="nickname" style={{ fontWeight: 'bold' }}>Nickname</label>
            <input
              name='nickname'
              id='nickname'
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              required
              minLength={3} maxLength={10}
            />
            <div className='errorMsg'>{nickNameErrMsg}</div>
          </div>
          <div>
            <label htmlFor="email" style={{ fontWeight: 'bold' }}>E-mail</label>
            <input
              name='email'
              id='email'
              type="text"
              value={formData.email}
              onChange={handleChange} readOnly
            />
            <div className='errorMsg'>{emailErrMsg}</div>
          </div>

          <div className="userInfoBtn">
            <button type='submit'>수정</button>
            <button type='button' onClick={cancleCilck}>취소</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default List1;
