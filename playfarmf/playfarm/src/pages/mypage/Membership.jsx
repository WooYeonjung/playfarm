import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../styles/Membership.css';
import { NavBarW } from './Mypages';
import { useNavigate } from 'react-router-dom';
import { apiCall } from '../../service/apiService';
import { useAuth } from '../../service/context/AuthProvider';
Modal.setAppElement('#root'); // 애플리케이션의 루트 요소를 설정합니다.

const Membership = () => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState(''); //현재 비밀번호
    const [newPassword, setNewPassword] = useState(''); // 새비밀번호 확인
    const [confirmPassword, setConfirmPassword] = useState(''); //새비밀번호 확인
    const [pwErrMsg, setPwErrMsg] = useState('');

    const openPasswordModal = () => setIsPasswordModalOpen(true);
    const closePasswordModal = () => {
        setIsPasswordModalOpen(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setPwErrMsg('');
    };
    const navigate = useNavigate();
    const { loginInfo } = useAuth();
    const customStyles = { // 모달 커스터마이징
        content: {
            width: '400px',
            height: '300px',
            margin: 'auto',
            bordeRadius: '20px',
        }
    };

    const memberInfo = () => {
        navigate('/list1');
    }
    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const passSpecialChar = /[!@#$%^&]/.test(newPassword);
        if (newPassword.length < 5 || newPassword.length > 15) {
            setPwErrMsg('비밀번호는 최소 5자 이상 15자 이하로 입력해주세요.');
            setNewPassword('')
            setConfirmPassword('');
            return;
        } else {
            setPwErrMsg('');
        }
        if (!passSpecialChar) {
            setPwErrMsg('비밀번호에는 특수문자가 하나 이상 필요합니다.');
            setNewPassword('')
            setConfirmPassword('');
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("새 비밀번호가 일치하지 않습니다.");
            setNewPassword('')
            setConfirmPassword('');
            return;
        }
        const formData = new FormData();
        formData.append('password', currentPassword);
        formData.append('newPassword', newPassword);

        const token = loginInfo.token;
        console.log(formData);
        try {

            const response = await apiCall('/user/updatepw', 'POST', formData, token);
            debugger;
            if (response) {

                alert(response);
                closePasswordModal();
                sessionStorage.clear();
                navigate('/login');
            }

        } catch (err) {
            if (err.response.status === 502) {
                alert('비밀번호 변경에 실패하였습니다. 다시 시도해 주세요.')
            } else {
                alert(err.response.data);
                setCurrentPassword('')
                setNewPassword('')
                setConfirmPassword('');
            }
        }

    }

    return (
        <div className='MembershipPageMain'>
            <NavBarW />
            <div className="membershipBox" >
                <h1>MEMBERSHIP</h1>
                <div className='membershipBox_btn'>
                    <button onClick={memberInfo}>내 정보 확인</button>
                    <button onClick={openPasswordModal}>비밀번호 변경</button>
                </div>

                {/* 비밀번호 변경 모달 */}
                <Modal
                    isOpen={isPasswordModalOpen}
                    onRequestClose={closePasswordModal}
                    contentLabel="비밀번호 변경"
                    style={customStyles}
                >
                    <form onSubmit={handlePasswordChange} id="changePw">
                        <h2>비밀번호 변경</h2>
                        <div >
                            <div >
                                <label htmlFor="currentPassword">현재 비밀번호</label>
                                <input
                                    name="password"
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                />
                            </div>
                            <div >
                                <label htmlFor="newPassword">새 비밀번호</label>
                                <input id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <div className='errorMsg'>{pwErrMsg}</div>
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">새 비밀번호 확인</label>
                                <input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div>
                                <button type="submit">수정</button>
                                <button onClick={closePasswordModal}>닫기</button>
                            </div>
                        </div>

                    </form>
                </Modal>
            </div>
        </div>
    );
};

export default Membership;
