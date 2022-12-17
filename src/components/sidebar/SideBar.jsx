import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import style from './SideBar.module.scss';
import Modal from '../modal/Modal';
import TweetEdit from './../tweet/TweetEdit/TweetEdit';
import './navActive.scss';




const SideBar = ({ type }) => {
  const [modalOpen, setModalOpen] = useState(false);



  const handleCloseModal = () => {
    setModalOpen(false);
  }

  // 新增推文
  const handleCreateTweet = (value) => {
    setModalOpen(false);
    console.log('tweet:', value);
    Swal.fire({
      position: 'top',
      title: '新增推文成功！',
      timer: 1000,
      icon: 'success',
      showConfirmButton: false,
    });
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
            onClick={() => setModalOpen(!modalOpen)}>
            推文
          </button>
        </nav>
      </div>
      <Modal isOpen={modalOpen} closeModal={handleCloseModal}>
        {modalOpen &&
          <TweetEdit
            placeholder='有什麼新鮮事?'
            onClick={handleCreateTweet}
          />}
      </Modal>
    </div>
  )
}

export default SideBar