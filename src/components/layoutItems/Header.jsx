import layout from './Layout.module.scss';
import { Link } from 'react-router-dom';

/* type: 
  main => 首頁
  tweet => 推文與回文串頁面，有箭頭
  user => 使用者
*/

const Header = ({ type, title, subTitle, url }) => {
  return (
    <div className={layout.header + ' ' + layout[type]}>
      {type === 'main' && <h2>{title} </h2>}
      {type === 'tweet' &&
        <Link to="/home">
          <h2 className='tweet'> {title} </h2>
        </Link>}

      {type === 'user' &&
        <Link to={url}>
          <h2 className='tweet'>
            <span>{title}</span>
            <span>{subTitle}</span>
          </h2>
        </Link>}
    </div>
  )
}

export default Header;