import SlideList from "./SlideList";
import '../../styles/SlideList.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay, faCirclePause } from '@fortawesome/free-regular-svg-icons'
import { useEffect, useRef, useState } from "react";


export default function Slide() {

    const slideImgList = [
        { id: 1, title: 'PUBG:BATTLEGROUNDS', src: '/images/game/gameitem1.jpg', alt: 'battleground' },
        { id: 2, title: 'Apex Legends', src: '/images/game/gameitem2.jpg', alt: 'apex' },
        { id: 3, title: 'GTFO', src: '/images/game/gameitem3.jpg', alt: 'gtfo' },
        { id: 4, title: 'Terraria', src: '/images/game/gameitem4.jpg', alt: 'terraria' },
        { id: 5, title: 'WorkdZWar', src: '/images/game/gameitem5.jpg', alt: 'palworld' },
        { id: 6, title: 'overwatch2', src: '/images/game/gameitem6.jpg', alt: 'overcooked2' },
        { id: 7, title: 'grandtheftauto5', src: '/images/game/gameitem7.jpg', alt: 'superbunnyman' },
    ];


    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentBtn, setCurrentBtn] = useState(0)
    const [playState, setPlayState] = useState(true);
    const intervalRef = useRef(null);

    const onPlayClick = () => {
        setPlayState(prevState => {
            const newState = !prevState;
            if (!newState) {
                clearInterval(intervalRef.current);
            } else {
                startInterval();
            }
            return newState;
        });
    };

    const startInterval = () => {
        intervalRef.current = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slideImgList.length);
            setCurrentBtn(prev => (prev + 1) % slideImgList.length);
        }, 4000);
    };

    useEffect(() => {
        if (playState) {
            startInterval();
        }
        return () => clearInterval(intervalRef.current);
    }, [playState, slideImgList.length]);

    const handleSlideClick = (index) => {
        setCurrentSlide(index);
        setCurrentBtn(index);
    }


    //타이틀 천천히 올라오기
    const titleRef = useRef(null);

    const [titleVisible, setTitleVisible] = useState(false);

    useEffect(() => {
        const observerTitle = ([en]) => {
            if (en.isIntersecting) {
                setTitleVisible(true);
            }
            // else {
            //     setTitleVisible(false);
            // }
        };
        const observerOption = {
            threshold: 1,
        };
        const observer = new IntersectionObserver(observerTitle, observerOption);
        observer.observe(titleRef.current);
        return () => {
            observer.disconnect();
        }

    }, [])

    return (
        <section className="mainSlideImg_container">
            <div ref={titleRef} className={`mainSlide_title ${titleVisible ? 'visible' : ''}`}><h1>Monthly Game</h1></div>
            <SlideList
                slideImgList={slideImgList}
                currentSlide={currentSlide}
                handleSlideClick={handleSlideClick}
                currentBtn={currentBtn}
            />
            <div className="play_btn_wrapper">
                <button className='play_btn' onClick={onPlayClick}>
                    {!playState ? <span>
                        <FontAwesomeIcon icon={faCirclePlay} style={{ color: "#e6e6e6", width: '30px', height: '30px' }} />
                    </span>
                        : <span>
                            <FontAwesomeIcon icon={faCirclePause} style={{ color: "red", width: '30px', height: '30px' }} />
                        </span>}
                </button>
            </div>
        </section>
    );
}
