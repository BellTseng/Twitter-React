import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './SideBar.module.scss';
import Modal from '../modal/Modal';




const SideBar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClick = () => {
    setModalOpen(!modalOpen);
  }

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarWrap}>
        <h1 className={style.logo}>alphitter</h1>
        <nav className={style.navbar}>
          <ul>
            <li>
              <NavLink className={style.navLink} to="/home" activeClassName={style.active}> 首頁</NavLink>
            </li>
            <li>
              <NavLink className={style.navLink} to="/userSelf/user" activeClassName={style.active}>個人資料</NavLink>
            </li>
            <li>
              <NavLink className={style.navLink} to="/setting" activeClassName={style.active}>設定</NavLink>
            </li>
            <li>
              <NavLink className={style.navLink + ' ' + style.logout} to="/login">登出</NavLink>
            </li>
          </ul>
          <button
            className={style.btn}
            onClick={handleClick}>
            推文
          </button>
        </nav>
      </div>
      <Modal isOpen={modalOpen} closeModal={handleCloseModal} />
    </div>
  )
}

export default SideBar