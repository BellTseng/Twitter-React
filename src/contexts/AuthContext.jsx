import { createContext, useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import * as jwt from 'jsonwebtoken'
import { getUser } from './../api/user'
import { login } from './../api/auth'


const defaultAuthContext = {
  isAuthenticated: false,
  currentUser: null,
  register: null,
  login: null,
  logout: null,
}

const AuthContext = createContext(defaultAuthContext)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const checkTockenIsValid = async () => {
      const authToken = localStorage.getItem('authToken')
      if (!authToken) {
        console.log('沒有token')
        setIsAuthenticated(false)
        setCurrentUser(null)
        return
      }
      // "message": "Unauthorized"
      const tempUser = jwt.decode(authToken)
      console.log('tempUser', tempUser)
      const user = await getUser(tempUser.id)
      console.log('user', user)

      if (!!user) {
        console.log('沒有User')
        setIsAuthenticated(false)
        setCurrentUser(null)
        return
      }

      // 設定使用者
      setIsAuthenticated(true)
      setCurrentUser(user)

    }
    checkTockenIsValid()
  })

  return (<AuthContext.Provider
    value={{
      // 登入
      login: async (data) => {
        const result = await login({
          account: data.account,
          password: data.password
        });

        if (!!result) {
          setCurrentUser({ ...result.data.user }); // 設定使用者資料
          setIsAuthenticated(true);
          console.log('authToken', result.data.token)
          localStorage.setItem('authToken', result.data.token) // 設定新的token到localStorage
        } else {
          setCurrentUser(null); // 設定使用者資料
          setIsAuthenticated(false);
        }
        return true;
      }
    }}
  >
    {children}
  </AuthContext.Provider>)
}