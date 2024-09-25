import { Link } from "react-router-dom"

const BtInfoArr = [
  { link: '/store/pc', title: 'PC', src: '/images/logo/service_pc_logo.jpg' },
  { link: '/store/nintendo', title: 'Nintendo', src: '/images/logo/service_nintendo_logo.jpg' },
  { link: '/store/playstation', title: 'Playstation', src: '/images/logo/service_playstation_logo.jpg' },
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