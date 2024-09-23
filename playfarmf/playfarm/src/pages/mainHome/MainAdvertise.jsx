import { useEffect, useRef, useState } from 'react';
import '../../styles/MainAdvertise.css'
import '../../styles/button.css'
import newsVideo from '../../videos/battlegrounVideo.webm'
import { Link } from 'react-router-dom';

export default function MainAdvertise() {
    const newsVideoRef = useRef(null);
    const newsTitleRef = useRef(null);
    const newsArticleInfoRef = useRef(null);
    const newsVideoContainerRef = useRef(null);
    const newsArticleRef = useRef(null);

    const [newsVisible, setNewsVisible] = useState(false);

    useEffect(() => {
        const observerCallback = ([entry]) => {
            if (entry.isIntersecting) { // 뷰포트에 들어올 때
                setNewsVisible(true);
                newsVideoRef.current.play();
            } else {
                newsVideoRef.current.pause();
            }
        };
        const observerOptions = {
            threshold: 1,
        };
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        observer.observe(newsTitleRef.current);
        observer.observe(newsVideoContainerRef.current);
        observer.observe(newsArticleRef.current);
        observer.observe(newsArticleInfoRef.current);

        return () => {
            observer.disconnect();
        }
    }, []);



    return (
        <section className='MainAdvertise' style={{ backgroundColor: 'black', height: '100vh' }}>
            <div ref={newsTitleRef} className={`newsTitle ${newsVisible ? 'visible' : ''}`}><h1>News</h1></div>
            <div ref={newsVideoContainerRef} className={`newsVideo ${newsVisible ? 'visible' : ''}`}>
                <video ref={newsVideoRef} src={newsVideo} loop autoPlay muted></video>
            </div>
            <div ref={newsArticleRef} className={`newsArticle ${newsVisible ? 'visible' : ''}`}>
                <div style={{ width: '100%' }}>
                    <img style={{ width: '100%' }} src='./images/logo/battlegroundsXnewjeans_logo.png' alt='battlegroundsXnewjeans logo' />
                </div>
                <div ref={newsArticleInfoRef} className={`newsArticleInfo ${newsVisible ? 'visible' : ''}`}>
                    <p>
                        배틀그라운드와 뉴진스의 설레는 콜라보레이션 소식을 전해드립니다!
                    </p>
                    <p>
                        새롭게 단장한 배틀그라운드 월드와 게임 내 다양한 PUBG x 뉴진스 테마 장식, 신규 특수 제작 및 상점 아이템,
                        그리고 풍성한 이벤트까지! PUBG x 뉴진스 콜라보레이션과 함께 다양한 재미를 마음껏 느껴보세요.
                    </p>
                </div>
                <Link to='/store/detail/1'>
                    <div className='btn_1container'>
                        <button type="button" className="btn_1">Click me!</button>
                    </div>
                </Link>

            </div>
        </section>
    )
}
