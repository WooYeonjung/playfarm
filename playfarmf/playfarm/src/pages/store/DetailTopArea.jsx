import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../../styles/DetailTopArea.css';

export default function DetailTopArea() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <>
            <img className='game_logo' src={require('../../images/store/PUBG/battlegrounds-logo.jpg')} alt="game logo" />
            <div className='game_main'>
                <img className='game_title' src={require('../../images/store/PUBG/battlegrounds-title.jpg')} alt="game title" />
                <div className={`game_content ${inView ? 'show' : ''}`} ref={ref}>
                    PUBG:배틀그라운드는 최대 100인의 플레이어가 다양한 무기와 전략으로 마지막 1명이 살아남는 순간까지
                    전투하는 배틀로얄 게임입니다. 점점 좁혀지는 경기 구역내에서 전략적으로 배치된 무기, 차량 및 소모품을
                    찾아 전투하고 '최후의 1인'이 되어보세요.
                </div>
            </div>
        </>
    );
}
