import styles from './../style/SettingPage.module.scss'
import AuthInput from '../components/AuthInput'
import { useState } from 'react';
import { Toast } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

const userPro = {
  id: 1,
  bachground: 'https://cdn.pixabay.com/photo/2013/07/18/20/26/sea-164989__480.jpg',
  avatar: 'https://storystudio.tw/storage/upload/article/2020/03/people-x-sobooks-baxuan-2.jpg',
  introduction: 'My name is Allen.',
  userName: 'Allen',
  account: 'Joe456',
  email: 'diana@gmail.com',
  tweetCount: '1.8k',
  likeCount: '50k',
  folloingCount: 1000,
  followerCount: 80,
  isFollow: false,
}

const SettingPage = () => {
  const [account, setAccount] = useState(userPro.account);
  const [username, setUserName] = useState(userPro.userName)
  const [email, setEmail] = useState(userPro.email)
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('')
  const navigate = useNavigate()
  let wordCount = 50

  function handleClick() {
    if (
      account.trim().length === 0 ||
      username.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      passwordCheck.trim().length === 0
    ) {
      Toast.fire({
        title: '請輸入帳號、名稱、Email或密碼！',
        icon: 'warning',
      });

      return
    }

    if (
      account.trim().length > wordCount ||
      username.trim().length > wordCount ||
      email.trim().length > wordCount ||
      password.trim().length > wordCount ||
      passwordCheck.trim().length > wordCount
    ) {
      Toast.fire({
        title: '字數超出上限！',
        icon: 'warning',
      });

      return
    }

    if (password !== passwordCheck) {
      Toast.fire({
        title: '密碼與密碼確認不相符！',
        icon: 'warning',
      });

      return
    }

    console.log('account: ', account)
    console.log('username: ', username)
    console.log('email: ', email)
    console.log('password: ', password)
    console.log('passwordCheck: ', passwordCheck)

    Toast.fire({
      title: '修改成功',
      icon: 'success',
    })
    navigate('/home')
  }


  return(
    <div className={styles.settingPage}>
      <div className={styles.title}>
        <h4>帳戶設定</h4>
      </div>

      <div className={styles.account}>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          type="text"
          wordCount={wordCount}
          active={false}
          value={account}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
        />
      </div>


      <div className={styles.userName}>
        <AuthInput
          label="名稱"
          placeholder="請輸入名稱"
          type="text"
          wordCount={wordCount}
          active={false}
          value={username}
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </div>

      <div className={styles.email}>
        <AuthInput
          label="Email"
          placeholder="請輸入 Email"
          type="text"
          wordCount={wordCount}
          active={false}
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
        />
      </div>

      <div className={styles.password}>
        <AuthInput
          label="密碼"
          placeholder="請輸入密碼"
          type="password"
          wordCount={wordCount}
          active={false}
          value={password}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
        />
      </div>

      <div className={styles.passwordCheck}>
        <AuthInput
          label="密碼確認"
          placeholder="請輸入密碼"
          type="password"
          wordCount={wordCount}
          active={false}
          value={passwordCheck}
          onChange={(passwordCheckInputValue) => setPasswordCheck(passwordCheckInputValue)}
        />
      </div>


      <button
        className={styles.saveButton}
        onClick={handleClick}
      >
        儲存
      </button>
    </div>
  )
}

export default SettingPage