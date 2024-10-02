
import React, { useEffect, useState } from 'react';
import '../../styles/Mypages.css';
import { NavBarW } from "./Mypages";
import { Navigate, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../service/app-config';
import { useAuth } from '../../service/context/AuthProvider';
import { apiCall } from '../../service/apiService';
import axios from 'axios';

function List1() {
  const [nickNameErrMsg, setNickNameErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const { loginInfo, setLoginInfo, onLogout } = useAuth();
  const [myInfo, setMyInfo] = useState();
  const [preview, setPreview] = useState('');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    profilef: '',
    email: '',
    nickname: '',
    profile: '',
    birthday: ''
  });

  //css 
  const spanStyle = {
    // display: 'inline-block',
    width: '80%',
    gridColumn: '3 / 4',
    textAlign: 'right',
    color: ''
  }
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

  const userInfo = async (token) => {

    try {
      const response = await apiCall("/user", "GET", '', token);
      if (response) {
        setMyInfo(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 새로고침해도 정보 그대로 있음
  useEffect(() => {
    const storedLoginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
    // if (storedLoginInfo) {
    //   setLoginInfo(JSON.parse(storedLoginInfo));
    // }
    const token = storedLoginInfo.token;
    userInfo(token);

  }, []);



  useEffect(() => {
    if (myInfo) {
      setFormData({
        userId: myInfo.userId || '',
        email: myInfo.email || '',
        nickname: myInfo.nickname || '',
        profile: myInfo.profile || ''
      });
      setPreview(`${API_BASE_URL}/resources/images/user/${myInfo.profile || 'basicman.png'}`);
    }

  }, [myInfo])
  const containsWhitespace = /\s/;
  // 닉네임
  const handleCheckDupName = (nickname) => {
    // const url = `/user/nickcheck/${formData.nickname}`;
    // console.log(formData.nickname);
    if (!nickname || nickname.length < 3 || nickname.length > 10) {
      setNickNameErrMsg('닉네임은 3자 이상 10자 이하로 입력해주세요.');

      return false;
    }

    const specialCharOrSpace = /[!@#$%^&*(),.?":{}|<> ]/;
    if (specialCharOrSpace.test(nickname)) {
      setNickNameErrMsg('닉네임에는 특수문자나 공백을 사용할 수 없습니다.');

      return false;
    } return true;
  };

  //email 중복 체크 
  const handleCheckDupEm = (email) => {
    // const emailCk = formData.email;
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email) && !containsWhitespace.test(email);
    };

    if (!validateEmail(email)) {
      setEmailErrMsg('유효한 이메일 주소를 입력해주세요.');
      return false;
    } else {
      return true;
    }
  };


  function cancleCilck() {
    navigate(-1);
  }

  // 정보 수정을 위한 엑시오스 설정

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:8080/user/update';
    const token = loginInfo.token;
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + token
    };

    if (!handleCheckDupEm(formData.email)) {
      alert(emailErrMsg)
      return;
    }
    if (!handleCheckDupName(formData.nickname)) {
      alert(nickNameErrMsg)
      return;
    }
    try {
      const response = await axios.post(url, formData, { headers: headers });
      if (response.status === 409) {
        // alert(response.data);
        // navigate('/list1');
      }
      const result = response.data;

      setMyInfo({
        ...myInfo,
        nickname: result.nickname,
        email: result.email,
        profile: result.profile
      });
      sessionStorage.setItem("loginInfo", JSON.stringify(loginInfo));
      alert('회원 정보가 성공적으로 수정되었습니다.');

      // navigate('/membership');
    } catch (err) {
      if (err.response.status === 502) {
        alert(err.response.data);
      }
      if (err.response.status === 409) {
        alert(err.response.data);
      }
    }


  };


  // 탈퇴 
  const withdraw = async () => {
    const storedLoginInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
    // if (storedLoginInfo) {
    //   setLoginInfo(JSON.parse(storedLoginInfo));
    // }
    const token = storedLoginInfo.token;
    try {
      const response = await apiCall("/user/withdraw", "GET", '', token);
      if (response) {
        // setMyInfo(response);
        setLoginInfo(null);
        alert(response);
        sessionStorage.clear();
        navigate("/");
        // onLogout();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='myPageMain'>
      <NavBarW />
      <div className="userInfoBox userInfoBox1">
        <h1>MEMBERSHIP</h1>
        <form className='userInfo' onSubmit={handleSubmit}>
          <div>
            {/* <label htmlFor="profilef">Profile</label> */}
            <img style={{ width: '100px', height: '100px' }} src={preview} />
            <input style={{ height: '30px' }}
              name='profilef'
              id='profilef'
              type="file"
              onChange={handleFileChange}
              placeholder={formData.profile ? formData.profile : ''}
            />
          </div>
          <div >
            <h4 style={{ fontWeight: 'bold' }}>ID</h4>
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
            <h4 style={{ fontWeight: 'bold' }}>Nickname</h4>
            <input
              name='nickname'
              id='nickname'
              type="text"
              value={formData.nickname}
              onChange={handleChange}
              required
              minLength={3} maxLength={10}
            // onBlur={handleCheckDupName}
            />
          </div>
          <div>
            <h4 style={{ fontWeight: 'bold' }}>E-mail</h4>
            <input
              name='email'
              id='email'
              type="email"
              value={formData.email}
              onChange={handleChange}
              //onBlur={handleCheckDupEm}
              required
            />
            {/* <div style={{ height: '0px' }}></div> */}
          </div>
          {/* <div>
            <h4 style={{ fontWeight: 'bold' }}>Birthday</h4>
            <input
              name='birthday'
              id='birthday'
              type="birthday"
              value={formData.birthday}
              // onChange={handleChange}
              //onBlur={handleCheckDupEm}
              required
              readOnly
            />
            {/* <div style={{ height: '0px' }}></div> 
          </div> */}
          <div>
            <span style={spanStyle} onClick={() => withdraw()}>탈퇴하기</span>
          </div>
          <div className="userInfoBtn" >
            <button type='submit'>수정</button>
            <button type='button' onClick={cancleCilck}>취소</button>
          </div>
        </form>
      </div >
    </div >
  );
}
export default List1;
