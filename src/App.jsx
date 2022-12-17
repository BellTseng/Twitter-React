import './style/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/laylout/AppLayout'
import AdminLayout from './components/laylout/AdminLayout'
import LoginPage from './page/LoginPage'
import SignUpPage from './page/SignUpPage'
import SettingPage from './page/SettingPage'
import HomePage from './page/HomePage'
import ReplyListPage from './page/ReplyListPage'
import UserSelfPage from './page/UserSelfPage'
import FollowPage from './page/FollowPage'
import AdminLoginPage from './page/AdminLoginPage'
import AdminMainPage from './page/AdminMainPage'
import AdminUsersPage from './page/AdminUsersPage'
import NotFoundPage from './page/NotFoundPage'

import axios from 'axios';

function App() {

  const authURL = 'https://rocky-citadel-44413.herokuapp.com/api/users';


  const login = async ({ username, password }) => {
    alert('登入摟！')
    // try {
    //   const { data } = await axios.post(`${authURL}/signin`, {
    //     username,
    //     password,
    //   });

    //   const { authToken } = data;

    //   if (authToken) {
    //     console.log(authToken)
    //     return { success: true, ...data };
    //   }
    //   return data;
    // } catch (error) {
    //   console.error('[Login Failed]:', error);
    // }
  };

  const register = async ({ txt }) => {
    alert('txt', txt);
    try {
      const { data } = await axios.post(`${authURL}`, {
        account: "userN2",
        name: "userN2",
        email: "userN2@example.com",
        password: "12345678",
        checkPassword: "12345678"
      });
      const { authToken } = data;

      if (authToken) {
        console.log('authToken', authToken)
        return { success: true, ...data };
      }

      return data;
    } catch (error) {
      console.error('[Register Failed]: ', error);
    }
  };


  return (
    <div className="app">
      <button onClick={() => register('註冊摟')}> 註冊摟瞜瞜 </button>

      <button onClick={() => login('user1', '12345678')}>登入</button>


      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />

          <Route element={<AppLayout />}>
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/replylist" element={<ReplyListPage />} />
            <Route path="/userSelf/:id" element={<UserSelfPage />} />
            <Route path="/follow" element={<FollowPage />} />
          </Route>

          <Route path="admin/login" element={<AdminLoginPage />} />

          <Route element={<AdminLayout />}>
            <Route path="admin/main" element={<AdminMainPage />} />
            <Route path="admin/users" element={<AdminUsersPage />} />
          </Route>

          <Route path="*" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
