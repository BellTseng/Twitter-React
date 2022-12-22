import { createContext, useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import * as jwt from 'jsonwebtoken'
import { getUser } from './../api/user'
import { login, adminLogin, register, adminCheckPermission } from './../api/auth'


const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  register: null,
  login: null,
  logout: null,
  updatedAt: null
}

const AuthContext = createContext(defaultAuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [updatedAt, setUpdatedAt] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { pathname } = useLocation()

  useEffect(() => {
    const checkTockenIsValid = async () => {
      setIsLoading(true)
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        console.log('沒有token')
        setIsAuthenticated(false)
        setCurrentUser(null)
        return
      }

      if (pathname.includes('admin')) {
        // 設定使用者後台
        const response = await adminCheckPermission(authToken)

        if (response) {
          setIsAuthenticated(true)
          setCurrentUser(response)
        } else {
          setIsAuthenticated(false)
          setCurrentUser(null)
        }
        
        return
      }

      console.log('test')
      const tempUser = jwt.decode(authToken)
      console.log('tempUser', tempUser)
      const result = await getUser(tempUser.id)
      console.log('user', result)

      if (!result) {
        console.log('沒有User')
        setIsAuthenticated(false)
        setCurrentUser(null)
        return
      }


      // 設定使用者前台
      console.log('有User')
      setIsAuthenticated(true)
      setCurrentUser(result.data)


      setIsLoading(false)
    }
    checkTockenIsValid()
  }, [pathname])


  return (<AuthContext.Provider
    value={{
      isLoading: isLoading,
      isAuthenticated: isAuthenticated,
      currentUser: currentUser,
      updatedAt: updatedAt,
      update: () => {
        console.log('更新了updatedAt')
        setUpdatedAt(new Date())
      },
      // 登入
      login: async (data) => {
        const result = await login({
          account: data.account,
          password: data.password
        });

        if (!!result) {
          setCurrentUser({ ...result.data.user }); // 設定使用者資料
          console.log(result.data.user)
          setIsAuthenticated(true);
          console.log('authToken', result.data.token)
          localStorage.setItem('authToken', result.data.token) // 設定新的token到return 
        } else {
          setCurrentUser(null); // 設定使用者資料
          setIsAuthenticated(false);
          return false;
        }
        return true;

      },
      // 註冊
      register: async (data) => {
        const response = await register({
          account: data.account,
          name: data.name,
          email: data.email,
          password: data.password,
          checkPassword: data.checkPassword
        })

        if (response) {
          setCurrentUser({ ...response.data.user }); // 設定使用者資料
          setIsAuthenticated(true);
          console.log('authToken', response.data.token)
          localStorage.setItem('authToken', response.data.token) // 設定新的token到return 
          return true
        } else {
          setCurrentUser(null); // 設定使用者資料
          setIsAuthenticated(false);
          return false;
        }

      },

      // 登出
      logout: () => {
        console.log('goto logout')
        localStorage.removeItem('authToken');
        setCurrentUser(null);
        setIsAuthenticated(false);
      },

      // 後台登入
      adminLogin: async (data) => {
        const response = await adminLogin({
          account: data.account,
          password: data.password,
        })

        if (response) {
          setCurrentUser({ ...response.data.user })
          setIsAuthenticated(true)
          localStorage.setItem('authToken', response.data.token)
          return true
        }
        else {
          setCurrentUser(null)
          setIsAuthenticated(false)
          return false
        }
      }
    }}
  >
    {children}
  </AuthContext.Provider>)
}