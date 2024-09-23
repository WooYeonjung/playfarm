import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const imgArr = [
  { src: require('../../images/store/gameitem1.jpg'), alt: 'img1', link: '/', text: "배틀그라운드 (PUBG: PlayerUnknown's Battlegrounds)는 블루홀 스튜디오에서 개발한 배틀 로얄 게임입니다. 최대 100명의 플레이어가 고립된 섬에 착륙해 생존을 위해 싸우며, 최후의 1인이 되기 위해 전투를 벌입니다. 시간이 지날수록 전투 지역이 좁아져 긴장감이 높아집니다. 다양한 무기와 전략적 요소로 큰 인기를 끌고 있습니다." },
  { src: require('../../images/store/gameitem2.jpg'), alt: 'img2', link: '/', text: 'Apex Legends는 Respawn Entertainment에서 개발하고 EA에서 배급하는 배틀 로얄 게임입니다. 최대 60명의 플레이어가 팀을 이루어 생존을 위해 싸우며, 각기 다른 능력을 가진 레전드를 선택하여 전략적인 전투를 벌입니다. 게임이 진행됨에 따라 전투 지역이 좁아져 긴장감이 높아집니다. 뛰어난 그래픽과 빠른 게임 플레이로 큰 인기를 끌고 있습니다.' },
  { src: require('../../images/store/gameitem3.jpg'), alt: 'img3', link: '/', text: 'GTFO는 10 Chambers Collective에서 개발한 협동형 1인칭 슈팅 게임입니다. 최대 4명의 플레이어가 팀을 이루어 지하 복합 시설에서 미션을 수행하며, 무시무시한 괴물들과 싸우며 생존을 도모합니다. 각 플레이어는 다양한 무기와 도구를 활용해 팀워크와 전략적인 플레이가 필수적입니다. 높은 난이도와 긴장감 넘치는 게임 플레이로 많은 인기를 끌고 있습니다.' },
  { src: require('../../images/store/gameitem4.jpg'), alt: 'img4', link: '/', text: 'Back 4 Blood는 Turtle Rock Studios에서 개발한 협동형 1인칭 슈팅 게임입니다. 최대 4명의 플레이어가 팀을 이루어 좀비 아포칼립스 속에서 생존을 위해 싸웁니다. 각 플레이어는 고유한 능력과 무기를 가지고 있으며, 다양한 카드를 활용해 게임 스타일을 커스터마이즈할 수 있습니다. 빠른 게임 플레이와 협력의 중요성으로 큰 인기를 끌고 있습니다. ' },
  { src: require('../../images/store/gameitem5.jpg'), alt: 'img5', link: '/', text: 'World War Z는 Saber Interactive에서 개발한 협동형 3인칭 슈팅 게임입니다. 최대 4명의 플레이어가 팀을 이루어 세계 각지에서 좀비 떼를 상대하며, 미션을 수행하고 생존을 도모합니다. 빠른 전개와 방대한 좀비 물량, 다양한 무기와 캐릭터 클래스가 특징입니다. 팀워크와 전략적인 플레이가 중요하며, 긴장감 넘치는 전투로 큰 인기를 얻고 있습니다.' },
]

function MainSlide() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevIndex(currentIndex)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imgArr.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <>
      {imgArr.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? 'active' : ''} ${index === prevIndex ? 'prev' : ''}`}
        >
          <Link to={'/'}><img className={`Slide${index + 1}`} src={`${image.src}`} alt={image.alt} /></Link>
          <div className="imgInfo">
            <p>{image.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</p>
          </div>
        </div>
      ))}
    </>
  )
};

export default MainSlide;