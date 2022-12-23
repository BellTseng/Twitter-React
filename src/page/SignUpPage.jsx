import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthInput from "../components/AuthInput"
import styles from './../style/SignUp.module.scss'
import logo from './../image/Icon@2x.jpg'
import { Toast } from "../utils/utils";
import { useAuth } from "../contexts/AuthContext";

const SignUpPage = () => {
  const [account, setAccount] = useState('');
  const [username, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('')
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth()

  let wordCount = 50

  async function handleClick() {
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

    if(password !== passwordCheck){
      Toast.fire({
        title: '密碼與密碼確認不相符！',
        icon: 'warning',
      });

      return
    }

    const response = await register({
      account,
      name: username,
      email,
      password,
      checkPassword: passwordCheck,
    })

    if(response){
      Toast.fire({
        title: '註冊成功',
        icon: 'success',
      })
    }
  }

  useEffect(() => {
    if(isAuthenticated){
      navigate('/home')
    }
  }, [isAuthenticated, navigate])

  return (
    <div
      className={styles.signUpPage}
    >
      <img src={logo} alt="title" className={styles.logo} />

      <h3>建立你的帳號</h3>

      <div className={styles.account}>
        <AuthInput
          label="帳號"
          placeholder="請輸入帳號"
          type="text"
          wordCount={wordCount}
          active={true}
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
          active={true}
          value={username}
          onChange={(nameInputValue) => setUserName(nameInputValue)}
        />
      </div>
      
      <div className={styles.email}>
        <AuthInput
          label="Email"
          placeholder="請輸入 Email"
          type="email"
          wordCount={wordCount}
          active={true}
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
          active={true}
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
          active={true}
          value={passwordCheck}
          onChange={(passwordCheckInputValue) => setPasswordCheck(passwordCheckInputValue)}
        />
      </div>
      

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