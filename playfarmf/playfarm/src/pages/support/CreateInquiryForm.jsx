import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../service/app-config';

const CreateInquiryForm = () => {
    const [inquiryData, setInquiryData] = useState({
        userId: '',
        inquiryType: '',
        title: '',
        inquiryText: '',
        platformName: '',
        email: '',
        gameGenre: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiryData({
            ...inquiryData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // API로 문의 생성 요청
        axios.post(`${API_BASE_URL}/api/inquiries`, inquiryData)
            .then((response) => {
                alert('문의가 성공적으로 제출되었습니다.');
            })
            .catch((error) => {
                //console.error('Error submitting inquiry:', error);
                alert('문의 제출에 실패했습니다.');
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                사용자 ID:
                <input type="text" name="userId" value={inquiryData.userId} onChange={handleChange} required />
            </label>
            <label>
                문의 유형:
                <input type="text" name="inquiryType" value={inquiryData.inquiryType} onChange={handleChange} required />
            </label>
            <label>
                제목:
                <input type="text" name="title" value={inquiryData.title} onChange={handleChange} required />
            </label>
            <label>
                문의 내용:
                <textarea name="inquiryText" value={inquiryData.inquiryText} onChange={handleChange} />
            </label>
            <label>
                플랫폼 이름:
                <input type="text" name="platformName" value={inquiryData.platformName} onChange={handleChange} required />
            </label>
            <label>
                이메일:
                <input type="email" name="email" value={inquiryData.email} onChange={handleChange} required />
            </label>
            <label>
                게임 장르:
                <input type="text" name="gameGenre" value={inquiryData.gameGenre.join(', ')} onChange={(e) => setInquiryData({ ...inquiryData, gameGenre: e.target.value.split(', ') })} />
            </label>
            <button type="submit">문의 제출</button>
        </form>
    );
};

export default CreateInquiryForm;
