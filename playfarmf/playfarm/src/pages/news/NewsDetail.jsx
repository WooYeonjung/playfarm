import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../styles/NewsDetail.css'
// import BackButton from './BackButton.jsx'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { API_BASE_URL } from "../../service/app-config";


const getInfoData = async (id) => {
    try {
        const data = axios.get(`${API_BASE_URL}/info/infodetail?id=${id}`);
        return data;
        // console.log(data);
        // if (data) {
        //     return data.find((item) => item.id === id);
        // } else {
        //     throw new Error("No data found in local storage.");
        // }
    } catch (error) {
        console.error(error);
        return null;
    }
};


export default function NewsDetail() {

    const { id } = useParams();
    const [findData, setFindData] = useState(null);
    const navigate = useNavigate();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInfoData(id);
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
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        let formatDate2 = new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '.');
        // if (formatDate2.endsWith('-')) {
        //   formatDate2 = formatDate2.slice(0, -1);
        // }
        return formatDate2;
    };


    return (

        <article className="newsDetail_container">
            {findData ? (
                <>
                    <div className="newsDetail_top">
                        <img src={`${API_BASE_URL}/resources/images/info/${findData.data.titleImg}`} alt={findData.data.infoTitle} />
                        <div className="detail_title">
                            <h1>{findData.data.infoTitle}</h1>
                            <p>이벤트 기간 : {formatDate(findData.data.startDate)} ~ {formatDate(findData.data.endDate)}</p>
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
                        <p>{findData.data.subtitle}</p>
                        <p>{findData.data.detailCon}</p>
                        {findData.data.afterName && findData.data.afterName[0] && <img src={`${API_BASE_URL}/resources/images/info/${findData.data.afterName[0]}`} />}
                        <p>{findData.data.sectionTitle}</p>
                        {findData.data.sectionCon && <p>{findData.data.sectionCon}</p>}
                        {findData.data.afterName && findData.data.afterName[1] && <img src={`${API_BASE_URL}/resources/images/info/${findData.data.afterName[1]}`} />}

                    </div>
                </>
            ) : (
                <p>Item not found</p>
            )}
        </article>

    )
}