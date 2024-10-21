// import { Link } from 'react-router-dom'
import '../../styles/News.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import NavbarInfo from '../../components/NavbarInfo';
import NewsEventList from './NewsEventList';
import InfoService from '../../service/infoService';

export default function News() {
    const size = 5;
    const [page, setPage] = useState(0);
    const [isLastPage, setLastPage] = useState(false);
    const [tab, setTab] = useState();
    const [infoData, setInfoData] = useState([]);
    useEffect(() => {
        let tempTab = localStorage.getItem('infoTab');
        if (!tempTab) {
            tempTab = "news";
            // navigate('/info/' + tempTab);
        }
        setTab(tempTab);
        // const fetchData = async () => {

        //     let tempTab = localStorage.getItem('infoTab');
        //     if (!tempTab) {
        //         tempTab = "news";
        //         // navigate('/info/' + tempTab);
        //     }
        //     console.log(tempTab);
        //     setTab(tempTab);
        //     await InfoService.getInfoDataPage(0, size, tempTab).then(res => {
        //         debugger;
        //         const pageable = res;
        //         const infoList = pageable.data.content;
        //         setInfoData(infoList);
        //         setLastPage(res.isLast);
        //         setPage(page + 1);
        //         // localStorage.setItem("infoTab", tab);
        //     }).catch(err => {
        //         console.log(err);
        //     });
        // }
        // fetchData();
    }, [])


    useEffect(() => {
        // let tempTab = localStorage.getItem('infoTab')
        // console.log(tempTab);
        const fetchData = async () => {
            if (tab != null) {
                await InfoService.getInfoDataPage(0, size, tab).then(res => {
                    const pageable = res;

                    const infoList = pageable.data.content;
                    setInfoData(infoList);
                    setPage(page + 1);
                    setLastPage(res.isLastPage);
                    localStorage.setItem("infoTab", tab);
                    // navigate('/info/' + tab);
                }).catch(err => {
                    //console.log(err);
                });
            }
        }
        fetchData();
    }, [tab])






    const navigate = useNavigate();
    function onTabClick(data) {
        setTab(data);
        // navigate('/info/' + data);
    }
    // let itemDetail = {};
    const onDetailClick = (item) => {
        navigate(`/info/detail/${item.infoId}`)
    }

    const onMore = () => {
        InfoService.getInfoDataPage(page, size, tab).then(res => {
            const pageable = res;
            const infoList = pageable.contents;
            setInfoData(infoData.concat(infoList));
            setPage(page + 1);
            setLastPage(res.isLastPage);
        }).catch(err => {
           // console.log(err);
        });
    }

    return (
        <div className="news_container">
            <>
                <NavbarInfo onTabClick={onTabClick} selectTab={tab} />
            </>
            <div className='article_wrapper'>
                {infoData &&
                    <NewsEventList tab={infoData} onDetailClick={onDetailClick} onMore={onMore} isLastPage={isLastPage} />
                }
            </div>
        </div >
    )
}

