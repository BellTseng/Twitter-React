import { useState } from "react";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput"
import styles from './../style/SignUp.module.scss'
import logo from './../image/Icon@2x.jpg'
import { Toast } from "../utils/utils";

const SignUpPage = () => {
  const [account, setAccount] = useState('');
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('')
  let wordCount = 50

  function handleClick() {
    if(
      account.trim().length === 0 ||
      username.trim().length === 0 ||
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      passwordCheck.trim().length === 0
    ){
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

    console.log('account: ', account)
    console.log('username: ', username)
    console.log('email: ', email)
    console.log('password: ', password)
    console.log('passwordCheck: ', passwordCheck)
  }

  return (
    <div
      className={styles.signUpPage}
    >
      <img src={logo} alt="title" className={styles.logo} />

      <h3>建立你的帳號</h3>

      <AuthInput
        label="帳號"
        placeholder="請輸入帳號"
        type="text"
        wordCount={wordCount}
        active={true}
        value={account}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
      />

      <AuthInput
        label="名稱"
        placeholder="請輸入名稱"
        type="text"
        wordCount={wordCount}
        active={true}
        value={username}
        onChange={(nameInputValue) => setUserName(nameInputValue)}
      />

      <AuthInput
        label="Email"
        placeholder="請輸入 Email"
        type="text"
        wordCount={wordCount}
        active={true}
        value={email}
        onChange={(emailInputValue) => setEmail(emailInputValue)}
      />

      <AuthInput
        label="密碼"
        placeholder="請輸入密碼"
        type="password"
        wordCount={wordCount}
        active={true}
        value={password}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
      />

      <AuthInput
        label="密碼確認"
        placeholder="請輸入帳號"
        type="password"
        wordCount={wordCount}
        active={true}
        value={passwordCheck}
        onChange={(passwordCheckInputValue) => setPasswordCheck(passwordCheckInputValue)}
      />

      <button
        className={styles.authButton}
        onClick={handleClick}
      >
        註冊
      </button>

      <div
        className={styles.linkroute}
      >
        <Link to='/login'>
          <span>取消</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUpPage