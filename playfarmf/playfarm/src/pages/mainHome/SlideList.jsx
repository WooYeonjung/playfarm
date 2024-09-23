
import React from 'react';
import '../../styles/SlideList.css';
import { useNavigate } from 'react-router-dom';

const SlideList = ({ slideImgList, currentSlide, handleSlideClick, currentBtn }) => {
    const totalSlides = slideImgList.length;
    const navigate = useNavigate();
    const getSlidePosition = (index) => {
        if (index === currentSlide && index === currentBtn) {
            return { transform: 'translateX(0)', zIndex: 2 };
        } else if (index === (currentSlide - 1 + totalSlides) % totalSlides && index === (currentBtn - 1 + totalSlides) % totalSlides) {
            return { transform: 'translateX(-100%)', zIndex: 1, opacity: '0.5' };
        } else if (index === (currentSlide + 1) % totalSlides && index === (currentBtn + 1) % totalSlides) {
            return { transform: 'translateX(100%)', zIndex: 1, opacity: '0.5' };
        } else {
            return { transform: 'translateX(200%)', opacity: '0', zIndex: 0 };
        }
    };
    const getNowButtonPosition = (index) => {
        if (index === currentSlide && index === currentBtn) {
            return { transform: 'translateX(0)', zIndex: 2 };
        } else if (index === (currentSlide - 1 + totalSlides) % totalSlides && index === (currentBtn - 1 + totalSlides) % totalSlides) {
            return { transform: 'translateX(-100%)', zIndex: 1, opacity: '0' };
        } else if (index === (currentSlide + 1) % totalSlides && index === (currentBtn + 1) % totalSlides) {
            return { transform: 'translateX(100%)', zIndex: 1, opacity: '0' };
        } else {
            return { transform: 'translateX(200%)', opacity: '0', zIndex: 0 };
        }
    };
    function nowGame(id) {
        navigate(`/store/detail/${id}`)
    }
    return (
        <div className="slideWrapper">
            <div className="mainSlideImg_wrapper">
                {slideImgList.map((slideImg, index) => (
                    <React.Fragment key={index}>
                        < img
                            // key={index}
                            className={`mainSlideImg ${index === currentSlide ? 'current' : ''}`}
                            src={slideImg.src}
                            alt={slideImg.alt}
                            onClick={() => handleSlideClick(index)}
                            style={getSlidePosition(index)}
                        />
                        <div className="nowGameBtn_wrapper" style={getNowButtonPosition(index)} onClick={() => nowGame(slideImg.id)}>
                            <button className={`nowGameBtn ${index === currentSlide ? 'current' : ''}`}><span>지금 게임하기</span></button >
                        </div>
                    </React.Fragment>

                ))}
            </div>

        </div >
    );
};

export default SlideList;
