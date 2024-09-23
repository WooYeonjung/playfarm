import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJetFighterUp } from '@fortawesome/free-solid-svg-icons';
import '../styles/button.css'
import { useEffect, useState } from "react";
export default function TopButton() {

    // 버튼의 가시성 상태를 저장하는 state
    const [topVisible, setTopVisible] = useState(false);
    // 버튼의 하단 오프셋을 저장하는 state
    const [bottomOffset, setBottomOffset] = useState(30);

    // 스크롤 위치와 푸터 위치를 기반으로 버튼 가시성 및 위치를 조정하는 함수
    const topBtnVisibility = () => {
        const footer = document.querySelector('footer'); // 푸터 요소 선택
        const footerRect = footer.getBoundingClientRect(); // 푸터의 위치 및 크기 정보 가져오기
        const scrollTop = window.scrollY; // 현재 스크롤 위치 가져오기

        // 스크롤 위치가 300 이상일 때 버튼 보이기
        if (scrollTop > 300) {
            setTopVisible(true);
            // 푸터가 뷰포트 안에 있을 때 버튼의 하단 오프셋 조정
            if (footerRect.top < window.innerHeight) {
                setBottomOffset(window.innerHeight - footerRect.top);
            } else {
                setBottomOffset(20);
            }
        } else {
            setTopVisible(false); // 스크롤 위치가 300 미만일 때 버튼 숨기기
        }
    };

    // 페이지 최상단으로 스크롤하는 함수
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // 부드럽게 스크롤
        });
    };

    // 컴포넌트가 마운트되었을 때 스크롤 이벤트 리스너 추가
    useEffect(() => {
        window.addEventListener('scroll', topBtnVisibility);
        return () => {
            window.removeEventListener('scroll', topBtnVisibility); // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        };
    }, []);
    return (
        <div className="scroll-to-top" style={{ bottom: `${bottomOffset}px` }}>
            {topVisible &&
                <div onClick={scrollToTop} className="scroll-button">
                    <FontAwesomeIcon icon={faJetFighterUp} size="2x" />
                </div>
            }
        </div>
    )
}