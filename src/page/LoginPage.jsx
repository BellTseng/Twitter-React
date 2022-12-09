import { useState } from "react";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput"
import './../style/Login.scss'
import logo from './../image/Icon@2x.jpg'

const LoginPage = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  function handleClick() {
    console.log('amount: ', username)
    console.log('password: ', password)
  }

  return (
    <div
      className="loginPage"
    >
      <img src={logo} alt="title" className="logo" />

      <h3>登入 Alphitter</h3>

      <AuthInput
        label="帳號"
        placeholder="請輸入帳號"
        type="text"
        wordCount={50}
        value={username}
        onChange={(nameInputValue) => setUserName(nameInputValue)}
      />

      <AuthInput
        label="密碼"
        placeholder="請輸入密碼"
        type="password"
        wordCount={50}
        value={password}
        onChange={(passwordInputValue) => setPassword(passwordInputValue)}
      />

      <button
        className="authButton"
        onClick={handleClick}
      >
        登入
      </button>

      <div
        className="linkroute"
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