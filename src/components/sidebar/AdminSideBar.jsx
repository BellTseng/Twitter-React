import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './SideBar.module.scss';
import './navActive.scss';
import { useAuth } from '../../contexts/AuthContext';




const SideBar = ({ type }) => {
  const { logout } = useAuth()
  // const [modalOpen, setModalOpen] = useState(false);
  // const handleClick = () => {
  //   setModalOpen(!modalOpen);
  // }

  // const handleCloseModal = () => {
  //   setModalOpen(false);
  // }

  function handleLogout () {
    logout()
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarWrap}>
        <h1 className={style.logo}>alphitter</h1>
        <nav className={'nav' + ' ' + style.navbar}>
          <ul>
            <li>
              <NavLink className={style.navLink} to="admin/main">推文清單</NavLink>
            </li>
            <li>
              <NavLink className={style.navLink} to="admin/users">使用者列表</NavLink>
            </li>
            <li>
              <button 
                className={style.navLink + ' ' + style.logout}
                onClick={handleLogout}
              >
                登出
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SideBar