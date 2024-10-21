import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../service/app-config";

const NewsEventList = ({ tab, onDetailClick, onMore, isLastPage }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        let formatDate2 = new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.');

        return formatDate2;
    };
    return (
        <>
            {tab.map((item, i) => {
                return (
                    <div className='article' key={i} onClick={() => { onDetailClick(item) }}>
                        <div>
                            <img className='newseventImg' src={`${API_BASE_URL}/resources/images/info/${item.titleImg}`} alt={item.infoTitle} />
                        </div>

                        <div className='article_info'>
                            <div>
                                <h2>{item.infoTitle}</h2>
                                <p>{item.subtitle}</p>
                            </div>

                        </div>
                        <p>{formatDate(item.regDate)}</p>
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