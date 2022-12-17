import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from './SideBar.module.scss';
import Modal from '../modal/Modal';
import TweetEdit from './../tweet/TweetEdit/TweetEdit';
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
              <NavLink className={style.navLink} to="/home"> 首頁</NavLink>
            </li>
            <li>
              <NavLink className={style.navLink} to="/userSelf/user">個人資料</NavLink>
            </li>
            <li>
              <NavLink className={style.navLink} to="/setting">設定</NavLink>
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
      <Modal isOpen={modalOpen} closeModal={handleCloseModal}>
        <TweetEdit />
      </Modal>
    </div>
  )
}

export default SideBar