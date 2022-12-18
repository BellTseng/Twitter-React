import styles from './UserModal.module.scss'
import add from './../../image/GroupPhoto@2x.svg'
import crossed from './../../image/VectorPhotoCrossed@2x.svg'
import AuthInput from './../AuthInput'
import UserModalIntroduction from './UserModalIntroduction'
import { useState } from 'react'
import { Toast } from '../../utils/utils'

const UserModal = ({ user }) => {
  const [userName, setUserName] = useState(user.userName)
  const [introduction, setIntroduction] = useState(user.introduction)
  let userNameWordCount = 50
  let userIntroductionWordCount = 160

  function handleSave(id){
    if(userName.trim().length === 0){
      Toast.fire({
        title: '使用者名稱不可空白！',
        icon: 'warning',
      });

      return
    }

    if (
      userName.trim().length > userNameWordCount ||
      introduction.trim().length > userIntroductionWordCount
    ) {
      Toast.fire({
        title: '字數超出上限！',
        icon: 'warning',
      });

      return
    }

    console.log('userName', userName)
    console.log('introduction', introduction)

    Toast.fire({
      title: '上傳成功',
      icon: 'success',
    })
  }


  return(
    <div className={styles.userModal}>
      <div className={styles.title}>
        <h5>編輯個人資料</h5>
        <button 
          className={styles.saved}
          onClick={handleSave}
        >
          儲存
        </button>
      </div>

      <div className={styles.backgrounArea}>
        <img
          className={styles.background}
          src={user.background ? user.background : "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg"}
          alt="background"
        />

        <img
          className={styles.add}
          src={add}
          alt="addbackground"
        />

        <img
          className={styles.crossed}
          src={crossed}
          alt="deletebackground"
        />
      </div>

      <div className={styles.avatarArea}>
        <img
          className={styles.avatar}
          src={user.avatar ? user.avatar : "https://yt3.googleusercontent.com/ytc/AMLnZu8DV_AUQyPkL9oVUdBIEoIpyKuut4H3VAn9H6iHEQ=s900-c-k-c0x00ffffff-no-rj"}
          alt="avatar"
        />

        <img
          className={styles.addAvatar}
          src={add}
          alt="addAvatar"
        />
      </div>

      <div className={styles.userName}>
        <AuthInput
          label="名稱"
          placeholder="請輸入名稱"
          type="text"
          wordCount={userNameWordCount}
          active={true}
          value={userName}
          onChange={(userNameInputValue) => setUserName(userNameInputValue)}
        />
      </div>

      <div className={styles.userIntroduction}>
        <UserModalIntroduction
          label="自介"
          placeholder="請輸入自介"
          wordCount={userIntroductionWordCount}
          active={true}
          value={introduction}
          onChange={(introductionInputValue) => setIntroduction(introductionInputValue)}
        />
      </div>
      
    </div>
  )
}

export default UserModal