import { Link } from "react-router-dom"

const BtInfoArr = [
  { link: '/store/pc', title: 'PC', src: require('../../images/service_Nintendo_Switch_logo.jpg') },
  { link: '/store/nintendo', title: 'Nintendo', src: require('../../images/service_pc_game_logo.jpg') },
  { link: '/store/playstation', title: 'Playstation', src: require('../../images/service_playstation_logo.jpg') },
]

function SubSlide() {

  const BtInfo = BtInfoArr.map((item, i) => {
    return (
      <div key={i} className="btInfo" style={{
        backgroundImage: `url(${item.src})`
      }}>
        <Link to={item.link}></Link>
      </div>
    )
  });

  return (
    <>
      {BtInfo}
    </>
  )
}

export default SubSlide;