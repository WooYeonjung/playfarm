import { Link } from 'react-router-dom';
import '../../styles/OutLink.css'


const onOutLinkMouseEnter = () => {
    const outLinkBtn = document.querySelector('.outlink_btn');
    const outLink_circle = outLinkBtn.querySelectorAll('circle');
    const path = outLinkBtn.querySelector('path');;
    for (let i = 0; i < outLink_circle.length; i++) {
        outLink_circle[i].setAttribute('fill', 'orange');
    }
    path.setAttribute('fill', 'orange');

}

const onOutLinkMouseLeave = () => {
    const outLinkBtn = document.querySelector('.outlink_btn');
    const outLink_circle = outLinkBtn.querySelectorAll('circle');
    const path = outLinkBtn.querySelector('path');
    for (let i = 0; i < outLink_circle.length; i++) {
        outLink_circle[i].setAttribute('fill', 'white');

    }
    path.setAttribute('fill', 'white');

}


export default function Outlink({ clickOutLink }) {

    return (

        <button  onClick={clickOutLink} onMouseEnter={onOutLinkMouseEnter} onMouseLeave={onOutLinkMouseLeave} aria-label="Open outlink layer" className="outlink_btn" data-v-ee62825a="">
            <span className="base-svg outlink_icon_outlink base-svg--icon-outlink-dot">
                <span className="base-svg_icon">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2" cy="13" r="2" fill="#fff"></circle>
                        <circle cx="2" cy="20" r="2" fill="#fff"></circle>
                        <circle cx="2" cy="27" r="2" fill="#fff"></circle>
                        <path d="M17 29a1.93 1.93 0 0 1-1.413-.587A1.928 1.928 0 0 1 15 27V13c0-.55.196-1.021.587-1.413A1.928 1.928 0 0 1 17 11h7v2h-7v14h14v-7h2v7a1.93 1.93 0 0 1-.587 1.413A1.928 1.928 0 0 1 31 29H17Zm4.7-5.3-1.4-1.4 9.3-9.3H26v-2h7v7h-2v-3.6l-9.3 9.3Z" fill="#fff">
                        </path>
                    </svg>
                </span>
            </span>
        </button>

    )
}
