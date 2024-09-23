import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NewsEventList = ({ tab, onDetailClick, onMore, isLastPage }) => {

    return (
        <>
            {tab.map((item, i) => {
                return (
                    <div className='article' key={i} onClick={() => { onDetailClick(item) }}>
                        <div>
                            <img className='newseventImg' src={item.src} alt={item.alt} />
                        </div>

                        <div className='article_info'>
                            <div>
                                <h2>{item.title}</h2>
                                <p>{item.subTitle}</p>
                            </div>

                        </div>
                        <p>{item.createdAt}</p>
                    </div >


                ) //map return
            })}
            {!isLastPage &&
                <div className="moreShow" onClick={() => onMore()}>
                    <span><FontAwesomeIcon className="moreShowIcon" icon={faCirclePlus} size="xl" /></span>
                </div>}
        </>
    ); //NewsEventData return


}
export default NewsEventList;