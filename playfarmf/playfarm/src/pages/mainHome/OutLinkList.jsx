import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import '../../styles/button.css';


const OutLinkList = () => {

    const outLinkImg = [
        { id: 0, src: './images/logo/service_nintendo_logo.jpg', alt: 'nintendo_logo', playtype: "nintendo" },
        { id: 1, src: './images/logo/service_playstation_logo.jpg', alt: 'playstation_logo', playtype: 'playstation' },
        { id: 2, src: './images/logo/service_pc_logo.jpg', alt: 'pc_logo', playtype: "pc" }
    ];


    const outLinkGif = [
        { id: 0, src: './images/logo/nintendo.gif', alt: 'nintendo_gif' },
        { id: 1, src: './images/logo/playstaiongif.gif', alt: 'playstaion_gif' },
        { id: 2, src: './images/logo/pc.gif', alt: 'pc_gif' }
    ]

    const [currentGif, setCurrentGif] = useState(null);

    const onMouseEnter = (id) => {
        const result = outLinkGif.find(gif => gif.id === id);
        setCurrentGif(result);
    }

    const onMouseLeave = () => {
        setCurrentGif(null);
    }
    return (
        <>
            <ul className="outlinkMenuUl">
                {outLinkImg.map((outLink, i) =>
                    <li className="outLinkMenyList" key={i}><Link to={`/store/${outLink.playtype}`}>
                        <img className="outLinkImg" onMouseEnter={() => onMouseEnter(outLink.id)}
                            onMouseLeave={onMouseLeave} src={outLink.src} alt={outLink.alt} />
                    </Link> </li>
                )}
            </ul>
            <Link to={'/store/all'}>
                <div className="moreBtn_wrapper"><button className="moreBtn">+ All</button></div></Link>
            {currentGif && (
                <div className="gifContainer">
                    <img className={`gif ${currentGif ? "fadeIn" : ''}`} src={currentGif.src} alt={currentGif.alt} />
                </div>
            )}
        </>
    );
}

export default OutLinkList;

