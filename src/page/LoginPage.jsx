import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput"
import styles from './../style/Login.module.scss'
import logo from './../image/Icon@2x.jpg'
import { useAuth } from './../contexts/AuthContext';
import { Toast } from "../utils/utils";

const LoginPage = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [blank, setBlank] = useState(false)
  let wordCount = 50
  const { login, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home')
    }
  }, [isAuthenticated, navigate]);

  const handleClick = async () => {
    if (
      account.trim().length === 0 ||
      password.trim().length === 0
    ) {
      setBlank(true)

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
      setBlank(false)

      Toast.fire({
        title: '登入成功',
        icon: 'success',
      });
      return;
    }
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
          blankStatus={blank}
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
          blankStatus={blank}
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