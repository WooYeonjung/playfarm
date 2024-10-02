import { NavLink } from 'react-router-dom'
import '../../styles/HomeMainPage.css'
import mainGameVideo from '../../videos/maingame_video_1.mp4'
import Slide from './Slide';
import { useEffect, useRef, useState } from 'react';
import MainAdvertise from './MainAdvertise';

function MainVideo() {
    const videoRef = useRef(null); // 동영상 요소에 대한 참조 생성
    const [isVisible, setIsVisible] = useState(false); // 요소가 화면에 나타나는지 여부를 추적하는 상태

    useEffect(() => {
        // Intersection Observer 설정
        const observer = new IntersectionObserver(

            ([entry]) => {
                if (entry.isIntersecting) { // 요소가 뷰포트에 들어올 때
                    setIsVisible(true); // 상태를 true로 설정
                    videoRef.current.play(); // 동영상 재생
                } else { // 요소가 뷰포트를 벗어날 때
                    // setIsVisible(false); // 상태를 false로 설정
                    videoRef.current.pause(); // 동영상 일시정지
                }
            },
            {
                threshold: 0.5, // 요소의 50%가 뷰포트에 들어올 때 콜백 실행
            }
        );

        observer.observe(videoRef.current); // 동영상 요소 관찰 시작

        return () => {
            observer.disconnect(); // 컴포넌트가 언마운트될 때 관찰 중지
        };
    }, []);


    return (
        <div className="video_wrapper">
            <NavLink to='/info/detail/16' className={`mainGame_video ${isVisible ? 'visible' : ''}`}>
                <video src={mainGameVideo} ref={videoRef} loop autoPlay muted>
                </video>

                <div className="monthly_event">
                    <div className="top">
                        <p className="eventTilte">PlayFarm</p>
                        <p>Monthly Event</p>
                        <span>'Arise a Simple Story'</span>
                    </div>
                    <div>
                        <p>DISCOUNT AND MORE</p>
                        <p>NOW THROUGH 06.30</p>
                    </div>
                </div>
            </NavLink>
        </div>
    )
}


export default function HomeMainPage() {
    return (
        <>

            <MainVideo />
            <MainAdvertise />
            <Slide />
        </>
    )
}