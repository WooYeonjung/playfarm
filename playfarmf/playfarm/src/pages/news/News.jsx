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
    useEffect(() => {

        let tempTab = localStorage.getItem('infoTab');
        if (!tempTab) {
            tempTab = "news";
            // navigate('/info/' + tempTab);
        }
        console.log(tempTab);
        setTab(tempTab);
        InfoService.getInfoDataPage(0, size, tempTab).then(res => {
            const pageable = res;
            const infoList = pageable.contents;
            setInfoData(infoList);
            setLastPage(res.isLastPage);
            setPage(page + 1);
            // localStorage.setItem("infoTab", tab);
        }).catch(err => {
            console.log(err);
        });
    }, [])


    useEffect(() => {
        // let tempTab = localStorage.getItem('infoTab')
        // console.log(tempTab);
        if (tab != null) {
            InfoService.getInfoDataPage(0, size, tab).then(res => {
                const pageable = res;

                const infoList = pageable.contents;
                setInfoData(infoList);
                setPage(page + 1);
                setLastPage(res.isLastPage);
                localStorage.setItem("infoTab", tab);
                // navigate('/info/' + tab);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [tab])



    const [infoData, setInfoData] = useState([]);


    const navigate = useNavigate();
    function onTabClick(data) {
        setTab(data);
        // navigate('/info/' + data);
    }
    // let itemDetail = {};
    const onDetailClick = (item) => {
        navigate(`/info/detail/${item.id}`)
    }

    const onMore = () => {
        InfoService.getInfoDataPage(page, size, tab).then(res => {
            const pageable = res;
            const infoList = pageable.contents;
            setInfoData(infoData.concat(infoList));
            setPage(page + 1);
            setLastPage(res.isLastPage);
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="news_container">
            <>
                <NavbarInfo onTabClick={onTabClick} selectTab={tab} />
            </>
            <div className='article_wrapper'>
                <NewsEventList tab={infoData} onDetailClick={onDetailClick} onMore={onMore} isLastPage={isLastPage} />
            </div>
        </div >
    )
}

