import './style/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './components/laylout/AppLayout'
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

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route element={<AppLayout type='web' />}>
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/replylist/:id" element={<ReplyListPage />} />
            <Route path="/userSelf/:id" element={<UserSelfPage />} />
            <Route path="/follow" element={<FollowPage />} />
          </Route>
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route element={<AppLayout type='admin' />}>
            <Route path="admin/main" element={<AdminMainPage />} />
            <Route path="admin/users" element={<AdminUsersPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
