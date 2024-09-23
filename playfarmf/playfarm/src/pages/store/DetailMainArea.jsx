import '../../styles/DetailMainArea.css';

export default function DetailMainArea() {
    return (
        <div className='game_main_area'>
            <section className='game_purchase_type_area'>
                <div>
                    <img className='nintendo_purchase' src={require('../../images/store/service_Nintendo_Switch_logo.jpg')} />
                </div>
                <div>
                    <img className='playstation_purchase' src={require('../../images/store/service_playstation_logo.jpg')} />
                </div>
                <div>
                    <img src={require('../../images/store/service_pc_game_logo.jpg')} />
                </div>
            </section>
            <section>
                
            </section>
        </div>
    );
}