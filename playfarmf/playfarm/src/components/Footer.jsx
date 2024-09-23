import React from 'react';
import '../styles/Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitch, faFacebook, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';



const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-section about">
                    <h2>About Us</h2>
                    <p>
                        Welcome to PlayFarm, your ultimate destination for immersive gaming experiences. From thrilling action games to engaging strategy titles, we offer a diverse selection of games for all types of gamers. Join us and explore new worlds today!
                    </p>

                    {/* <p><br />PlayFarm에 오신 것을 환영합니다, 몰입감 넘치는 게임 경험을 위한 궁극의 목적지입니다. 스릴 넘치는 액션 게임부터 몰입감 있는 전략 타이틀까지, 모든 유형의 게이머를 위한 다양한 게임을 제공합니다. 지금 가입하고 새로운 세계를 탐험해 보세요!</p> */}
                </div>
                <div className="footer-section links">
                    <h2>Quick Links</h2>
                    <ul>
                        <li><a href="/store/all">Games</a></li>
                        <li><a href="/news">News</a></li>
                        <li><a href="/community">Community</a></li>
                        <li><a href="/contact">Support</a></li>
                        <li><a href="/">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section contact">
                    <h2>Contact Us</h2>
                    <ul>
                        <li><span>Email:</span> support@playfarm.com</li>
                        <li><span>Phone:</span> +82-031-567-890</li>
                        <li><span>Address:</span> 123 playfarm St, playfarm, GT 12345</li>
                    </ul>
                </div>
                <div className="footer-section social">
                    <h2>Follow Us</h2>
                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />

                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} />
                        </a>
                        <a href="https://www.twitch.tv" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitch} />
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 PlayFarm. All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;