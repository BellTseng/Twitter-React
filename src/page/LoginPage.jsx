import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput"
import styles from './../style/Login.module.scss'
import logo from './../image/Icon@2x.jpg'
import Swal from 'sweetalert2';
import { useAuth } from './../contexts/AuthContext';
import { Toast } from "../utils/utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  let wordCount = 50
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated]);

  const handleClick = async () => {
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

    // 登入
    const success = await login({ account, password });

    if (success) {
      Swal.fire({
        title: '登入成功',
        icon: 'success',
        showCancelButton: false,
        timer: 1000,
        position: 'top'
      });
      // navigate('/home');
      return;
    }
    Swal.fire({
      title: '登入失敗',
      icon: 'error',
      showCancelButton: false,
      timer: 1000,
      position: 'top'
    });
  }

  return (
    <div
      className={styles.loginPage}
    >
      <img src={logo} alt="title" className={styles.logo} />

      <h3>登入 Alphitter</h3>

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