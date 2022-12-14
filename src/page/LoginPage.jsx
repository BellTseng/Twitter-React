import { useState } from "react";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput"
import styles from './../style/Login.module.scss'
import logo from './../image/Icon@2x.jpg'
import { Toast } from "../utils/utils";

const LoginPage = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  let wordCount = 50

  function handleClick() {
    if (
      account.trim().length === 0 ||
      password.trim().length === 0 
    ) {
      Toast.fire({
        title: '請輸入帳號或密碼！',
        icon: 'warning',
      });

      return
    }

    if (
      account.trim().length > wordCount ||
      password.trim().length > wordCount 
    ) {
      Toast.fire({
        title: '字數超出上限！',
        icon: 'warning',
      });

      return
    }

    console.log('account: ', account)
    console.log('password: ', password)
  }

  return (
    <div
      className={styles.loginPage}
    >
      <img src={logo} alt="title" className={styles.logo} />

      <h3>登入 Alphitter</h3>

      <AuthInput
        label="帳號"
        placeholder="請輸入帳號"
        type="text"
        wordCount={wordCount}
        active={false}
        value={account}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
      />

      <AuthInput
        label="密碼"
        placeholder="請輸入密碼"
        type="password"
        wordCount={wordCount}
        active={false}
        value={password}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
      />

      <button
        className={styles.authButton}
        onClick={handleClick}
      >
        登入
      </button>

      <div
        className={styles.linkroute}
      >
        <Link to='/signup'>
          <span>註冊</span>
        </Link>
        <span>・</span>
        <Link to='/admin/login'>
          <span>後台登入</span>
        </Link>
      </div>
    </div>
  )
}

export default LoginPage