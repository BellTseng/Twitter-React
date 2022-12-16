import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './SideBar.module.scss';
import Modal from '../modal/Modal';
import './navActive.scss';




const SideBar = ({ type }) => {
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
        <nav className={'nav' + ' ' + style.navbar}>
          <ul>
            <li>
              <NavLink className={style.navLink} to="admin/main">推文清單</NavLink>
            </li>
            <li>
              <NavLink className={style.navLink} to="admin/users">使用者列表</NavLink>
            </li>
            <li>
              <NavLink className={style.navLink + ' ' + style.logout} to="admin/login">登出</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <Modal isOpen={modalOpen} closeModal={handleCloseModal} />
    </div>
  )
}

export default SideBar