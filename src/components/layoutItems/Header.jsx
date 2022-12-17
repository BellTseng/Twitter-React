import layout from './Layout.module.scss';
import { Link } from 'react-router-dom';

/* type: 
  main => 首頁
  tweet => 推文，有箭頭


*/

const Header = ({ type, title, subTitle }) => {
  return (
    <div className={layout.header + ' ' + layout[type]}>
      {type === 'main' && <h2>{title} </h2>}
      {type === 'back' && <Link to="/home"> <h2 className='back'> {title} </h2> </Link>}
      

      {!!subTitle && <p>{subTitle}</p>}
    </div>
  )
}

export default Header;