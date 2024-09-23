import '../../styles/CommunityAdvertising.css';
import { useNavigate } from 'react-router-dom';

export default function CommunityAdvertising() {
    const navigate = useNavigate();

    const handleClick1 = () => {
        navigate('/store/detail/1');
    }
    const handleClick2 = () => {
        navigate('/store/detail/26');
    }

    return (
        <div className="advertising_container">
            <img
                className='ad_img'
                src="/images/advertisement/ad1.jpg"
                alt="ad1"
                onClick={handleClick1}
            />
            <img
                className='ad_img'
                src="/images/advertisement/ad2.jpg"
                alt="ad2"
                onClick={handleClick2}
            />
        </div>
    );
}
