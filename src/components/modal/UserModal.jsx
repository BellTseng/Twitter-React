import styles from './UserModal.module.scss'
import add from './../../image/GroupPhoto@2x.svg'
import crossed from './../../image/VectorPhotoCrossed@2x.svg'
import closed from './../../image/icons/close.svg'
import AuthInput from './../AuthInput'
import UserModalIntroduction from './UserModalIntroduction'
import InputFile from '../UserPage/InputFile'
import { useEffect, useRef, useState } from 'react'
import { Toast } from '../../utils/utils'
import { useAuth } from '../../contexts/AuthContext'
import { getUser, putUser } from '../../api/user'

const UserModal = ({ isOpen, onShowModal }) => {
  const [userName, setUserName] = useState('')
  const [userIntroduction, setUserIntroduction] = useState('')
  const [userBackground, setUserBackground] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [blank, setBlank] = useState(false)
  const inputBackgroundFileCurrent = useRef(null)
  const inputAvatarFileCurrent = useRef(null)
  const { currentUser, update } = useAuth()
  let userNameWordCount = 50
  let userIntroductionWordCount = 160



  function handleClosed() {
    update()
    onShowModal?.(false)
  }

  async function handleSave(event) {
    event.preventDefault()

    const testForm = event.target
    const formData = new FormData(testForm)

    for (let [name, value] of formData.entries()) {
      console.log(`${name} : ${value}`)
    }
    if (userName.trim().length === 0) {
      setBlank(true)

      Toast.fire({
        title: '使用者名稱不可空白！',
        icon: 'warning',
      });

      return
    }

    if (
      userName.trim().length > userNameWordCount ||
      userIntroduction.trim().length > userIntroductionWordCount
    ) {
      Toast.fire({
        title: '字數超出上限！',
        icon: 'warning',
      });

      return
    }

    const response = await putUser({
      id: currentUser?.id,
      formData
    })

    console.log(response)
    if (response.status === 'success') {
      setBlank(false)

      Toast.fire({
        title: '修改成功',
        icon: 'success',
      })
    }

    // console.log('userName', userName)
    // console.log('introduction', userIntroduction)
    // console.log('avatar', userAvatar)
    // console.log('cover', userBackground)
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

  useEffect(() => {
    async function getUserAsync() {
      const { data } = await getUser(currentUser?.id)

      console.log('data', data)

      setUserName(data.name)
      setUserIntroduction(data.introduction ? data.introduction : '')
      setUserBackground(data.cover)
      setUserAvatar(data.avatar)
    }

    getUserAsync()

  }, [currentUser, update])


  return (
    <div
      id="modal"
      className={`${styles.userModalOutside} ${isOpen ? styles.show : ''}`}
      onClick={(e) => {
        if (e.target.id === 'modal') {
          handleClosed()
        }
      }}
    >
      <form
        className={styles.modalForm}
        onSubmit={handleSave}
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
              type='submit'
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
                iuputName={'cover'}
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
                iuputName={'avatar'}
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
              iuputName={'name'}
              label="名稱"
              placeholder="請輸入名稱"
              type="text"
              wordCount={userNameWordCount}
              active={true}
              value={userName}
              blankStatus={blank}
              onChange={(userNameInputValue) => setUserName(userNameInputValue)}
            />
          </div>

          <div className={styles.userIntroduction}>
            <UserModalIntroduction
              iuputName={'introduction'}
              label="自介"
              placeholder="請輸入自介"
              wordCount={userIntroductionWordCount}
              active={true}
              value={userIntroduction}
              onChange={(introductionInputValue) => setUserIntroduction(introductionInputValue)}
            />
          </div>

        </div>
      </form>

    </div>
  )
}

export default UserModal
