import style from './SideBar.module.scss';
import Modal from '../modal/Modal';
import { useState } from 'react';



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
              <a href="/" className={style.navLink}>
                首頁
              </a>
            </li>
            <li>
              <a href="/" className={style.navLink}>
                個人資料
              </a>
            </li>
            <li>
              <a href="/" className={style.navLink}>
                設定
              </a>
            </li>
          </ul>
          <button
            className={style.btn}
            onClick={handleClick}>
            推文
          </button>
        </nav>
        <button
          className={style.btnLogout} >
          登出
        </button>
      </div>
      <Modal />
    </div>
  )
}

export default SideBar