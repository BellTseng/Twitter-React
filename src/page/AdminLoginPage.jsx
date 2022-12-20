import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput"
import styles from './../style/AdminLogin.module.scss'
import logo from './../image/Icon@2x.jpg'
import { Toast } from "../utils/utils";
import { useAuth } from "../contexts/AuthContext";

const AdminLoginPage = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { adminLogin, isAuthenticated } = useAuth();
  let wordCount = 50

  async function handleClick() {
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

    const success = await adminLogin({
      account,
      password
    })

    if(success){
      Toast.fire({
        title: '登入成功',
        icon: 'success',
      })
    }
    else{
      Toast.fire({
        title: '登入失敗',
        icon: 'error',
      })
    }

  }

  useEffect(() => {
    if(isAuthenticated){
      navigate('/admin/main')
    }
  }, [isAuthenticated, navigate])

  return(
    <div
      className={styles.adminLoginPage}
    >
      <img src={logo} alt="title" className={styles.logo} />

      <h3>後台登入</h3>

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
        <Link to='/login'>
          <span>前台登入</span>
        </Link>
      </div>
    </div>
  )
}

export default AdminLoginPage