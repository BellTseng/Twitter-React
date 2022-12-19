import styles from './UserModal.module.scss'
import add from './../../image/GroupPhoto@2x.svg'
import crossed from './../../image/VectorPhotoCrossed@2x.svg'
import closed from './../../image/icons/close.svg'
import AuthInput from './../AuthInput'
import UserModalIntroduction from './UserModalIntroduction'
import InputFile from '../UserPage/InputFile'
import { useRef, useState } from 'react'
import { Toast } from '../../utils/utils'

const UserModal = ({ user, isOpen, onShowModal }) => {
  const [userName, setUserName] = useState(user.userName)
  const [introduction, setIntroduction] = useState(user.introduction)
  const [userBackground, setUserBackground] = useState(user.background)
  const [userAvatar, setUserAvatar] = useState(user.avatar)
  const inputBackgroundFileCurrent = useRef(null)
  const inputAvatarFileCurrent = useRef(null)
  let userNameWordCount = 50
  let userIntroductionWordCount = 160

  function handleClosed(){
    setUserName(user.userName)
    setIntroduction(user.introduction)
    setUserBackground(user.background)
    setUserAvatar(user.avatar)

    onShowModal?.(false)
  }

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

    onShowModal?.(false)
  }

  // const handleOnChange = (event) => {
  //   console.log('files: ', event.target.files);
  //   console.log('files(URL)', window.URL.createObjectURL(event.target.files[0]))

  //   // setImageTest(window.URL.createObjectURL(event.target.files[0]))
  // }

  function handleOnClickUpload(value) {
    value.current.click();
  }


  return(
    <div
      id="modal" 
      className={`${styles.userModalOutside} ${isOpen ? styles.show : ''}`}
      onClick={(e) => {
        if(e.target.id === 'modal'){
          handleClosed()
        }
      }}
    >
      <div className={styles.userModal}>
        <div className={styles.title}>
          <img 
            className={styles.closed}
            src={closed} 
            alt="closed"
            onClick={handleClosed} 
          />
          <h5>編輯個人資料</h5>
          <button
            className={styles.saved}
            onClick={handleSave}
          >
            儲存
          </button>
        </div>

        <div className={styles.backgroundArea}>
          <img
            className={styles.background}
            src={userBackground ? userBackground : "https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg"}
            alt="background"
          />

          <div className={styles.add}>
            <InputFile
              onChange={(event) => setUserBackground(window.URL.createObjectURL(event.target.files[0]))}
              inputRef={inputBackgroundFileCurrent}
            >
              <img
                src={add}
                alt="addbackground"
                onClick={() => handleOnClickUpload?.(inputBackgroundFileCurrent)}
              />
            </InputFile>
          </div>

          <img
            className={styles.crossed}
            src={crossed}
            alt="deletebackground"
            onClick={() => {
              setUserBackground('')

              Toast.fire({
                title: '刪除成功',
                icon: 'success',
              })
            }}
          />
        </div>

        <div className={styles.avatarArea}>
          <img
            className={styles.avatar}
            src={userAvatar ? userAvatar : "https://yt3.googleusercontent.com/ytc/AMLnZu8DV_AUQyPkL9oVUdBIEoIpyKuut4H3VAn9H6iHEQ=s900-c-k-c0x00ffffff-no-rj"}
            alt="avatar"
          />

          <div className={styles.addAvatar}>
            <InputFile
              onChange={(event) => setUserAvatar(window.URL.createObjectURL(event.target.files[0]))}
              inputRef={inputAvatarFileCurrent}
              keyId={'addAvatar'}
            >
              <img
                src={add}
                alt="addAvatar"
                onClick={() => handleOnClickUpload?.(inputAvatarFileCurrent)}
              />
            </InputFile>
          </div>
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
    </div>
  )
}

export default UserModal