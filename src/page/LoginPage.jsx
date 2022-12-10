import { useState } from "react";
import { Link } from "react-router-dom";
import AuthInput from "../components/AuthInput"
import './../style/Login.scss'
import logo from './../image/Icon@2x.jpg'
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  let wordCount = 50

  function handleClick() {
    if (
      account.trim().length === 0 ||
      password.trim().length === 0 
    ) {
      Swal.fire({
        position: 'top',
        title: '請輸入帳號或密碼！',
        timer: 1000,
        icon: 'warning',
        showConfirmButton: false,
      });

      return
    }

    if (
      account.trim().length > wordCount ||
      password.trim().length > wordCount 
    ) {
      Swal.fire({
        position: 'top',
        title: '字數超出上限！',
        timer: 1000,
        icon: 'warning',
        showConfirmButton: false,
      });

      return
    }

    console.log('account: ', account)
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
        wordCount={wordCount}
        value={account}
        onChange={(accountInputValue) => setAccount(accountInputValue)}
      />

      <AuthInput
        label="密碼"
        placeholder="請輸入密碼"
        type="password"
        wordCount={wordCount}
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