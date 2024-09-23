import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../styles/NewsDetail.css'
// import BackButton from './BackButton.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'


const getInfoData = (id) => {
    try {
        const data = JSON.parse(localStorage.getItem("infoDataJSON"));
        console.log(data);
        if (data) {
            return data.find((item) => item.id === id);
        } else {
            throw new Error("No data found in local storage.");
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};


export default function NewsDetail() {

    // before code

    // // const selectTab = tab.selectTap;
    // // console.log('****' + selectTab);
    // const { id } = useParams();
    // const [findData, setFindData] = useState(null);

    // useEffect(() => {
    //     // console.log("mount");
    //     getInfoData(id).then(res => setFindData(res))
    //         .catch(err => console.log(err));
    //     console.log(findData);
    // }, [])

    // const back = useNavigate();
    // const handleGoBack = () => {
    //     back('/news')
    // }

    const { id } = useParams();
    const [findData, setFindData] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = () => {
            try {
                const data = getInfoData(id);
                setFindData(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [id]);

    const handleGoBack = () => {
        navigate(-1);

    };


    return (

        <article className="newsDetail_container">
            {findData ? (
                <>
                    <div className="newsDetail_top">
                        <img src={findData.src} alt={findData.alt} />
                        <div className="detail_title">
                            <h1>{findData.title}</h1>
                            <p>이벤트 기간 : 2024.06.30 ~ 2024.07.10</p>
                        </div>
                        {/* <div>
                            <div class="front"><FontAwesomeIcon icon={faArrowRotateLeft} /></div>
                        </div> */}
                    </div>
                    <div className="flipBox_wrapper">
                        <div className="flip-box">
                            <button className="backButton" onClick={handleGoBack}>
                                <FontAwesomeIcon icon={faArrowLeft} className="icon" />
                                <span className="text">뒤로 돌아가기</span>
                            </button>
                            {/* <BackButton /> */}
                        </div>
                    </div>
                    <div className="newsDetail_middle">
                        <p>{findData.subTitle}</p>
                        <p>{findData.detail1}</p>
                        <img src={`${findData.detailImg}`} />
                        <p>{findData.detail2_title}</p>
                        {`${findData.detail2_detail}` && <p>{findData.detail2_detail}</p>}
                        {`${findData.detail2_detail_img}` && <img src={findData.detail2_detail_img} />}

                    </div>
                </>
            ) : (
                <p>Item not found</p>
            )}
        </article>

    )
}